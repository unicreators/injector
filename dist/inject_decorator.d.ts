import { Injector } from './injector';
import { AttributeDecorator } from './decorator';
import { Type } from './type';
import { ProviderKey } from './provider';
import { Dependency } from './resolve';
export declare class InjectorDecorator extends AttributeDecorator {
    injector: Injector;
    constructor(injector: Injector);
    injectable(opts?: {
        injector: Injector;
    }): ClassDecorator;
    inject(key: ProviderKey): ParameterDecorator;
    optional(): ParameterDecorator;
    useNew(): ParameterDecorator;
    protected registerType(target: Type<any>, injector?: Injector): void;
    protected getDependencies(target: any): Array<Dependency>;
}
