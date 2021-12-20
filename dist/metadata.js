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
exports.TypeDescriptor = exports.ParameterDescriptor = exports.MethodDescriptor = exports.ClassDescriptor = exports.Constructor = void 0;
/// yichen <d.unicreators@gmail.com>
///
require("reflect-metadata");
var util_1 = require("@unicreators/util");
var Descriptor = /** @class */ (function () {
    function Descriptor() {
    }
    Object.defineProperty(Descriptor.prototype, "attributes", {
        get: function () {
            if ((0, util_1._isNullOrUndefined)(this._attributes))
                this._attributes = new Map();
            return this._attributes;
        },
        enumerable: false,
        configurable: true
    });
    Descriptor.prototype.addAttribute = function (attr, value) {
        var values = this.attributes.get(attr);
        if ((0, util_1._isNullOrUndefined)(values)) {
            values = [];
            this.attributes.set(attr, values);
        }
        values.push(value);
        return this;
    };
    Descriptor.prototype.getAttribute = function (attr) { var _a; return (_a = this.attributes.get(attr)) !== null && _a !== void 0 ? _a : []; };
    Descriptor.prototype.firstValue = function (attr, def) { var _a; return (_a = this.getAttribute(attr)[0]) !== null && _a !== void 0 ? _a : def; };
    Descriptor.prototype.hasAttribute = function (attr) { return this.attributes.has(attr); };
    return Descriptor;
}());
exports.Constructor = Symbol('__constructor__');
var ClassDescriptor = /** @class */ (function (_super) {
    __extends(ClassDescriptor, _super);
    function ClassDescriptor(cls) {
        var _this = _super.call(this) || this;
        _this.cls = cls;
        return _this;
    }
    Object.defineProperty(ClassDescriptor.prototype, "methods", {
        get: function () {
            if ((0, util_1._isNullOrUndefined)(this._methods))
                this._methods = new Map();
            return this._methods;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClassDescriptor.prototype, "ctor", {
        get: function () {
            if ((0, util_1._isNullOrUndefined)(this._ctor))
                this._ctor = new MethodDescriptor(exports.Constructor);
            return this._ctor;
        },
        enumerable: false,
        configurable: true
    });
    return ClassDescriptor;
}(Descriptor));
exports.ClassDescriptor = ClassDescriptor;
var MethodDescriptor = /** @class */ (function (_super) {
    __extends(MethodDescriptor, _super);
    function MethodDescriptor(method) {
        var _this = _super.call(this) || this;
        _this.method = method;
        return _this;
    }
    Object.defineProperty(MethodDescriptor.prototype, "parameters", {
        get: function () {
            if ((0, util_1._isNullOrUndefined)(this._parameters))
                this._parameters = new Map();
            return this._parameters;
        },
        enumerable: false,
        configurable: true
    });
    return MethodDescriptor;
}(Descriptor));
exports.MethodDescriptor = MethodDescriptor;
var ParameterDescriptor = /** @class */ (function (_super) {
    __extends(ParameterDescriptor, _super);
    function ParameterDescriptor(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        return _this;
    }
    return ParameterDescriptor;
}(Descriptor));
exports.ParameterDescriptor = ParameterDescriptor;
var TypeDescriptor = /** @class */ (function () {
    function TypeDescriptor() {
    }
    TypeDescriptor.prototype.addAttribute = function (attr, value, cls, method, parameterIndex) {
        this.ensureDescriptor(cls, method, parameterIndex).addAttribute(attr, value);
    };
    TypeDescriptor.prototype.getAttribute = function (attr, cls, method, parameterIndex) {
        return this.getDescriptor(cls, method, parameterIndex).getAttribute(attr);
    };
    TypeDescriptor.prototype.hasAttribute = function (attr, cls, method, parameterIndex) {
        var _a;
        return !!((_a = this.getDescriptor(cls, method, parameterIndex)) === null || _a === void 0 ? void 0 : _a.hasAttribute(attr));
    };
    TypeDescriptor.prototype.getConstructorParameters = function (target) {
        return this.getMethodParameters(target);
    };
    TypeDescriptor.prototype.getMethodParameters = function (target, method) {
        var _this = this;
        return (Reflect.getMetadata('design:paramtypes', target, method) || [])
            .map(function (type, index) { return ({
            type: type,
            descriptor: _this.getDescriptor(target, method !== null && method !== void 0 ? method : exports.Constructor, index)
        }); });
    };
    TypeDescriptor.prototype.ensureDescriptor = function (cls, method, parameterIndex) {
        var c = Reflect.getMetadata(this, cls);
        if ((0, util_1._isNullOrUndefined)(c)) {
            c = new ClassDescriptor(cls);
            Reflect.defineMetadata(this, c, cls);
        }
        if ((0, util_1._isNullOrUndefined)(method))
            return c;
        var m = (method === exports.Constructor) ? c.ctor : c.methods.get(method);
        if ((0, util_1._isNullOrUndefined)(m)) {
            m = new MethodDescriptor(method);
            c.methods.set(method, m);
        }
        if ((0, util_1._isNullOrUndefined)(parameterIndex))
            return m;
        var p = m.parameters.get(parameterIndex);
        if ((0, util_1._isNullOrUndefined)(p)) {
            p = new ParameterDescriptor(parameterIndex);
            m.parameters.set(parameterIndex, p);
        }
        return p;
    };
    TypeDescriptor.prototype.getDescriptor = function (cls, method, parameterIndex) {
        var c = Reflect.getMetadata(this, cls);
        if ((0, util_1._isNullOrUndefined)(c) || (0, util_1._isNullOrUndefined)(method))
            return c;
        var m = (method === exports.Constructor) ? c.ctor : c.methods.get(method);
        if ((0, util_1._isNullOrUndefined)(m) || (0, util_1._isNullOrUndefined)(parameterIndex))
            return m;
        return m.parameters.get(parameterIndex);
    };
    return TypeDescriptor;
}());
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=metadata.js.map