(defun r/map (&rest args)
  (apply 'list args)
  )


(defun r/map-get (key map)
  (plist-get map key)
  )

;; persistent changes
(defun r/map-set (key val map)
  (plist-put map key val)
  )
(defun r/map-delete ())
(defun r/map-clear ())
(defun r/map-update ())
(defun r/map-merge ())
(defun r/map-merge-with ())
(defun r/map-merge-deep ())
(defun r/map-merge-deep-with ())


;; deep persistent changes
(defun r/map-set-in ())
(defun r/map-delete-in ())
(defun r/map-update-in ())
(defun r/map-merge-in ())
(defun r/map-merge-deep-in ())


;; conversion to seq
;; value equality
;; reading values
;; reading deep value
;; conversion to collections
;; iterators

;; side effects
(defun r/map-foreach (fn map)
  
  )

;; seq algorithms
(defun r/map-map () )
(defun r/map-filter () )
(defun r/map-filter-not () )
(defun r/map-reverse () )
(defun r/map-sort () )
(defun r/map-sortBy () )
(defun r/map-groupBy () )



(r/map-set :first-name "foo" (r/map))

(setq foo (r/map :foo "foo" :bar "bar"))


;;(r/map (lambda (x) (+ 1 x)) '(1 2 3))


(defun r/map-keys (map)
  (let ((out '())
         (i 0))

    (dolist (val map out)
      (print i)
      (setq i (+ 1 i))
      (setq out (cons val out))
      )
    )
  )

(r/map-keys foo)


;;(cdr '(1 2 3))

;;(eq '() nil)
