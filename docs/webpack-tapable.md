# Webpack Tapable

tapable 用于给类添加插件，并提供了一套强大的插件执行系统。


There are two types of plugin interfaces.

    Timing based
        sync (default): As seen above. Use return.
        async: Last parameter is a callback. Signature: function(err, result)
        parallel: The handlers are invoked parallel (async).

    Return value
        not bailing (default): No return value.
        bailing: The handlers are invoked in order until one handler returns something.
        parallel bailing: The handlers are invoked in parallel (async). The first returned value (by order) is significant.
        waterfall: Each handler gets the result value of the last handler as an argument.
