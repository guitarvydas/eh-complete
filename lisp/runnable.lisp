(in-package "EH")

(defclass Runnable ()
  ((parent :accessor parent :initform nil :initarg :parent)
   (name :accessor name :initarg :name)
   (top :accessor top :initarg :top)))

(defmethod run ((self Runnable))
  (loop
    while (is-busy self)
    do (step self))
  (loop
    while (handle-if-ready self)
    do (loop
	 while (is-busy self)
	 do (step self))))

