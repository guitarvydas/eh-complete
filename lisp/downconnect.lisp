(in-package "EH")

(defclass DownConnect (Connector) ())

(defmethod guarded-deliver ((self DownConnect) inmessage)
  (cond ((match (sender self) (from inmessage) (port inmessage))
	 (let ((receiver (receiver self)))
	   (let ((sender (sender self)))
	     (format *standard-output* "~%DOWN ~a .... ~a -> ~a" inmessage (name sender) (name receiver))
	     (let ((mappedMessage (make-instance 'InputMessage :from self :port (port receiver) :data (data inmessage) :trail inmessage)))
	       (enqueue-input receiver mappedMessage)))))
	(t nil)))
