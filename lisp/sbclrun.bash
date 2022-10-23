sbcl --eval "(declaim (sb-ext:muffle-conditions cl:style-warning))" --load load.lisp --eval "(eh:test)" --eval "(progn (terpri) (sb-ext:exit))"
