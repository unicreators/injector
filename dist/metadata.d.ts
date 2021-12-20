import 'reflect-metadata';
declare abstract class Descriptor {
    private _attributes;
    private get attributes();
    addAttribute(attr: any, value: any): this;
    getAttribute(attr: any): any[];
    firstValue(attr: any, def?: any): any;
    hasAttribute(attr: any): boolean;
}
export declare const Constructor: unique symbol;
export declare class ClassDescriptor extends Descriptor {
    cls: Function;
    constructor(cls: Function);
    private _methods;
    get methods(): Map<string | symbol, MethodDescriptor>;
    private _ctor;
    get ctor(): MethodDescriptor;
}
export declare class MethodDescriptor extends Descriptor {
    method?: string | symbol;
    constructor(method?: string | symbol);
    private _parameters;
    get parameters(): Map<number, ParameterDescriptor>;
}
export declare class ParameterDescriptor extends Descriptor {
    index: number;
    constructor(index: number);
}
export declare class TypeDescriptor {
    addAttribute(attr: any, value: any, cls: Function, method?: string | symbol, parameterIndex?: number): void;
    getAttribute(attr: any, cls: Function, method?: string | symbol, parameterIndex?: number): Array<any>;
    hasAttribute(attr: any, cls: Function, method?: string | symbol, parameterIndex?: number): boolean;
    getConstructorParameters(target: any): {
        type: Function;
        descriptor: Descriptor;
    }[];
    getMethodParameters(target: any, method?: string): Array<{
        type: Function;
        descriptor: Descriptor;
    }>;
    protected ensureDescriptor(cls: Function, method?: string | symbol, parameterIndex?: number): any;
    protected getDescriptor(cls: Function, method?: string | symbol, parameterIndex?: number): any;
}
export {};
