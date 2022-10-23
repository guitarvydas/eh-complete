(in-package "EH")

(defclass OutputMessage (Message) ())

(defmethod print-object ((self OutputMessage) stream)
  (format stream "{output: [~a] ~a}" (port self) (data self)))
        
