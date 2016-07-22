(require 'websocket)
(require 'dash)
(require 'url-util)
(require 'ov)

(setq server-conn
      (websocket-server
       9999
       :on-message (lambda (websocket frame)
		     (let ((rabbit-msg (websocket-frame-payload frame)))
		       ;;(message rabbit-msg)
		       (rabbit/commands rabbit-msg)))
       :on-open (lambda (websocket)
		  (message "open"))
       :on-error (lambda (websocket type err) (message err))
       :on-close (lambda (websocket) (message "close")
		   )))


(defun rabbit/commands (cmd)
  "Reverse commands."
  (let* ((queries (url-parse-query-string cmd))
	 (command (car (assoc-default "cmd" queries))))
    (print command)
    (print queries)
    (when (string= command "LocateError")
      (rabbit/commands-locateerror queries)
      )))

(defun rabbit/commands-locateerror (queries)
  "Open file and locate errors (Line, Col)"
  (let* ((filename (car (assoc-default "file" queries)))
	 (line (string-to-int (car (assoc-default "line" queries))))
	 (char (string-to-int (car (assoc-default "char" queries))))
	 (buf (find-file filename)))
    
    (print filename)
    (print line)
    (print char)
    (print buf)

    (with-current-buffer buf
      (save-excursion
	(goto-line line)
	(beginning-of-line)
	(forward-char char)
	
	(ov-set (ov-line) 'face '(:height 2.5 :background "red"))
	)
      )))

;;(rabbit/commands "cmd=LocateError&file=F%3A%5Catlantis%5Csrc%5Cui-demo%5Cindex.html&line=7&char=1")



;;(ov-clear)


