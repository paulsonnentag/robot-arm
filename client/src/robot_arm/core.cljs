(ns robot-arm.core
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

(def app-state (atom {:timelines (map timeline [:transform :rotate :light :grip])}))
(defn handle-event [type app val])

(defn timelines-view [app owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className "timelines-group"}
                     (apply dom/div #js {:className "timelines"}
                            (om/build-all timeline-view (:timelines app)))))))

(defn timeline-view [timeline owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className (str "timeline " (-> timeline :type name)) }
                     (apply dom/ul #js {:className "actions"}
                            (om/build-all action-view (:actions timeline)))))))


(defn action-view [action owner]
  (reify
    om/IRender
    (render [_]
            (dom/li #js {:className "action"
                         :style #js {:marginLeft (-> action :delay size-unit)
                                     :width (-> action :duration size-unit)}}
                    (dom/div #js {:className "inner-action"})))))


;; Utils
(defn size-unit [x]
  (str (* 65 x) "px"))


;; Bootstrap
(om/root timelines-view app-state
         {:target (. js/document (getElementById "app"))})
