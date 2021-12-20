import { Dependency, ResolveContext } from "../resolve";
import { Provider, ProviderKey } from "../provider";
export declare abstract class FactoryProviderBase extends Provider {
    constructor(key: ProviderKey);
    protected abstract get factory(): (...args: Array<any>) => any;
    protected abstract get dependencies(): Array<Dependency>;
    resolve(ctx: ResolveContext): any;
    protected buildArguments(ctx: ResolveContext): Array<any>;
}
export declare class FactoryProvider extends FactoryProviderBase {
    constructor(key: ProviderKey, factory: (...args: Array<any>) => any, dependencies?: Array<ProviderKey | Dependency>);
    private _factory;
    protected get factory(): (...args: Array<any>) => any;
    private _dependencies;
    protected get dependencies(): Array<Dependency>;
}
export declare const $factory: (key: ProviderKey, fn: (...args: Array<any>) => any, dependencies: Array<ProviderKey | Dependency>) => FactoryProvider;
