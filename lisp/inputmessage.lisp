(in-package "EH")

(defclass InputMessage (Message) ())

(defmethod print-object ((self InputMessage) stream)
  (format stream "{input: [~a] ~a}" (port self) (data self)))
        
