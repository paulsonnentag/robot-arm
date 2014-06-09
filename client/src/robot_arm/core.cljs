(ns robot-arm.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <!]]))

(enable-console-print!)

(declare timelines-view)
(declare timeline-view)
(declare timeline)
(declare action-view)
(declare size-unit)

(defn timeline [type]
  (-> {:actions []}
      (assoc :type type)))

(def app-state (atom {:timelines (->> [:transform :rotate :grip :light]
                                      (map timeline)
                                      (vec))}))

(defn handle-event [type app data])

(defn robot-app [app owner]
  (reify
    om/IInitState
    (init-state [_]
     {:comm (chan)})
    om/IWillMount
    (will-mount [_]
                (let [comm (om/get-state owner :comm)]
                  (go (while true
                        (let [[type data] (<! comm)]
                          (handle-event type app data))))))
    om/IRenderState
    (render-state [_ {:keys [comm]}]
                  (timelines-view (:timelines app)))))

(defn timelines-view [timelines]
  (dom/div #js {:className "timelines-group"}
           (apply dom/div #js {:className "timelines"}
                  (om/build-all timeline-view timelines))))


(defn insert-action-at [t actions]
  (let [timepoints (->> actions
                             (map #(+ (:duration %) (:delay %)))
                             (reductions +)
                             (take-while #(> t %)))
        insertion-index (count timepoints)
        prev-time (last timepoints)
        delay (- t prev-time)
        action {:delay delay
                :duration 1}
        [head [next-action & tail]] (split-at insertion-index actions)]
    (if next-action
      (let [next-delay (- (:delay next-action) (inc delay))
            next-action (assoc next-action :delay (max next-delay 0))]
        (vec (concat head [action next-action] tail)))
      (vec (concat head [action])))))

(assoc nil :foo 1)

(concat [2] nil [3])

(defn add-action [e timeline]
  (let [t (-> e .-clientX size->t)]
    (om/transact! timeline :actions #(insert-action-at t %))))

(defn timeline-view [timeline owner]
  (reify
    om/IInitState
    (init-state [_]
                {:timeline timeline})
    om/IRender
    (render [_]
            (dom/div #js {:className (str "timeline " (-> timeline :type name))
                          :onClick #(add-action % timeline)}
                     (apply dom/ul #js {:className "actions"}
                            (om/build-all action-view (:actions timeline)))))))


(defn action-view [action owner]
  (reify
    om/IRender
    (render [_]
            (dom/li #js {:className "action"
                         :style #js {:marginLeft (-> action :delay t->px)
                                     :width (-> action :duration t->px)}}
                    (dom/div #js {:className "inner-action"})))))


;; Utils
(def SCALE 65)

(defn size->t [x]
   (/ x SCALE))

(defn t->size [x]
  (* SCALE x))

(defn t->px [x]
  (str (* SCALE x) "px"))

;; Bootstrap
(om/root robot-app app-state
         {:target (. js/document (getElementById "app"))})
