import { ProviderKey } from "./provider";
export declare enum ResolveBehavior {
    FromCacheOrCreateNew = 1,
    CreateNew = 2,
    CreateNewAndOverrideCache = 3
}
export declare const isResolveBehavior: (value: any) => value is ResolveBehavior;
export interface ResolveContext {
    get: (key: ProviderKey, opts?: {
        behavior?: ResolveBehavior;
        notfoundThrowError?: boolean;
    }) => any;
}
export declare class Dependency {
    providerKey: any;
    static ensure(dep: any): Dependency;
    static create(providerKey: any, opts?: {
        optional?: boolean;
        useNew?: boolean;
    }): Dependency;
    private contextOpts;
    constructor(providerKey: any, opts?: {
        optional?: boolean;
        useNew?: boolean;
    });
    resolve(ctx: ResolveContext): any;
}
export declare const depend: typeof Dependency.create;
