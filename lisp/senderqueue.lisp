(in-package "EH")

(defclass SenderQueue ()
  ((outputq :accessor outputq :initform (make-instance 'FIFO))))

(defmethod outputs-LIFO-dictionary ((self SenderQueue))
  (let ((htable (make-hash-table :test 'equalp)))
    (add-outputs-to-hash-table htable (as-list (outputq self)))
    htable))

(defun add-outputs-to-hash-table (htable outputs)
  (when outputs
    (let ((output-message (first outputs))
	  (rest-of-outputs (rest outputs)))
      (let ((key (port output-message))
            (data (data output-message)))
        (multiple-value-bind (value-stack success)
            (gethash key htable)
          (declare (ignore value-stack))
          (unless success
            (setf (gethash key htable) ()))
          (setf (gethash key htable)
               (cons data (gethash key htable)))))
      (add-outputs-to-hash-table htable rest-of-outputs))))

(defmethod outputs-FIFO-dictionary ((self SenderQueue))
  (let ((htable (outputs-LIFO-dictionary self)))
    (maphash #'(lambda (key value)
		       (setf (gethash key htable)
			     (reverse value)))
	     htable)
    htable))

;; internal - not exported
(defmethod clear-outputs ((self SenderQueue))
  (setf (outputq self) (make-instance 'FIFO)))

(defmethod enqueue-output ((self SenderQueue) message)
  (enqueue (outputq self) message))

(defmethod dequeue-output ((self SenderQueue))
  (dequeue (outputq self)))

(defmethod send ((self SenderQueue) from port-name data causing-message)
  (let ((m (make-instance 'OutputMessage :from from :port port-name :data data :trail causing-message)))
    (enqueue (outputq self) m)))

(defmethod output-queue ((self SenderQueue))
  (outputq self))

