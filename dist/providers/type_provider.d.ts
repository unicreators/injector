import { ProviderKey } from "../provider";
import { Dependency } from "../resolve";
import { Type } from "../type";
import { FactoryProvider } from "./factory_provider";
export declare class TypeProvider extends FactoryProvider {
    constructor(key: ProviderKey, type: Type<any>, dependencies?: Array<ProviderKey | Dependency>);
}
export declare const $type: (type: Type<any>, dependencies?: Array<ProviderKey | Dependency>, key?: ProviderKey) => TypeProvider;
