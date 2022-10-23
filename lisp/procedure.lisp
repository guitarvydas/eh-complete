(in-package "EH")

(defconstant +default-name+ "idle")

(defclass Procedure (EH)
  ((port-handler :accessor port-handler :initarg :port-handler))
  (:default-initargs
   :default-state-name +default-name+))
  
(defmethod initialize-instance :after ((self Procedure)  &key &allow-other-keys)  
  (setf (states self) (list (make-instance 'State :machine self :name +default-name+
                                :handlers (list (port-handler self))
                                :enter nil :exit nil :child-machine nil)))
  (initialize-hsm self))
