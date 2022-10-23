(in-package "EH")

(defclass BaseMessage ()
  ((data :accessor data :initarg :data)))

(defclass Message (BaseMessage)
  ((from :accessor from :initarg :from)
   (port :accessor port :initarg :port)
   (trail :accessor trail :initarg :trail)))

(defun new-Message (from port data trail)
  (make-instance 'Message :from from :port port :data data :trail trail))

(defmethod print-object ((self Message) stream)
  (format stream "Message<~a,~a>" (port self) (data self)))
