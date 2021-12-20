import { ResolveBehavior } from "./resolve";
import { Provider, ProviderKey } from "./provider";
export declare class Injector {
    static create(providers?: Array<Provider>): Injector;
    private providers;
    private instances;
    constructor(providers?: Array<Provider>);
    register(...providers: Array<Provider>): this;
    get<T = any>(key: ProviderKey, opts?: {
        behavior?: ResolveBehavior;
        notfoundThrowError?: boolean;
    } | boolean | ResolveBehavior): T;
    protected _get(key: ProviderKey, paths: Array<ProviderKey>, opts?: {
        behavior?: ResolveBehavior;
        notfoundThrowError?: boolean;
    }): any;
    protected buildContext(paths: Array<ProviderKey>): {
        get: (key: ProviderKey, opts?: {
            behavior?: ResolveBehavior;
            notfoundThrowError?: boolean;
        }) => any;
    };
    protected createInstance(provider: Provider, paths: Array<any>): any;
}
