(ns robot-arm.action-modifier
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defmulti action-modifier
  (fn [type _ _] type))

; toggle modifier
(declare toggle-state)

(defmethod action-modifier :light
  [type data owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className (str "modifier " (name type) " " (if (:enabled data) "enabled" "disabled"))
                          :onClick #(toggle-state data)}))))

(defmethod action-modifier :grip
  [type data owner]
  (reify
    om/IRender
    (render [_]
            (dom/div #js {:className (str "modifier " (name type) " " (if (:enabled data) "enabled" "disabled"))
                          :onClick #(toggle-state data)}))))

(defn toggle-state [data]
  (om/transact! data :enabled not))
