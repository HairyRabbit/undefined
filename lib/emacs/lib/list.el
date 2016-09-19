;;; -*- lexical-binding: t -*-
;;;
;; List
;;;

(defun r/list (&rest li)
  (apply 'list li)
  )

(defun r/repeat (n &optional ctn)
  (make-list n ctn)
  )

(defmacro r/always (x)
  `(lambda (_) ,x)
  )

(r/map (r/always 2) (r/repeat 1))

(defun r/empty? (li)
  (eq nil li))

(defun r/fst (li)
  (car li)
  )

(defun r/concat (li1 li2)

  )


(defun r/lst (li)
  (car (reverse li))
  )

(last '(1 2 3) 2)

(defun r/init (li)
  (butlast li 1)
  )

(defun r/tail (li)
  (cdr li)
  )


(defun r/reduce (call init map)
  (if (r/empty? map)
    init
    (r/reduce call (funcall call init (car map)) (cdr map))
    )
  )

(defun r/map (fn map)
  (let ((wrap (lambda (acc curr)
                (cons (funcall fn curr) acc))))
    (reverse (r/reduce wrap '() map))
    )
  )
