(in-package "EH")

(defclass Sender ()
  ((component :accessor component :initarg :component)
   (port :accessor port :initarg :port)))

(defmethod match ((self Sender) othersender port)
  (and (eq (component self) othersender)
       (equalp (port self) port)))

(defmethod name ((self Sender))
  (format nil "~a/~a" (name (component self)) (port self)))

