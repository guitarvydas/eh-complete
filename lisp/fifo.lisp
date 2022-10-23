(in-package "EH")

(defclass FIFO () 
  ((elements :accessor elements :initform nil)))

(defmethod enqueue ((self FIFO) element)
  (setf (elements self)
	(append (elements self) (list element))))

(defmethod dequeue ((self FIFO))
  (when (elements self)
    (let ((element (car (last (elements self)))))
      (setf (elements self) (butlast (elements self)))
      element)))

(defmethod len ((self FIFO))
  (list-length (elements self)))

(defmethod is-empty ((self FIFO))
  (null (elements self)))

(defmethod as-list ((self FIFO))
  (elements self))
