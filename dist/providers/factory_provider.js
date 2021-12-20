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
exports.$factory = exports.FactoryProvider = exports.FactoryProviderBase = void 0;
/// yichen <d.unicreators@gmail.com>
///
var resolve_1 = require("../resolve");
var provider_1 = require("../provider");
var FactoryProviderBase = /** @class */ (function (_super) {
    __extends(FactoryProviderBase, _super);
    function FactoryProviderBase(key) {
        return _super.call(this, key) || this;
    }
    FactoryProviderBase.prototype.resolve = function (ctx) { return this.factory.apply(this, this.buildArguments(ctx)); };
    FactoryProviderBase.prototype.buildArguments = function (ctx) {
        return this.dependencies.map(function (dep) { return dep.resolve(ctx); });
    };
    return FactoryProviderBase;
}(provider_1.Provider));
exports.FactoryProviderBase = FactoryProviderBase;
var FactoryProvider = /** @class */ (function (_super) {
    __extends(FactoryProvider, _super);
    function FactoryProvider(key, factory, dependencies) {
        if (dependencies === void 0) { dependencies = []; }
        var _this = _super.call(this, key) || this;
        _this._factory = factory;
        _this._dependencies = dependencies.map(resolve_1.Dependency.ensure);
        return _this;
    }
    Object.defineProperty(FactoryProvider.prototype, "factory", {
        get: function () {
            return this._factory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FactoryProvider.prototype, "dependencies", {
        get: function () {
            return this._dependencies;
        },
        enumerable: false,
        configurable: true
    });
    return FactoryProvider;
}(FactoryProviderBase));
exports.FactoryProvider = FactoryProvider;
var $factory = function (key, fn, dependencies) { return new FactoryProvider(key, fn, dependencies); };
exports.$factory = $factory;
//# sourceMappingURL=factory_provider.js.map