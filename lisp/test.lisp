(in-package "EH")

(defun test ()
  (let ((hw (new-HelloWorld nil "hello world")))
    (let ((m (make-instance 'InputMessage :port "stdin" :data t :from hw :trail nil)))
      (inject hw m)
      (run hw)
      (format *standard-output* "~%~%LIFO:")
      (maphash #'(lambda (key val)
                   (format *standard-output* "~%\"~a\": ~a" key val))
               (outputs-LIFO-dictionary hw))
      (format *standard-output* "~%~%FIFO:")
      (maphash #'(lambda (key val)
                   (format *standard-output* "~%\"~a\": ~a" key val))
               (outputs-FIFO-dictionary hw))
      (values))))
