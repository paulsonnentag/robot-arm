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


(defn insert-action-at [t action actions]
  (let [insertion-index (->> actions
                             (map #(+ (:duration %) (:delay %)))
                             (reductions +)
                             (take-while #(> t %))
                             (count))
        [head tail] (split-at insertion-index actions)]
    (vec (concat head [action] tail))))

(defn add-action [e timeline]
  (let [t (-> e .-clientX size->t)]
    (om/transact! timeline :actions #(insert-action-at t {:duration 1 :delay 2} %))))

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
   (/ SCALE x))

(defn t->size [x]
  (* SCALE x))

(defn t->px [x]
  (str (* SCALE x) "px"))

;; Bootstrap
(om/root robot-app app-state
         {:target (. js/document (getElementById "app"))})
