// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { ResolveContext } from "./resolve";

export type ProviderKey = any;

export abstract class Provider {
    constructor(public key: ProviderKey) {
    }
    abstract resolve(ctx: ResolveContext): any;
}