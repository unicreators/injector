export declare abstract class InteranlError extends Error {
    constructor(message?: string);
}
export declare class CircularReferenceError extends InteranlError {
    constructor(...keys: Array<any>);
}
export declare class NoProviderError extends InteranlError {
    constructor(...keys: Array<any>);
}
export declare class ProviderAlreadyExistsError extends InteranlError {
    key: any;
    constructor(key: any);
}
export declare class ArgumentNullError extends InteranlError {
    argumentName: string;
    constructor(argumentName: string);
}
export declare class DependencyKeyNullError extends InteranlError {
    constructor();
}
