;;; packages.el --- rabbit-web-live layer packages file for Spacemacs.
;;
;; Copyright (c) 2012-2016 Sylvain Benner & Contributors
;;
;; Author:  <Rabbit@yfhj1990@hotmail.com>
;; URL: https://github.com/syl20bnr/spacemacs
;;
;; This file is not part of GNU Emacs.
;;
;;; License: GPLv3

;;; Code:

(setq rabbit-web-live-packages
      '(
        stylus-mode
        jinja2-mode
        editorconfig
        ))

(when (configuration-layer/layer-usedp 'auto-completion)
  (defun rabbit-web-live/post-init-company ()
    (spacemacs|add-company-hook css-mode)
    )
  )



(defun rabbit-web-live/init-stylus-mode ()
  (use-package stylus-mode
    :defer t
    :init)
  )

(defun rabbit-web-live/init-jinja2-mode ()
  (use-package jinja2-mode
    :defer t
    :init)
  )

(defun rabbit-web-live/init-editorconfig ()
  (use-package editorconfig
    :defer t
    :init)
  (editorconfig-apply)
  )

;;; packages.el ends here
