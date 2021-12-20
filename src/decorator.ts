// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isNullOrUndefined } from "@unicreators/util";
import { Constructor, TypeDescriptor } from "./metadata";

export class AttributeDecorator extends TypeDescriptor {

    protected $class(attr: any, value: any,
        opts?: {
            before?: (target: Function) => boolean,
            after?: (target: Function) => void
        }): ClassDecorator {
        return (target: Function) => {
            if (opts?.before?.(target) ?? true) {
                this.addAttribute(attr, value, target);
                opts?.after?.(target);
            }
        };
    }

    protected $method(attr: any, value: any,
        opts?: {
            before?: (target: Function, method: string | symbol, descriptor: TypedPropertyDescriptor<any>) => boolean,
            after?: (target: Function, method: string | symbol, descriptor: TypedPropertyDescriptor<any>) => void
        }): MethodDecorator {
        return (target: Function, method: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
            if (opts?.before?.(target, method, descriptor) ?? true) {
                this.addAttribute(attr, value, target, method);
                opts?.after?.(target, method, descriptor);
            }
        };
    }

    protected $parameter(attr: any, value: any,
        opts?: {
            before?: (target: Function, method: string | symbol, index: number) => boolean,
            after?: (target: Function, method: string | symbol, index: number) => void
        }): ParameterDecorator {
        return (target: Function, method: string | symbol, index: number) => {
            method = method ?? Constructor;
            if (opts?.before?.(target, method, index) ?? true) {
                this.addAttribute(attr, value, target, method, index);
                opts?.after?.(target, method, index);
            }
        }
    }
   
}
