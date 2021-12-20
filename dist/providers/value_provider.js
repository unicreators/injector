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
exports.$value = exports.ValueProvider = void 0;
var provider_1 = require("../provider");
var ValueProvider = /** @class */ (function (_super) {
    __extends(ValueProvider, _super);
    function ValueProvider(key, value) {
        var _this = _super.call(this, key) || this;
        _this.value = value;
        return _this;
    }
    ValueProvider.prototype.resolve = function (ctx) { return this.value; };
    return ValueProvider;
}(provider_1.Provider));
exports.ValueProvider = ValueProvider;
var $value = function (key, value) { return new ValueProvider(key, value); };
exports.$value = $value;
//# sourceMappingURL=value_provider.js.map