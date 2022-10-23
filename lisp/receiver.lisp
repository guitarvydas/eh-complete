(in-package "EH")

(defclass Receiver ()
  ((component :accessor component :initarg :component)
   (port :accessor port :initarg :port)))

(defmethod name ((self Receiver))
  (format nil "~a/~a" (name (component self)) (port self)))

(defmethod enqueue-input ((self Receiver) message)
  (enqueue-input (component self) message))

(defmethod enqueue-output ((self Receiver) message)
  (enqueue-output (component self) message))

