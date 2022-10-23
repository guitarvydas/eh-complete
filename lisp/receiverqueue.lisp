(in-package "EH")

(defclass ReceiverQueue ()
  ((inputq :accessor inputq :initform (make-instance 'FIFO))))

(defmethod inject ((self ReceiverQueue) message)
  (enqueue-input self message))

(defmethod handle-if-ready ((self ReceiverQueue))
  (when (is-ready self)
    (let ((m (dequeue-input self)))
      (handle self m)
      t)))

(defmethod is-ready ((self ReceiverQueue))
  (not (is-empty (inputq self))))

(defmethod enqueue-input ((self ReceiverQueue) message)
  (enqueue (inputq self) message))

(defmethod dequeue-input ((self ReceiverQueue))
  (dequeue (inputq self)))
            
