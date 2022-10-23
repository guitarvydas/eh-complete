(in-package "EH")

(defclass World (Procedure)
  ())

(defmethod initialize-instance :before ((compiletime-self World) &key &allow-other-keys)
  (setf (port-handler compiletime-self)
	(make-instance 'PortHandler :port "*" 
				    :func (lambda (runtime-self message)
					    (send runtime-self compiletime-self "stdout" (data message) message)
					    (send runtime-self compiletime-self "stdout" "world" message)))))

