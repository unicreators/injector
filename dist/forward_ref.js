"use strict";
// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveForwardRef = exports.isForwardRef = exports.forwardRef = void 0;
/// yichen <d.unicreators@gmail.com>
///
var util_1 = require("@unicreators/util");
var __forwardRef__ = Symbol('__forwardRef__');
var forwardRef = function (fn) { fn[__forwardRef__] = exports.forwardRef; return fn; };
exports.forwardRef = forwardRef;
var isForwardRef = function (key) { return (0, util_1._isFunction)(key) && key[__forwardRef__] === exports.forwardRef; };
exports.isForwardRef = isForwardRef;
var resolveForwardRef = function (key) { return (0, exports.isForwardRef)(key) ? key() : key; };
exports.resolveForwardRef = resolveForwardRef;
//# sourceMappingURL=forward_ref.js.map