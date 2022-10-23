(in-package "EH")

(defclass Hello (Procedure)
  ())

(defmethod initialize-instance :before ((compiletime-self Hello) &key &allow-other-keys)
  (setf (port-handler compiletime-self)
	(make-instance 'PortHandler :port "*" 
				    :func (lambda (runtime-self message)
					    (send runtime-self compiletime-self "stdout" "hello" message)))))

