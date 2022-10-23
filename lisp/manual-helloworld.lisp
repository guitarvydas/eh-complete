(in-package "EH")

(defun new-HelloWorld (parent name)
  (let ((self (make-instance 'Container :parent parent :name name)))
    (let ((cell_7 (make-instance 'Hello :parent self :name (format nil "~a-~a" name "Hello"))))
      (let ((cell_8 (make-instance 'World :parent self :name (format nil "~a-~a" name "World"))))
        (let ((children (list cell_7 cell_8 )))
          (let ((connections (list  
                              (make-instance 'DownConnect :sender (make-instance 'SelfSender :from self :port "stdin") :receiver (make-instance 'Receiver :to cell_7 :port "stdin")) 
                              (make-instance 'RouteConnect :sender (make-instance 'Sender :from cell_7 :port "stdout") :receiver (make-instance 'Receiver :to cell_8 :port "stdin")) 
                              (make-instance 'UpConnect :sender (make-instance 'Sender :from cell_8 :port "stdout") :receiver (make-instance 'SelfReceiver :to self :port "stdout"))  )))
            (setf (children self) children)
            (setf (connections self) connections)
            self))))))
  
