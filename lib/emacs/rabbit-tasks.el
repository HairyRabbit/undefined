(require 'dash)
(require 's)
(require 'f)

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
