### 入口函数 

compiler.run()

### 插件顺序

* content-module-factory



* compiler
* this-compiltion
* factory
* resolver
* parsed-resolve
* new-resolve
* resolve
* make
* run
* before-run


### emit 写入输出到文件

emit -> done

* emitAssets
* emitFiles
* afterEmit
* emitRecords


### Compiler.compile 开始编译

Plugins:: make -> after-compile

compilation.assets
parentCompilation.assets
parentCompilation.children

#### make <- compilation

Parallel: make(

  compilation.finish(
    P: finish-modules
  )
  
  
  compilation.seal(
    PA: after-compile
  )
)

#### after-compile <- compilation

callback(compilation)



### Compilation Module

addModule
getModule
findModule
buildModule
processModuleDependencies
addModuleDependencies
prefetch
rebuildModule
finish

applyModuleIds
