// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isFunction, _isNullOrUndefined } from "@unicreators/util";
import { ArgumentNullError } from "../errors";
import { ProviderKey } from "../provider";
import { Dependency } from "../resolve";
import { Type } from "../type";
import { FactoryProvider } from "./factory_provider";

export class TypeProvider extends FactoryProvider {
    constructor(key: ProviderKey, type: Type<any>,
        dependencies?: Array<ProviderKey | Dependency>) {
        super(key, (...args: Array<any>) => new type(...args), dependencies);
        if(_isNullOrUndefined(key)) throw new ArgumentNullError('key');
        if(!_isFunction(type)) throw new ArgumentNullError('type');
    }
}

export const $type = (type: Type<any>, dependencies?: Array<ProviderKey | Dependency>, key: ProviderKey = type) => new TypeProvider(key, type, dependencies);