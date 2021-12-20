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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyKeyNullError = exports.ArgumentNullError = exports.ProviderAlreadyExistsError = exports.NoProviderError = exports.CircularReferenceError = exports.InteranlError = void 0;
/// yichen <d.unicreators@gmail.com>
///
var util_1 = require("@unicreators/util");
var stringify = function (key) {
    if ((0, util_1._isNullOrUndefined)(key))
        return '';
    if ((0, util_1._isString)(key))
        return key;
    if (Array.isArray(key))
        return "[".concat(key.map(stringify).join(', '), "]");
    if (key.name)
        return "".concat(key.name);
    var _str = key.toString();
    if ((0, util_1._isNullOrUndefined)(_str))
        return '';
    var index = _str.indexOf('\n');
    return index === -1 ? _str : _str.substring(0, index);
};
var InteranlError = /** @class */ (function (_super) {
    __extends(InteranlError, _super);
    function InteranlError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, InteranlError.prototype);
        return _this;
    }
    return InteranlError;
}(Error));
exports.InteranlError = InteranlError;
var CircularReferenceError = /** @class */ (function (_super) {
    __extends(CircularReferenceError, _super);
    function CircularReferenceError() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var _this = _super.call(this, "Circular reference ".concat(keys.map(function (key) { return "[".concat(stringify(key), "]"); }).join(' => '), ".")) || this;
        Object.setPrototypeOf(_this, CircularReferenceError.prototype);
        return _this;
    }
    return CircularReferenceError;
}(InteranlError));
exports.CircularReferenceError = CircularReferenceError;
var NoProviderError = /** @class */ (function (_super) {
    __extends(NoProviderError, _super);
    function NoProviderError() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var _this = _super.call(this, "No provider for ".concat(keys.map(function (key) { return "[".concat(stringify(key), "]"); }).join(' => '), ".")) || this;
        Object.setPrototypeOf(_this, NoProviderError.prototype);
        return _this;
    }
    return NoProviderError;
}(InteranlError));
exports.NoProviderError = NoProviderError;
var ProviderAlreadyExistsError = /** @class */ (function (_super) {
    __extends(ProviderAlreadyExistsError, _super);
    function ProviderAlreadyExistsError(key) {
        var _this = _super.call(this, "Provider [".concat(stringify(key), "] already exists.")) || this;
        _this.key = key;
        Object.setPrototypeOf(_this, ProviderAlreadyExistsError.prototype);
        return _this;
    }
    return ProviderAlreadyExistsError;
}(InteranlError));
exports.ProviderAlreadyExistsError = ProviderAlreadyExistsError;
var ArgumentNullError = /** @class */ (function (_super) {
    __extends(ArgumentNullError, _super);
    function ArgumentNullError(argumentName) {
        var _this = _super.call(this, "Argument \"".concat(argumentName, "\" is null.")) || this;
        _this.argumentName = argumentName;
        Object.setPrototypeOf(_this, ArgumentNullError.prototype);
        return _this;
    }
    return ArgumentNullError;
}(InteranlError));
exports.ArgumentNullError = ArgumentNullError;
var DependencyKeyNullError = /** @class */ (function (_super) {
    __extends(DependencyKeyNullError, _super);
    function DependencyKeyNullError() {
        var _this = _super.call(this, "Dependent provider key is null.") || this;
        Object.setPrototypeOf(_this, DependencyKeyNullError.prototype);
        return _this;
    }
    return DependencyKeyNullError;
}(InteranlError));
exports.DependencyKeyNullError = DependencyKeyNullError;
//# sourceMappingURL=errors.js.map