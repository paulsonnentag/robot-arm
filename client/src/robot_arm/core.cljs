(ns robot-arm.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <!]]))

(enable-console-print!)

(def app-state (atom {:actions [{:type :rotate
                                  :data {:rotation 20}}
                                 {:type :transform
                                  :data {:shoulder 20 :elbow: 20 :wrist 20}}
                                 {:type :light
                                  :data {:light true}}
                                 {:type :grip
                                  :data {:grip false}}]}))

(declare actions-view)
(declare action-view)

(defn robot-app [app owner]
  (reify
    om/IRender
    (render [_]
            (om/build actions-view (:actions app)))))

(defn actions-view [actions owner]
  (reify
    om/IRender
    (render [_]
            (dom/div nil
                     (dom/h1 nil "Actions")
                     (apply dom/div #js {:className "actions"}
                            (om/build-all action-view actions))))))

(defn action-view [action owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className (str "action " (-> action :type name))}))))

;; Utils

;; Bootstrap
(om/root robot-app app-state
         {:target (. js/document (getElementById "app"))})
