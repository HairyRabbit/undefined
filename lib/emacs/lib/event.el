;; alist
;; ((name . (handle)))
;;
;; target -> (target events)


(defun init
  ()
  " \
sig: init :: target -> (target, events)
"
  )

(defun on
  (target name handle)
  " \
sig: on :: target -> string -> handle -> (target, events)
"
  )

(defun fire ())

(defun off ())

(defun once ())

(defun parser ())

(setq plist '(foo 4))

(plist-get plist 'foo)
