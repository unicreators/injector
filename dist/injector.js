"use strict";
// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.
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
exports.Injector = void 0;
/// yichen <d.unicreators@gmail.com>
///
var util_1 = require("@unicreators/util");
var resolve_1 = require("./resolve");
var errors_1 = require("./errors");
var forward_ref_1 = require("./forward_ref");
var provider_1 = require("./provider");
var value_provider_1 = require("./providers/value_provider");
var Injector = /** @class */ (function () {
    function Injector(providers) {
        if (providers === void 0) { providers = []; }
        this.providers = new Map();
        this.instances = new Map();
        this.register.apply(this, __spreadArray([new value_provider_1.ValueProvider(Injector, this)], providers, false));
    }
    Injector.create = function (providers) {
        if (providers === void 0) { providers = []; }
        return new Injector(providers);
    };
    Injector.prototype.register = function () {
        var _this = this;
        var providers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            providers[_i] = arguments[_i];
        }
        providers.forEach(function (provider) {
            if (!(provider instanceof provider_1.Provider))
                return;
            var key = provider.key;
            if (_this.providers.has(key))
                throw new errors_1.ProviderAlreadyExistsError(key);
            _this.providers.set(key, provider);
        });
        return this;
    };
    Injector.prototype.get = function (key, opts) {
        return this._get(key, [], Object.assign({ notfoundThrowError: false }, ((0, util_1._isBoolean)(opts) ? { notfoundThrowError: opts } :
            (0, resolve_1.isResolveBehavior)(opts) ? { behavior: opts } : opts)));
    };
    Injector.prototype._get = function (key, paths, opts) {
        var _this = this;
        var _a;
        var _key = (0, forward_ref_1.resolveForwardRef)(key);
        if (paths.indexOf(key) > -1)
            throw new (errors_1.CircularReferenceError.bind.apply(errors_1.CircularReferenceError, __spreadArray(__spreadArray([void 0], paths, false), [_key], false)))();
        if (!this.providers.has(_key)) {
            if (((_a = opts === null || opts === void 0 ? void 0 : opts.notfoundThrowError) !== null && _a !== void 0 ? _a : true))
                throw new (errors_1.NoProviderError.bind.apply(errors_1.NoProviderError, __spreadArray(__spreadArray([void 0], paths, false), [_key], false)))();
            return undefined;
        }
        paths.push(_key);
        var provider = this.providers.get(_key), createNew = function (overrideCache) {
            var instance = _this.createInstance(provider, paths);
            if (!(0, util_1._isNullOrUndefined)(instance) && overrideCache)
                _this.instances.set(_key, instance);
            return instance;
        };
        switch (opts === null || opts === void 0 ? void 0 : opts.behavior) {
            case resolve_1.ResolveBehavior.CreateNew:
            case resolve_1.ResolveBehavior.CreateNewAndOverrideCache: {
                return createNew((opts === null || opts === void 0 ? void 0 : opts.behavior) === resolve_1.ResolveBehavior.CreateNewAndOverrideCache);
            }
            default: {
                return this.instances.has(_key) ? this.instances.get(_key) : createNew(true);
            }
        }
    };
    Injector.prototype.buildContext = function (paths) {
        var _this = this;
        return {
            get: function (key, opts) { return _this._get(key, paths, opts); }
        };
    };
    Injector.prototype.createInstance = function (provider, paths) {
        return provider.resolve(this.buildContext(paths));
    };
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map