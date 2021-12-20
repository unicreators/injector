import { ResolveContext } from "./resolve";
export declare type ProviderKey = any;
export declare abstract class Provider {
    key: ProviderKey;
    constructor(key: ProviderKey);
    abstract resolve(ctx: ResolveContext): any;
}
