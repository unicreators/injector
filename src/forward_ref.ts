// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isFunction } from "@unicreators/util";

const __forwardRef__ = Symbol('__forwardRef__');
export const forwardRef = (fn: () => any): any => { fn[__forwardRef__] = forwardRef; return fn; };
export const isForwardRef = (key: any) => _isFunction(key) && key[__forwardRef__] === forwardRef;
export const resolveForwardRef = (key: any): any => isForwardRef(key) ? key() : key;
