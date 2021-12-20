// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { Dependency, ResolveContext } from "../resolve";
import { Provider, ProviderKey } from "../provider";

export abstract class FactoryProviderBase extends Provider {

    constructor(key: ProviderKey) { super(key); }

    protected abstract get factory(): (...args: Array<any>) => any;
    protected abstract get dependencies(): Array<Dependency>;

    resolve(ctx: ResolveContext) { return this.factory(...this.buildArguments(ctx)); }

    protected buildArguments(ctx: ResolveContext): Array<any> {
        return this.dependencies.map(dep => dep.resolve(ctx));
    }
}



export class FactoryProvider extends FactoryProviderBase {
    constructor(key: ProviderKey, factory: (...args: Array<any>) => any,
        dependencies: Array<ProviderKey | Dependency> = []) {
        super(key);
        this._factory = factory;
        this._dependencies = dependencies.map(Dependency.ensure);
    }

    private _factory: (...args: Array<any>) => any;
    protected get factory(): (...args: Array<any>) => any {
        return this._factory;
    }

    private _dependencies: Array<Dependency>;
    protected get dependencies(): Array<Dependency> {
        return this._dependencies;
    }

}

export const $factory = (key: ProviderKey, fn: (...args: Array<any>) => any, dependencies: Array<ProviderKey | Dependency>) => new FactoryProvider(key, fn, dependencies);
