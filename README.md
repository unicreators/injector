[![Tests](https://github.com/unicreators/injector/actions/workflows/tests.yml/badge.svg)](https://github.com/unicreators/injector/actions/workflows/tests.yml) 
[![npm (scoped)](https://img.shields.io/npm/v/@unicreators/injector)](https://www.npmjs.com/package/@unicreators/injector) 
[![License](https://img.shields.io/npm/l/@unicreators/injector)](LICENSE)

Injector is a inversion of control (IoC) container for TypeScript and JavaScript applications. 

Injector 是一个用于 TypeScript 和 JavaScript 应用程序的控制反转 (IoC) 容器。


```ts
import { ValueProvider, injectable, inject, injector } from '@unicreators/injector';

@injectable()
class B { }

@injectable()
class A { constructor(public b: B, @inject('value1') v1: number) { } }

injector.register(new ValueProvider('value1', 10));

let a = injector.get<A>(A);
let b = injector.get<B>(B);

expect(a).instanceOf(A);
expect(a.b).equals(b);
expect(a.v1).equals(10);

```

:watermelon: [Example](./tests/index.test.ts)  


## Install

```sh
$ npm install @unicreators/injector reflect-metadata
```

> 使用 injector 时 TypeScript 版本需 >= 4，并且需配置 `tsconfig.json` 开启 `experimentalDecorators` 和 `emitDecoratorMetadata` 选项。

```json
{
    "compilerOptions": {
        "target": "es5",        
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```


### License

[MIT](LICENSE)