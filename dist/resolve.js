"use strict";
// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
exports.depend = exports.Dependency = exports.isResolveBehavior = exports.ResolveBehavior = void 0;
/// yichen <d.unicreators@gmail.com>
///
var util_1 = require("@unicreators/util");
var errors_1 = require("./errors");
var ResolveBehavior;
(function (ResolveBehavior) {
    ResolveBehavior[ResolveBehavior["FromCacheOrCreateNew"] = 1] = "FromCacheOrCreateNew";
    ResolveBehavior[ResolveBehavior["CreateNew"] = 2] = "CreateNew";
    ResolveBehavior[ResolveBehavior["CreateNewAndOverrideCache"] = 3] = "CreateNewAndOverrideCache";
})(ResolveBehavior = exports.ResolveBehavior || (exports.ResolveBehavior = {}));
;
var ResolveBehaviorValues = [ResolveBehavior.FromCacheOrCreateNew, ResolveBehavior.CreateNew, ResolveBehavior.CreateNewAndOverrideCache];
var isResolveBehavior = function (value) { return ResolveBehaviorValues.includes(value); };
exports.isResolveBehavior = isResolveBehavior;
;
var Dependency = /** @class */ (function () {
    function Dependency(providerKey, opts) {
        this.providerKey = providerKey;
        if ((0, util_1._isNullOrUndefined)(providerKey))
            throw new errors_1.DependencyKeyNullError();
        this.contextOpts = {
            behavior: (opts === null || opts === void 0 ? void 0 : opts.useNew) ? ResolveBehavior.CreateNew : undefined,
            notfoundThrowError: !(opts === null || opts === void 0 ? void 0 : opts.optional)
        };
    }
    Dependency.ensure = function (dep) {
        if (dep instanceof Dependency)
            return dep;
        return new Dependency(dep);
    };
    Dependency.create = function (providerKey, opts) {
        return new Dependency(providerKey, opts);
    };
    Dependency.prototype.resolve = function (ctx) {
        return ctx.get(this.providerKey, this.contextOpts);
    };
    return Dependency;
}());
exports.Dependency = Dependency;
;
exports.depend = Dependency.create;
//# sourceMappingURL=resolve.js.map