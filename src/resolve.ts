// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isNullOrUndefined } from "@unicreators/util";
import { DependencyKeyNullError } from "./errors";
import { ProviderKey } from "./provider";

export enum ResolveBehavior {
    FromCacheOrCreateNew = 1,
    CreateNew,
    CreateNewAndOverrideCache
};

const ResolveBehaviorValues = [ResolveBehavior.FromCacheOrCreateNew, ResolveBehavior.CreateNew, ResolveBehavior.CreateNewAndOverrideCache];
export const isResolveBehavior = (value: any): value is ResolveBehavior => ResolveBehaviorValues.includes(value);

export interface ResolveContext {
    get: (key: ProviderKey, opts?: {
        behavior?: ResolveBehavior,
        notfoundThrowError?: boolean
    }) => any
};


export class Dependency {

    static ensure(dep: any): Dependency {
        if (dep instanceof Dependency) return dep;
        return new Dependency(dep);
    }

    static create(providerKey: any,
        opts?: { optional?: boolean, useNew?: boolean }): Dependency {
        return new Dependency(providerKey, opts);
    }

    private contextOpts: any;
    constructor(public providerKey: any,
        opts?: { optional?: boolean, useNew?: boolean }) {
        if (_isNullOrUndefined(providerKey)) throw new DependencyKeyNullError();
        this.contextOpts = {
            behavior: opts?.useNew ? ResolveBehavior.CreateNew : undefined,
            notfoundThrowError: !opts?.optional
        };
    }

    resolve(ctx: ResolveContext) {
        return ctx.get(this.providerKey, this.contextOpts);
    }

};

export const depend = Dependency.create;