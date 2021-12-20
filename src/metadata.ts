// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import 'reflect-metadata';
import { _isNullOrUndefined } from "@unicreators/util";

abstract class Descriptor {

    private _attributes: Map<any, Array<any>>;
    private get attributes(): Map<any, Array<any>> {
        if (_isNullOrUndefined(this._attributes)) this._attributes = new Map();
        return this._attributes;
    }

    addAttribute(attr: any, value: any) {
        let values = this.attributes.get(attr);
        if (_isNullOrUndefined(values)) {
            values = [];
            this.attributes.set(attr, values);
        }
        values.push(value);
        return this;
    }

    getAttribute(attr: any) { return this.attributes.get(attr) ?? []; }
    firstValue(attr: any, def?: any) { return this.getAttribute(attr)[0] ?? def; }
    hasAttribute(attr: any): boolean { return this.attributes.has(attr); }

}

export const Constructor = Symbol('__constructor__');

export class ClassDescriptor extends Descriptor {
    constructor(public cls: Function) {
        super();
    }

    private _methods: Map<string | symbol, MethodDescriptor>;
    get methods(): Map<string | symbol, MethodDescriptor> {
        if (_isNullOrUndefined(this._methods)) this._methods = new Map<string | symbol, MethodDescriptor>();
        return this._methods;
    }

    private _ctor: MethodDescriptor;
    get ctor(): MethodDescriptor {
        if (_isNullOrUndefined(this._ctor)) this._ctor = new MethodDescriptor(Constructor);
        return this._ctor;
    }

}

export class MethodDescriptor extends Descriptor {
    constructor(public method?: string | symbol) {
        super();
    }

    private _parameters: Map<number, ParameterDescriptor>;
    get parameters(): Map<number, ParameterDescriptor> {
        if (_isNullOrUndefined(this._parameters)) this._parameters = new Map<number, ParameterDescriptor>();
        return this._parameters;
    }
}

export class ParameterDescriptor extends Descriptor {
    constructor(public index: number) {
        super();
    }
}


export class TypeDescriptor {

    addAttribute(attr: any, value: any, cls: Function, method?: string | symbol, parameterIndex?: number) {
        this.ensureDescriptor(cls, method, parameterIndex).addAttribute(attr, value);
    }

    getAttribute(attr: any, cls: Function, method?: string | symbol, parameterIndex?: number): Array<any> {
        return this.getDescriptor(cls, method, parameterIndex).getAttribute(attr);
    }

    hasAttribute(attr: any, cls: Function, method?: string | symbol, parameterIndex?: number): boolean {
        return !!this.getDescriptor(cls, method, parameterIndex)?.hasAttribute(attr);
    }

    getConstructorParameters(target: any) {
        return this.getMethodParameters(target);
    }

    getMethodParameters(target: any, method?: string): Array<{ type: Function, descriptor: Descriptor }> {
        return (Reflect.getMetadata('design:paramtypes', target, method) || [])
            .map((type, index) => ({
                type,
                descriptor: this.getDescriptor(target, method ?? Constructor, index)
            }));
    }

    protected ensureDescriptor(cls: Function, method?: string | symbol, parameterIndex?: number) {
        let c = Reflect.getMetadata(this, cls);
        if (_isNullOrUndefined(c)) {
            c = new ClassDescriptor(cls);
            Reflect.defineMetadata(this, c, cls);
        }
        if (_isNullOrUndefined(method)) return c;
        let m = (method === Constructor) ? c.ctor : c.methods.get(method);
        if (_isNullOrUndefined(m)) {
            m = new MethodDescriptor(method);
            c.methods.set(method, m);
        }
        if (_isNullOrUndefined(parameterIndex)) return m;
        let p = m.parameters.get(parameterIndex);
        if (_isNullOrUndefined(p)) {
            p = new ParameterDescriptor(parameterIndex);
            m.parameters.set(parameterIndex, p);
        }
        return p;
    }

    protected getDescriptor(cls: Function, method?: string | symbol, parameterIndex?: number) {
        let c = Reflect.getMetadata(this, cls);
        if (_isNullOrUndefined(c) || _isNullOrUndefined(method)) return c;
        let m = (method === Constructor) ? c.ctor : c.methods.get(method);
        if (_isNullOrUndefined(m) || _isNullOrUndefined(parameterIndex)) return m;
        return m.parameters.get(parameterIndex);
    }

}