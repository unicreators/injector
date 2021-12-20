// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { ResolveContext } from "../resolve";
import { Provider, ProviderKey } from "../provider";

export class ValueProvider extends Provider {
    constructor(key: ProviderKey, private value: any) {
        super(key);
    }

    resolve(ctx: ResolveContext) { return this.value; }
}

export const $value = (key: ProviderKey, value: any) => new ValueProvider(key, value);