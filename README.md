# Rabbit 专用不科学实验性超级只能打包工具

那么首先，什么是专用的？

专用的就是说只有兔可以用，其他人都不可以

## 开始

首先，用`git`将这个项目克隆到本地

```sh
git clone https://github.com/yuffiy/atlantis.git
```

运行下面的命令

```sh
npm i
npm start
```

Browser 会自动打开 `localhost:8888`

**Elm player** 需要有 `elm 0.17`，并且在 start 之前安装项目所需的依赖

```sh
elm package install -y
```

## Happypack + dll 协助 webpack2 急速 rebuild

除了常规的优化策略，这里还用到了`Happypack`，Happypack的目的是为了让打包任务多线程并列执行，并且将缓存最大化。在前置缓存之后打包速度的提升是非常明显的。

## 自动将 dependencies 打包到 dll

...

## 用 webpack 来打包 elm app

* 很多情况下会写 port 与 Js 交互，若是写 Js 用了到 es ts 或其他 toJs，就有打包的需求，那么，webpack you need
* elm reactor 用来调试很强大，但同样的事情 webpack 也可以做到，并提供了其他的便利功能，比如 api mock server
* 生产模式下，项目上线也可以用 webpack 直接打包成产品

## 工具自动重启

监听builder文件夹，发生变化后会自动重启兔builder
