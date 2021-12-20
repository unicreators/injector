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
exports.InjectorDecorator = void 0;
var decorator_1 = require("./decorator");
var type_provider_1 = require("./providers/type_provider");
var resolve_1 = require("./resolve");
var InjectorAttribute;
(function (InjectorAttribute) {
    InjectorAttribute[InjectorAttribute["injectable"] = 0] = "injectable";
    InjectorAttribute[InjectorAttribute["inject"] = 1] = "inject";
    InjectorAttribute[InjectorAttribute["optional"] = 2] = "optional";
    InjectorAttribute[InjectorAttribute["useNew"] = 3] = "useNew";
})(InjectorAttribute || (InjectorAttribute = {}));
var single = function (attr, decorator, fn) { return ({
    before: function (target, method, index) {
        return !decorator.hasAttribute(attr, target, method, index);
    },
    after: fn
}); };
var InjectorDecorator = /** @class */ (function (_super) {
    __extends(InjectorDecorator, _super);
    function InjectorDecorator(injector) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        return _this;
    }
    InjectorDecorator.prototype.injectable = function (opts) {
        var _this = this;
        return this.$class(InjectorAttribute.injectable, true, single(InjectorAttribute.injectable, this, function (target) { return _this.registerType(target, opts === null || opts === void 0 ? void 0 : opts.injector); }));
    };
    InjectorDecorator.prototype.inject = function (key) { return this.$parameter(InjectorAttribute.inject, key, single(InjectorAttribute.inject, this)); };
    InjectorDecorator.prototype.optional = function () { return this.$parameter(InjectorAttribute.optional, true, single(InjectorAttribute.optional, this)); };
    InjectorDecorator.prototype.useNew = function () { return this.$parameter(InjectorAttribute.useNew, true, single(InjectorAttribute.useNew, this)); };
    InjectorDecorator.prototype.registerType = function (target, injector) {
        var _a;
        (_a = (injector !== null && injector !== void 0 ? injector : this.injector)) === null || _a === void 0 ? void 0 : _a.register((0, type_provider_1.$type)(target, this.getDependencies(target)));
    };
    InjectorDecorator.prototype.getDependencies = function (target) {
        return this.getConstructorParameters(target).map(function (_a) {
            var _b;
            var type = _a.type, descriptor = _a.descriptor;
            return resolve_1.Dependency.create((_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.firstValue(InjectorAttribute.inject)) !== null && _b !== void 0 ? _b : type, {
                optional: descriptor === null || descriptor === void 0 ? void 0 : descriptor.firstValue(InjectorAttribute.optional),
                useNew: descriptor === null || descriptor === void 0 ? void 0 : descriptor.firstValue(InjectorAttribute.useNew)
            });
        });
    };
    return InjectorDecorator;
}(decorator_1.AttributeDecorator));
exports.InjectorDecorator = InjectorDecorator;
//# sourceMappingURL=inject_decorator.js.map