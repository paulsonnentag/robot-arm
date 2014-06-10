(ns robot-arm.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <!]]))

(enable-console-print!)

(def app-state (atom {:actions []}))

(declare actions-view)
(declare action-view)

(defn robot-app [app owner]
  (reify
    om/IRender
    (render [_]
            (dom/div nil
                     (om/build actions-view (:actions app))))))

(defn add-action [type actions owner]
  (om/set-state! owner :show-options false)
  (om/transact! actions #(conj % {:type type :data {}})))

(defn toggle-options [owner]
  (let [show-options (om/get-state owner :show-options)]
    (om/set-state! owner :show-options (not show-options))))

(defn add-action-button [actions owner]
  (reify
    om/IInitState
    (init-state [_]
                {:show-options false})
    om/IRenderState
    (render-state [_ {:keys [show-options]}]
            (dom/div #js {:className (str "add-action" (if show-options " show-options" ""))}
                     (dom/button #js {:className "button option transform"
                                      :onClick #(add-action :transform actions owner)})
                     (dom/button #js {:className "button option rotate"
                                      :onClick #(add-action :rotate actions owner)})
                     (dom/button #js {:className "button option light"
                                      :onClick #(add-action :light actions owner)})
                     (dom/button #js {:className "button option grip"
                                      :onClick #(add-action :grip actions owner)})
                     (dom/button #js {:className "button plus"
                                      :onClick #(toggle-options owner)} "+")))))

(defn actions-view [actions owner]
  (reify
    om/IRender
    (render [_]
            (dom/div nil
                     (dom/h1 nil "Actions")
                     (apply dom/div #js {:className "actions"}
                            (om/build-all action-view actions))
                     (om/build add-action-button actions)))))

(defn action-view [action owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className (str "action " (-> action :type name))}))))

;; Utils

;; Bootstrap
(om/root robot-app app-state
         {:target (. js/document (getElementById "app"))})
