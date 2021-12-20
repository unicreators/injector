"use strict";
// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = exports.TypeProvider = void 0;
/// yichen <d.unicreators@gmail.com>
///
var util_1 = require("@unicreators/util");
var errors_1 = require("../errors");
var factory_provider_1 = require("./factory_provider");
var TypeProvider = /** @class */ (function (_super) {
    __extends(TypeProvider, _super);
    function TypeProvider(key, type, dependencies) {
        var _this = _super.call(this, key, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (type.bind.apply(type, __spreadArray([void 0], args, false)))();
        }, dependencies) || this;
        if ((0, util_1._isNullOrUndefined)(key))
            throw new errors_1.ArgumentNullError('key');
        if (!(0, util_1._isFunction)(type))
            throw new errors_1.ArgumentNullError('type');
        return _this;
    }
    return TypeProvider;
}(factory_provider_1.FactoryProvider));
exports.TypeProvider = TypeProvider;
var $type = function (type, dependencies, key) {
    if (key === void 0) { key = type; }
    return new TypeProvider(key, type, dependencies);
};
exports.$type = $type;
//# sourceMappingURL=type_provider.js.map