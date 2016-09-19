(defmacro ~> (body)
  `(lambda (x) ,(reverse (cons `x (reverse body))) )
  )

(funcall (~> (+ 1)) 2)

(print fn)

