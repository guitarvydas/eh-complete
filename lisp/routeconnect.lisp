(in-package "EH")

(defclass RouteConnect (Connector) ())

(defmethod guarded-deliver ((self RouteConnect) inmessage)
  (cond ((match (sender self) (from inmessage) (port inmessage))
	 (let ((receiver (receiver self)))
	   (let ((sender (sender self)))
	     (format *standard-output* "~%ROUTE ~a .... ~a -> ~a" inmessage (name sender) (name receiver))
	     (let ((mappedMessage (make-instance 'InputMessage :from self :port (port receiver) :data (data inmessage) :trail inmessage)))
	       (enqueue-input receiver mappedMessage)))))
	(t nil)))


