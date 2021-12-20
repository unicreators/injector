"use strict";
// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNew = exports.optional = exports.inject = exports.injectable = exports.injector = void 0;
/// yichen <d.unicreators@gmail.com>
///
require("reflect-metadata");
var injector_1 = require("./injector");
var inject_decorator_1 = require("./inject_decorator");
__exportStar(require("./injector"), exports);
__exportStar(require("./providers"), exports);
__exportStar(require("./inject_decorator"), exports);
__exportStar(require("./forward_ref"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./resolve"), exports);
exports.injector = new injector_1.Injector();
var decorator = new inject_decorator_1.InjectorDecorator(exports.injector);
var injectable = function (injector) { return decorator.injectable({ injector: injector }); };
exports.injectable = injectable;
var inject = function (key) { return decorator.inject(key); };
exports.inject = inject;
var optional = function () { return decorator.optional(); };
exports.optional = optional;
var useNew = function () { return decorator.useNew(); };
exports.useNew = useNew;
//# sourceMappingURL=index.js.map