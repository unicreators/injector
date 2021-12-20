import 'mocha';
import { expect } from 'chai';

import {
    Injector, ValueProvider, injectable, inject, optional, injector, FactoryProvider,
    ProviderAlreadyExistsError, $value, $factory, TypeProvider, $type, depend, NoProviderError,
    CircularReferenceError, ResolveBehavior, forwardRef, DependencyKeyNullError
} from '../src';

describe('index.test.ts', function () {

    it('injector', async () => {

        let defaultInjector = injector;
        expect(defaultInjector).instanceOf(Injector);

        let self = injector.get(Injector);
        expect(self).instanceOf(Injector);
        expect(self).equals(injector);

        let injector1 = new Injector();
        self = injector1.get(Injector);
        expect(self).instanceOf(Injector);
        expect(self).equals(injector1);

    });

    it('register', async () => {

        let injector1 = new Injector();
        injector1.register(new ValueProvider('value1', 10));

        let result = injector1.get('value1');
        expect(result).equals(10);

        expect(() => injector1.register(new ValueProvider('value1', 20))).throw(ProviderAlreadyExistsError);

        injector1.register(
            new ValueProvider('value2', 20),
            new FactoryProvider('value3', (v1, v2) => v1 + v2, ['value1', 'value2'])
        );

        result = injector1.get('value3');
        expect(result).equals(30);

    });


    it('get', async () => {

        let injector1 = new Injector();

        let result = injector1.get('value1');
        expect(result).is.undefined;
        expect(() => injector1.get('value1', true)).throw(NoProviderError);

        injector1.register($value('value1', 10));
        result = injector1.get('value1');
        expect(result).equals(10);

        let value1 = injector1.get<number>('value1');
        expect(value1).equals(10);

        class A { constructor(b: B) { } }
        class B { constructor(a: A) { } }
        injector1.register(
            $type(A, [B]),
            $type(B, [A])
        );
        expect(() => injector1.get(A)).throw(CircularReferenceError);

        class C { }
        injector1.register(
            $type(C)
        );
        let c1 = injector1.get(C);
        expect(c1).instanceOf(C);

        let c2 = injector1.get(C);
        expect(c2).instanceOf(C);
        expect(c2).equals(c1);

        let c3 = injector1.get(C, ResolveBehavior.CreateNew);
        expect(c3).instanceOf(C);
        expect(c3).not.equals(c1);

        let c4 = injector1.get(C);
        expect(c4).instanceOf(C);
        expect(c4).equals(c1);

        let c5 = injector1.get(C, ResolveBehavior.CreateNewAndOverrideCache);
        expect(c5).instanceOf(C);
        expect(c5).not.equals(c1);

        let c6 = injector1.get(C);
        expect(c6).instanceOf(C);
        expect(c6).equals(c5);

        class D { }
        let d1 = injector1.get(D, { behavior: ResolveBehavior.CreateNew });
        expect(d1).is.undefined;
        expect(() => injector1.get(D, { notfoundThrowError: true })).throw(NoProviderError);

    });


    it('providers', async () => {

        let injector1 = new Injector();

        // value provider
        injector1.register(
            new ValueProvider('value1', 10),
            $value('value2', 20)
        );

        let result = injector1.get('value1');
        expect(result).equals(10);
        result = injector1.get('value2');
        expect(result).equals(20);


        // factory provider
        injector1.register(
            new FactoryProvider('value3', (v1, v2) => v1 + v2, ['value1', 'value2']),
            $factory('value4', (v1, v2) => v1 + v2 + 10, ['value1', 'value2'])
        );
        result = injector1.get('value3');
        expect(result).equals(30);
        result = injector1.get('value4');
        expect(result).equals(40);

        // type provider
        abstract class A {
            abstract getResult(): number;
        }
        class A1 extends A {
            constructor(public v1: number, public v2: number) {
                super();
            }
            getResult(): number { return this.v1 + this.v2; }
        }
        class A2 extends A {
            constructor(public v1: number, public v2: number) {
                super();
            }
            getResult(): number { return this.v1 * this.v2; }
        }
        class B {
            constructor(public a: A) { }
            getResult(): number { return this.a.getResult(); }
        }
        injector1.register(
            new TypeProvider(A, A1 /* A2 */, ['value1', 'value2']),
            $type(B, [A])
        );
        result = injector1.get(A);
        expect(result).instanceOf(A);
        expect(result).instanceOf(A1);
        expect(result.getResult()).equals(30);
        let result1 = injector1.get(B);
        expect(result1).instanceOf(B);
        expect(result1.a).instanceOf(A)
        expect(result1.getResult()).equals(30);

    });


    it('dependency', async () => {

        class A {
            constructor(public v1: number, public v2: number) { }
            getResult(): number { return (this.v1 || 0) + (this.v2 || 0); }
        }

        let injector1 = new Injector();
        injector1.register(
            $value('value1', 10),
            $type(A, ['value1', depend('value2', { optional: true })])
        );
        let result = injector1.get(A);
        expect(result.getResult()).equals(10);

        injector1.register(
            $value('value2', 20)
        );
        result = injector1.get(A, ResolveBehavior.CreateNew);
        expect(result.getResult()).equals(30);


        class B { constructor(public a: A) { } }
        let injector2 = new Injector().register(
            $value('value1', 10),
            $type(A, ['value1', depend('value2', { optional: true })]),
            $type(B, [depend(A, { useNew: true })])
        );
        let a = injector2.get<A>(A);
        let b = injector2.get<B>(B);
        expect(b.a).not.equals(a);


        class C { }
        class D { constructor(public c: C) { } }
        injector2.register(
            $type(D, [C])
        );
        expect(() => injector2.get<D>(D)).throw(NoProviderError);


        class E { constructor(public c: C) { } }
        injector2.register(
            $type(E, [depend(C, { optional: true })])
        );
        let e = injector2.get<E>(E);
        expect(e).instanceOf(E);
        expect(e.c).is.undefined;

    });

    it('decorators (@injectable)', async () => {

        @injectable()
        class B { }

        @injectable()
        class A { constructor(public b: B) { } }

        let a = injector.get<A>(A);
        expect(a).instanceOf(A);
        expect(a.b).instanceOf(B);



        let injector1 = new Injector();
        @injectable(injector1)
        class C { }

        @injectable(injector1)
        class D { constructor(public c: C) { } }

        let d = injector1.get<D>(D);
        expect(d).instanceOf(D);
        expect(d.c).instanceOf(C);

    });

    it('decorators (@optional)', async () => {

        @injectable()
        class A { constructor(public v1: number) { } }
        expect(() => injector.get<A>(A)).throw(NoProviderError);

        @injectable()
        class B { constructor(@optional() public v1: number) { } }

        let b = injector.get<B>(B);
        expect(b).instanceOf(B);
        expect(b.v1).is.undefined;

    });

    it('decorators (@inject)', async () => {

        abstract class A { abstract getResult(): number; }

        @injectable()
        class A1 extends A {
            getResult(): number { return 10; }
        }

        @injectable()
        class A2 extends A {
            getResult(): number { return 20; }
        }

        @injectable()
        class B {
            constructor(@inject(A1) /* @inject(A2) */ public a: A) { }
            getResult(): number { return this.a.getResult(); }
        }

        let a1 = injector.get<A1>(A1);
        let b = injector.get<B>(B);
        expect(b).instanceOf(B);
        expect(b.a).equals(a1);

    });


    it('decorators (forwardRef)', async () => {

        expect(() => {

            @injectable()
            class A {
                // 预期注入 `B`，但此时 `B` 还未定义
                constructor(public b: B) { }
            }

            @injectable()
            class B { }

        }).throw(DependencyKeyNullError);


        @injectable()
        class A {
            // 使用 forwardRef 延迟 `B` 注入的时机
            constructor(@inject(forwardRef(() => B)) public b: B) { }
        }

        @injectable()
        class B { }

        let a = injector.get<A>(A);
        let b = injector.get<B>(B);
        expect(a).instanceOf(A);
        expect(a.b).equals(b);

    });

});

