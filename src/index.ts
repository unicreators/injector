// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import 'reflect-metadata';
import { Injector } from './injector';
import { InjectorDecorator } from './inject_decorator';
import { ProviderKey } from './provider';

export * from './injector';
export * from './providers';
export * from './inject_decorator';
export * from './forward_ref';
export * from './errors';
export * from './resolve';

export const injector = new Injector();
const decorator = new InjectorDecorator(injector);

export const injectable = (injector?: Injector) => decorator.injectable({ injector });
export const inject = (key: ProviderKey) => decorator.inject(key);
export const optional = () => decorator.optional();
export const useNew = () => decorator.useNew();
