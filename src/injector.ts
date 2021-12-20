// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isBoolean, _isNullOrUndefined } from "@unicreators/util";
import { isResolveBehavior, ResolveBehavior } from "./resolve";
import { CircularReferenceError, ProviderAlreadyExistsError, NoProviderError } from "./errors";
import { resolveForwardRef } from "./forward_ref";
import { Provider, ProviderKey } from "./provider";
import { ValueProvider } from "./providers/value_provider";

export class Injector {

    static create(providers: Array<Provider> = []): Injector {
        return new Injector(providers);
    }

    private providers = new Map<ProviderKey, Provider>();
    private instances = new Map();

    constructor(providers: Array<Provider> = []) {
        this.register(new ValueProvider(Injector, this),
            ...providers);
    }

    register(...providers: Array<Provider>): this {
        providers.forEach(provider => {
            if (!(provider instanceof Provider)) return;
            let key = provider.key;
            if (this.providers.has(key)) throw new ProviderAlreadyExistsError(key);
            this.providers.set(key, provider);
        });
        return this;
    }

    get<T = any>(key: ProviderKey, opts?: {
        behavior?: ResolveBehavior,
        notfoundThrowError?: boolean
    } | boolean | ResolveBehavior): T {
        return this._get(key, [],
            Object.assign({ notfoundThrowError: false },
                (_isBoolean(opts) ? { notfoundThrowError: opts } :
                    isResolveBehavior(opts) ? { behavior: opts } : opts)) as any) as T;
    }

    protected _get(key: ProviderKey, paths: Array<ProviderKey>,
        opts?: {
            behavior?: ResolveBehavior,
            notfoundThrowError?: boolean
        }): any {
        let _key = resolveForwardRef(key);
        if (paths.indexOf(key) > -1) throw new CircularReferenceError(...paths, _key);
        if (!this.providers.has(_key)) {
            if ((opts?.notfoundThrowError ?? true)) throw new NoProviderError(...paths, _key);
            return undefined;
        }
        paths.push(_key);
        let provider = this.providers.get(_key),
            createNew = (overrideCache?: boolean) => {
                let instance = this.createInstance(provider, paths);
                if (!_isNullOrUndefined(instance) && overrideCache)
                    this.instances.set(_key, instance);
                return instance;
            };
        switch (opts?.behavior) {
            case ResolveBehavior.CreateNew:
            case ResolveBehavior.CreateNewAndOverrideCache: {
                return createNew(opts?.behavior === ResolveBehavior.CreateNewAndOverrideCache);
            }
            default: {
                return this.instances.has(_key) ? this.instances.get(_key) : createNew(true);
            }
        }
    }

    protected buildContext(paths: Array<ProviderKey>) {
        return {
            get: (key: ProviderKey, opts?: {
                behavior?: ResolveBehavior,
                notfoundThrowError?: boolean
            }) => this._get(key, paths, opts)
        };
    }

    protected createInstance(provider: Provider, paths: Array<any>): any {
        return provider.resolve(this.buildContext(paths));
    }
}

