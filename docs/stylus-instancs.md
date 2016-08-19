### rabbit custom output comments

stylus 中的注释简单来说分为两种，单行注释和多行注释。就像 JavaScript 那样单行注释以`//`开始，而多行注释包裹在`/**/`中。

在 stylus 的注释中，有些情况需要说明。单行注释不会输出，因为并不是 css 的规则，而多行注释的话是会输出的。当然了，如果开启 stylus 的`compress`选项的话来启用压缩，那多行注释也不会输出，**除非写在了`/*! */`中**：

```stylus
/*!
 * This comments will output.
 */
 
foo()
```

#### rabbit 专用输出注释

