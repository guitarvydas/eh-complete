(in-package "EH")

(defclass State ()
  ((machine :accessor machine :initarg :machine)
   (name :accessor name :initarg :name)
   (fenter :accessor fenter :initarg :enter :initform nil)
   (handlers :accessor handlers :initarg :handlers)
   (fexit :accessor fexit :initarg :exit :initform nil)
   (child-machine :accessor child-machine :initarg :child-machine :initform nil)))

(defmethod enter ((self State))
  (when (fenter self) (funcall (fenter self)))
  (when (child-machine self) (enter (child-machine self))))

(defmethod exit ((self State))
  (when (child-machine self) (exit (child-machine self)))
  (when (fexit self) (funcall (fexit self))))

(defmethod handle ((self State) message)
  (let ((r (handler-chain self message (handlers self) (child-machine self))))
    (cond (r r)
	  ((child-machine self) (handle (child-machine self) message))
	  (t nil))))

(defmethod xstep ((self State))
  (cond ((child-machine self) (step (child-machine self)))
	(t)))

(defmethod is-busy ((self State))
  (cond ((child-machine self) (is-busy (child-machine self)))
	(t nil)))
  

(defun handler-chain (self message handlers sub-machine)
  (when handlers
    (let ((handler (first handlers))
	  (rest-of-handlers (rest handlers)))
      (cond ((match-port handler (port message))
	     (funcall (func handler) self message)
	     t)
	    (t (handler-chain self message rest-of-handlers sub-machine))))))
    
(defmethod send ((self State) from port-name data causing-message)
  (send (machine self) from port-name data causing-message))
