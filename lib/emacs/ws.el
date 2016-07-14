(require 'websocket)


(setq server-conn
      (websocket-server
       9999
       :on-message (lambda (websocket frame)
		     (message (websocket-frame-payload frame)))
       :on-open (lambda (websocket)
		  (message "open"))
       :on-error (lambda (websocket type err) (message "err"))
       :on-close (lambda (websocket) (message "close")
		   )))


