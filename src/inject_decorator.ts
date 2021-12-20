// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isFunction, _isNullOrUndefined, _isString } from '@unicreators/util'
import { Injector } from './injector';
import { AttributeDecorator } from './decorator';
import { $type } from './providers/type_provider';
import { Type } from './type';
import { ProviderKey } from './provider';
import { Dependency } from './resolve';

enum InjectorAttribute {
    injectable = 0,
    inject,
    optional,
    useNew,
}

const single = (attr: any, decorator: AttributeDecorator,
    fn?: (target: Function, method?: string | symbol, index?: number) => void) => ({
        before: (target: Function, method?: string | symbol, index?: number) =>
            !decorator.hasAttribute(attr, target, method, index),
        after: fn
    });

export class InjectorDecorator extends AttributeDecorator {

    constructor(public injector: Injector) {
        super();
    }

    injectable(opts?: { injector: Injector }) {
        return this.$class(InjectorAttribute.injectable, true,
            single(InjectorAttribute.injectable, this,
                (target: any) => this.registerType(target, opts?.injector)));
    }
    inject(key: ProviderKey) { return this.$parameter(InjectorAttribute.inject, key, single(InjectorAttribute.inject, this)); }
    optional() { return this.$parameter(InjectorAttribute.optional, true, single(InjectorAttribute.optional, this)); }
    useNew() { return this.$parameter(InjectorAttribute.useNew, true, single(InjectorAttribute.useNew, this)); }

    protected registerType(target: Type<any>, injector?: Injector) {
        (injector ?? this.injector)?.register($type(target, this.getDependencies(target)))
    }

    protected getDependencies(target: any): Array<Dependency> {
        return this.getConstructorParameters(target).map(({ type, descriptor }) =>
            Dependency.create(descriptor?.firstValue(InjectorAttribute.inject) ?? type,
                {
                    optional: descriptor?.firstValue(InjectorAttribute.optional),
                    useNew: descriptor?.firstValue(InjectorAttribute.useNew)
                }));
    }
}
