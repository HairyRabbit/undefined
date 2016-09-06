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


### InputFileSystem && OutputFileSystem


### Records

Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.

This is required, when using Hot Code Replacement between multiple calls to the compiler.

```json
{
  "modules": {
    "byIdentifier": {
      "node_modules\\babel-loader\\index.js?{\"presets\":[[\"es2015\",{\"modules\":false}]]}!lib\\WebpackSimple1.js": 0,
      "node_modules\\babel-loader\\index.js?{\"presets\":[[\"es2015\",{\"modules\":false}]]}!lib\\WebpackSimple.js": 1
    },
    "usedIds": {
      "0": 0,
      "1": 1
    }
  },
  "chunks": {
    "byName": {
      "main": 0
    },
    "byBlocks": {},
    "usedIds": {
      "0": 0
    }
  }
}
```


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


### DependenciesBlock

DependenciesBlockVariable

addBlock
addVariable
addDependency
updateHash
disconnect
unseal
hasDependencies
sortItems


### Module


