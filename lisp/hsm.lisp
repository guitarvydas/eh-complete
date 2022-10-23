(in-package "EH")

(defclass HSM ()
  ((name :accessor name :initarg :name)
   (default-state-name :accessor default-state-name :initarg :default-state-name)
   (fenter :accessor fenter :initarg :fenter :initform nil)
   (fexit :accessor fexit :initarg :fexit :initform nil)
   (states :accessor states :initarg :states)
   (state :accessor state :initform nil)))

(defmethod initialize-hsm ((self HSM))
  (setf (state self) (lookup-state self (default-state-name self)))
  (reset self))

(defmethod reset ((self HSM))
  (exit self)
  (setf (state self) (lookup-state self (default-state-name self)))
  (enter self))

(defmethod enter ((self HSM))
  (let ((state (state self)))
    (when (fenter state)
      (funcall (fenter state) self))))

(defmethod exit ((self HSM))
  (let ((state (state self)))
    (when (fexit state)
      (funcall (fexit state) self))))

(defmethod next ((self HSM) state-name)
  (exit self)
  (setf (state self) (lookup-state self state-name (states self)))
  (enter self))
   
(defmethod handle ((self HSM) message)
  (handle (state self) message))

(defmethod eh::step ((self HSM))
  (eh::step (state self)))

(defmethod is-busy ((self HSM))
  (is-busy (state self)))

(defmethod lookup-state ((self HSM) state-name)
  (lookup-state-rec self state-name (states self)))

(defmethod lookup-state-rec ((self HSM) state-name state-list)
  (when state-list
    (cond ((equalp (name (first state-list)) state-name)
	   (first state-list))
	  (t (lookup-state-rec self state-name (rest state-list))))))
