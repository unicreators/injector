import { ResolveContext } from "../resolve";
import { Provider, ProviderKey } from "../provider";
export declare class ValueProvider extends Provider {
    private value;
    constructor(key: ProviderKey, value: any);
    resolve(ctx: ResolveContext): any;
}
export declare const $value: (key: ProviderKey, value: any) => ValueProvider;
