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
exports.AttributeDecorator = void 0;
var metadata_1 = require("./metadata");
var AttributeDecorator = /** @class */ (function (_super) {
    __extends(AttributeDecorator, _super);
    function AttributeDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttributeDecorator.prototype.$class = function (attr, value, opts) {
        var _this = this;
        return function (target) {
            var _a, _b, _c;
            if ((_b = (_a = opts === null || opts === void 0 ? void 0 : opts.before) === null || _a === void 0 ? void 0 : _a.call(opts, target)) !== null && _b !== void 0 ? _b : true) {
                _this.addAttribute(attr, value, target);
                (_c = opts === null || opts === void 0 ? void 0 : opts.after) === null || _c === void 0 ? void 0 : _c.call(opts, target);
            }
        };
    };
    AttributeDecorator.prototype.$method = function (attr, value, opts) {
        var _this = this;
        return function (target, method, descriptor) {
            var _a, _b, _c;
            if ((_b = (_a = opts === null || opts === void 0 ? void 0 : opts.before) === null || _a === void 0 ? void 0 : _a.call(opts, target, method, descriptor)) !== null && _b !== void 0 ? _b : true) {
                _this.addAttribute(attr, value, target, method);
                (_c = opts === null || opts === void 0 ? void 0 : opts.after) === null || _c === void 0 ? void 0 : _c.call(opts, target, method, descriptor);
            }
        };
    };
    AttributeDecorator.prototype.$parameter = function (attr, value, opts) {
        var _this = this;
        return function (target, method, index) {
            var _a, _b, _c;
            method = method !== null && method !== void 0 ? method : metadata_1.Constructor;
            if ((_b = (_a = opts === null || opts === void 0 ? void 0 : opts.before) === null || _a === void 0 ? void 0 : _a.call(opts, target, method, index)) !== null && _b !== void 0 ? _b : true) {
                _this.addAttribute(attr, value, target, method, index);
                (_c = opts === null || opts === void 0 ? void 0 : opts.after) === null || _c === void 0 ? void 0 : _c.call(opts, target, method, index);
            }
        };
    };
    return AttributeDecorator;
}(metadata_1.TypeDescriptor));
exports.AttributeDecorator = AttributeDecorator;
//# sourceMappingURL=decorator.js.map