import { TypeDescriptor } from "./metadata";
export declare class AttributeDecorator extends TypeDescriptor {
    protected $class(attr: any, value: any, opts?: {
        before?: (target: Function) => boolean;
        after?: (target: Function) => void;
    }): ClassDecorator;
    protected $method(attr: any, value: any, opts?: {
        before?: (target: Function, method: string | symbol, descriptor: TypedPropertyDescriptor<any>) => boolean;
        after?: (target: Function, method: string | symbol, descriptor: TypedPropertyDescriptor<any>) => void;
    }): MethodDecorator;
    protected $parameter(attr: any, value: any, opts?: {
        before?: (target: Function, method: string | symbol, index: number) => boolean;
        after?: (target: Function, method: string | symbol, index: number) => void;
    }): ParameterDecorator;
}
