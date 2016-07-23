;;; packages.el --- rabbit-web-live layer packages file for Spacemacs.
;;
;; Copyright (c) 2012-2016 Sylvain Benner & Contributors
;;
;; Author:  <yufi@DESKTOP-IS3EVI7>
;; URL: https://github.com/syl20bnr/spacemacs
;;
;; This file is not part of GNU Emacs.
;;
;;; License: GPLv3

;;; Commentary:

;; See the Spacemacs documentation and FAQs for instructions on how to implement
;; a new layer:
;;
;;   SPC h SPC layers RET
;;
;;
;; Briefly, each package to be installed or configured by this layer should be
;; added to `rabbit-web-live-packages'. Then, for each package PACKAGE:
;;
;; - If PACKAGE is not referenced by any other Spacemacs layer, define a
;;   function `rabbit-web-live/init-PACKAGE' to load and initialize the package.

;; - Otherwise, PACKAGE is already referenced by another Spacemacs layer, so
;;   define the functions `rabbit-web-live/pre-init-PACKAGE' and/or
;;   `rabbit-web-live/post-init-PACKAGE' to customize the package as it is loaded.

;;; Code:

(setq rabbit-web-live-packages
      '(
        stylus-mode
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

(defun rabbit-web-live/init-editorconfig ()
  (use-package stylus-mode
    :defer t)
  )

;;; packages.el ends here
