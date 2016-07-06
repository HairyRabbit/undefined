@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe -r babel-register"  "%~dp0\..\lib\scaffold\rabbit.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  -r babel-register "%~dp0\..\lib\scaffold\rabbit.js" %*
)
