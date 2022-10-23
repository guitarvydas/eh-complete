(in-package "EH")

(defclass Connector () 
  ((sender :accessor sender :initarg :sender)
   (receiver :accessor receiver :initarg :receiver)))
