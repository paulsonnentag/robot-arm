(ns robot-arm.core
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(enable-console-print!)

(declare timelines-view)
(declare timeline-view)
(declare action-view)
(declare size-unit)

(def app-state (atom {:timelines [{:type :transform
                                   :actions [{:delay 0 :duration 3}
                                             {:delay 2 :duration 1}
                                             {:delay 2 :duration 1}]}
                                  {:type :rotate
                                   :actions [{:delay 1 :duration 2}
                                             {:delay 2 :duration 5}]}
                                  {:type :grip
                                   :actions [{:delay 1 :duration 2}
                                             {:delay 2 :duration 5}]}
                                  {:type :light
                                   :actions [{:delay 1 :duration 2}
                                             {:delay 2 :duration 5}]}]}))

(defn timelines-view [app owner]
  (reify
    om/IRender
    (render [_]
            (apply dom/div #js {:className "timelines"}
                   (om/build-all timeline-view (:timelines app))))))

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

(defn size-unit [x]
  (str (* 65 x) "px"))


(om/root timelines-view app-state
         {:target (. js/document (getElementById "app"))})
