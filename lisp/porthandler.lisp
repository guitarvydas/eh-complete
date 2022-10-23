(in-package "EH")

(defclass PortHandler ()
  ((port :accessor port :initarg :port)
   (func :accessor func :initarg :func)))

(defmethod match-port ((self PortHandler) port-name)
  (cond ((equalp "*" (port self)) t)
	((equalp port-name (port self)) t)
	(t nil)))
