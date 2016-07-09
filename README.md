# Rabbit 专用不科学实验性超级智能打包工具

那么首先，什么是专用的？

专用的就是说只有兔可以用，其他人都不可以

首先，用`git`将这个项目克隆到本地

```sh
git clone https://github.com/yuffiy/atlantis.git
```

运行下面的命令

```sh
npm i
npm start
```

Browser会自动打开 `localhost:8888`

**Elm player** 需要有`elm 0.17`，并且在start之前安装项目所需的依赖

```sh
elm package install -y
```

## Happypack + dll 协助 webpack2 急速 rebuild

除了常规的优化策略，这里还用到了`Happypack`，Happypack的目的是为了让打包任务多线程并列执行，并且将缓存最大化。在前置缓存之后打包速度的提升是非常明显的。

前置`dll`的目的同样也是为了增速。

## 自动将 dependencies 打包到 dll

策略是，监听`package.json`文件`dependencies`部分的变化，变化时重新将所有dependencies中申明的依赖全部打包。因为有Happypack前置缓存的原因，所以这个watch打包也是非常快的。

但这里有个问题，有些依赖并不能直接打包，比如`monaco-editor`，这样打包会报错。解决办法有两个：

1. 安装这些依赖时不要使用`-S`，使用`-D`是可以的，比如`npm i -D monaco-editor`，这样依赖会安装到`devDependencies`而不是`dependencies`
2. 将依赖的名称加入到`dll`的黑名单中，如此打包会自动忽略同名的依赖，当然这个需要写在`.rabbit`中

当然，报错了也不要紧，兔builder 会将报错的家伙扔到黑名单中，然后放弃打包或是重新打包。

## 用 webpack 来打包 elm app

* 很多情况下会写 port 与 Js 交互，若是写 Js 用了到 es ts 或其他 toJs，就有打包的需求，那么，webpack you need
* elm reactor 用来调试很强大，但同样的事情 webpack 也可以做到，并提供了其他的便利功能，比如 api mock server
* 生产模式下，项目上线也可以用 webpack 直接打包成产品

## 工具自动重启

监听builder文件夹，发生变化后会自动重启兔builder
