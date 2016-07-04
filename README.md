# Rabbit 专用打包工具

那么首先，什么是专用的？

专用的意思就是说只有兔可以用，其他人都不可以

## How to use

运行下面的命令

```sh
npm i
npm start
```

Browser 会自动打开 `localhost:8888`

**Elm player** 需要先 `install elm 0.17`，并且在 start 之前需要安装依赖

```sh
elm package install -y
```

## 使用 webpack2 && happypack && dll 急速 rebuild

...

## 自动将 dependencies 打包到 dll

...

## 用 webpack 来打包 elm app

* 很多情况下会写 port 与 Js 交互，若是写 Js 用了到 es ts 或其他 toJs，就有打包的需求，那么，webpack you need
* elm reactor 用来调试很强大，但同样的事情 webpack 也可以做到，并提供了其他的便利功能，比如 api mock server
* 生产模式下，项目上线也可以用 webpack 直接打包成产品



