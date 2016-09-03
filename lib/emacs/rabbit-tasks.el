(require 'dash)
(require 's)
(require 'f)

(require 'filenotify)

(defun tasker () ""
  (print 1))

(defun absolutePath? (path)
  "\
Test path is the absolute path.
"
  (let ((regex "^[A-Z]\\|^\/"))
    (s-matches? regex path)
    ))


(absolutePath? "//")


(defun on-ntfy (evt)
  (message "Event %s" evt)
  )

(file-notify-add-watch "f:/atlantis/.test"
  '(change attribute-change) 'on-ntfy)


(defun rabbit/watcher (pathFn)
  "\
Path must be absolute path.
If file is a directory, changes for all files in that directory will be notified. This does
not work recursively.
"
  (let ((path (funcall pathFn)))
    (map (lambda (n)
           (file-notify-add-watch "f:/atlantis/.test"
             '(change attribute-change) 'on-ntfy)
           ) path)
    )
  )


(rabbit/watcher
  (f-directories "f:/atlantis/.test")
  )

(f-directories "f:/atlantis/.test")
