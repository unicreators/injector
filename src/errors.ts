// Copyright (c) 2021 yichen <d.unicreators@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

/// yichen <d.unicreators@gmail.com>
///

import { _isNullOrUndefined, _isString } from "@unicreators/util";

const stringify = (key: any): string => {
    if (_isNullOrUndefined(key)) return '';
    if (_isString(key)) return key;
    if (Array.isArray(key)) return `[${key.map(stringify).join(', ')}]`;
    if (key.name) return `${key.name}`;
    const _str = key.toString();
    if (_isNullOrUndefined(_str)) return '';
    const index = _str.indexOf('\n');
    return index === -1 ? _str : _str.substring(0, index);
}

export abstract class InteranlError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, InteranlError.prototype);
    }
}

export class CircularReferenceError extends InteranlError {
    constructor(...keys: Array<any>) {
        super(`Circular reference ${keys.map(key => `[${stringify(key)}]`).join(' => ')}.`);
        Object.setPrototypeOf(this, CircularReferenceError.prototype);
    }
}

export class NoProviderError extends InteranlError {
    constructor(...keys: Array<any>) {
        super(`No provider for ${keys.map(key => `[${stringify(key)}]`).join(' => ')}.`);
        Object.setPrototypeOf(this, NoProviderError.prototype);
    }
}

export class ProviderAlreadyExistsError extends InteranlError {
    constructor(public key: any) {
        super(`Provider [${stringify(key)}] already exists.`);
        Object.setPrototypeOf(this, ProviderAlreadyExistsError.prototype);
    }
}

export class ArgumentNullError extends InteranlError {
    constructor(public argumentName: string) {
        super(`Argument "${argumentName}" is null.`);
        Object.setPrototypeOf(this, ArgumentNullError.prototype);
    }
}

export class DependencyKeyNullError extends InteranlError {
    constructor() {
        super(`Dependent provider key is null.`);
        Object.setPrototypeOf(this, DependencyKeyNullError.prototype);
    }
}



