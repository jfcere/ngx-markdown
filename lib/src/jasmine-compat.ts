/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unnecessary-type-assertion */
// This shim bridges two dynamically typed test APIs, so the `no-unsafe-*` rules
// cannot be satisfied without erasing the very flexibility it exists to provide.

/**
 * Jasmine compatibility shim for the Vitest runner.
 *
 * The specs are written against the Jasmine API (`spyOn().and.returnValue()`,
 * `jasmine.createSpyObj`, `expectAsync`, `jasmine.clock`, ...). Rather than
 * rewriting the ~130 call sites in tests that cover the sanitization pipeline,
 * this shim maps the Jasmine surface onto Vitest primitives.
 *
 * It is loaded through the `setupFiles` option of `@angular/build:unit-test`.
 */

import { afterEach, expect, vi } from 'vitest';

type AnyFn = (...args: any[]) => any;

/** Attach Jasmine's `.and` / `.calls` fluent API onto a Vitest mock. */
function decorate(mock: any): any {
  if (mock.and) {
    return mock;
  }

  mock.and = {
    // `mockReturnValue` throws when the spy is invoked with `new`, and an arrow
    // function is not constructible; a `function` expression serves both call
    // styles, since returning an object from a constructor overrides `this`.
    returnValue: (value: unknown) => (mock.mockImplementation(function () { return value; }), mock),
    returnValues: (...values: unknown[]) => {
      values.forEach(v => mock.mockReturnValueOnce(v));
      return mock;
    },
    resolveTo: (value?: unknown) => (mock.mockResolvedValue(value), mock),
    rejectWith: (value?: unknown) => (mock.mockRejectedValue(value), mock),
    callFake: (fn: AnyFn) => (mock.mockImplementation(fn), mock),
    // `spyOn` stubs by default (see below), so restoring the original is what
    // makes a spied method call through again.
    callThrough: () => (mock.mockImplementation(mock.__original ?? (() => undefined)), mock),
    stub: () => (mock.mockImplementation(() => undefined), mock),
  };

  // Jasmine exposes `withArgs` on the spy itself (not under `.and`); it returns
  // a per-argument strategy so only matching calls yield the stubbed value.
  mock.withArgs = (...expected: unknown[]) => {
    const routes: { args: unknown[]; value: unknown }[] = mock.__withArgsRoutes ?? [];
    if (!mock.__withArgsRoutes) {
      mock.__withArgsRoutes = routes;
      mock.mockImplementation((...actual: unknown[]) => {
        const hit = routes.find(r =>
          r.args.length === actual.length
          && r.args.every((a, i) => Object.is(a, actual[i])),
        );
        return hit?.value;
      });
    }
    const route = { args: expected, value: undefined as unknown };
    routes.push(route);
    return {
      and: {
        returnValue: (value: unknown) => ((route.value = value), mock),
        resolveTo: (value?: unknown) => ((route.value = Promise.resolve(value)), mock),
      },
    };
  };

  Object.defineProperty(mock, 'calls', {
    configurable: true,
    get: () => ({
      count: () => mock.mock.calls.length,
      any: () => mock.mock.calls.length > 0,
      argsFor: (i: number) => mock.mock.calls[i],
      allArgs: () => mock.mock.calls,
      all: () => mock.mock.calls.map((args: unknown[]) => ({ args })),
      mostRecent: () => {
        const args = mock.mock.calls[mock.mock.calls.length - 1];
        return args ? { args } : undefined;
      },
      first: () => {
        const args = mock.mock.calls[0];
        return args ? { args } : undefined;
      },
      reset: () => mock.mockClear(),
    }),
  });

  return mock;
}

const globalRef = globalThis as any;

/**
 * Members swapped by `spyOn`, restored after each test. Jasmine undoes every
 * spy installed during a spec automatically; Vitest does not unless asked, and
 * a leaked stub on a shared object (`marked.use`) breaks later specs.
 */
const restoreQueue: (() => void)[] = [];
afterEach(() => {
  while (restoreQueue.length) {
    restoreQueue.pop()!();
  }
});

// Jasmine-only strict boolean matchers, absent from Chai.
expect.extend({
  toBeTrue: (received: unknown) => ({
    pass: received === true,
    message: () => `expected ${String(received)} to be true`,
  }),
  toBeFalse: (received: unknown) => ({
    pass: received === false,
    message: () => `expected ${String(received)} to be false`,
  }),
});

globalRef.spyOn = (object: any, method: string) => {
  // Jasmine replaces the member whatever its type; `vi.spyOn` refuses a
  // non-function. Swap in a mock and restore it when the suite resets.
  if (typeof object?.[method] !== 'function') {
    const original = object[method];
    const mock = decorate(vi.fn());
    object[method] = mock;
    restoreQueue.push(() => (object[method] = original));
    return mock;
  }
  // Jasmine's `spyOn` stubs the method by default (the original only runs after
  // an explicit `.and.callThrough()`), whereas `vi.spyOn` keeps calling through.
  const original = object[method];
  const spy = decorate(vi.spyOn(object, method));
  spy.__original = original;
  // A plain arrow is not constructible, and some spied globals are invoked with
  // `new` (`ClipboardJS`); a `function` expression covers both call styles.
  spy.mockImplementation(function () { return undefined; });
  restoreQueue.push(() => spy.mockRestore());
  return spy;
};

globalRef.jasmine = {
  createSpy: (_name?: string, fn?: AnyFn) => decorate(fn ? vi.fn(fn) : vi.fn()),
  // Jasmine accepts `createSpyObj(baseName, methods, properties)` as well as
  // the name-less `createSpyObj(methods, properties)` overload.
  createSpyObj: (...args: unknown[]) => {
    const [methods, properties] = typeof args[0] === 'string' ? args.slice(1) : args;
    const names = Array.isArray(methods) ? methods : Object.keys(methods ?? {});
    const obj: Record<string, unknown> = {};
    names.forEach(name => (obj[name as string] = decorate(vi.fn())));
    if (properties) {
      Object.assign(obj, properties);
    }
    return obj;
  },
  any: (ctor: any) => expect.any(ctor),
  anything: () => expect.anything(),
  objectContaining: (obj: Record<string, unknown>) => expect.objectContaining(obj),
  arrayContaining: (arr: unknown[]) => expect.arrayContaining(arr),
  stringMatching: (str: string | RegExp) => expect.stringMatching(str),
  clock: () => ({
    install: () => vi.useFakeTimers(),
    uninstall: () => vi.useRealTimers(),
    tick: (ms: number) => vi.advanceTimersByTime(ms),
  }),
};

/** Jasmine's async matchers, expressed with Vitest's `rejects`/`resolves`. */
function asyncMatchers(actual: Promise<unknown>, negated: boolean): any {
  const resolves: any = negated ? expect(actual).resolves.not : expect(actual).resolves;
  const rejects: any = negated ? expect(actual).rejects.not : expect(actual).rejects;

  /** Resolves to true when `actual` settled the expected way. */
  const settled = (want: 'resolved' | 'rejected') =>
    actual.then(() => 'resolved' as const, () => 'rejected' as const)
      .then(outcome => expect(outcome === want).toBe(!negated));

  const matchers = {
    // Jasmine's `toBeResolved`/`toBeRejected` assert only how the promise
    // settled, whatever the value (including `undefined`).
    toBeResolved: () => settled('resolved'),
    toBeRejected: () => settled('rejected'),
    toBeResolvedTo: (value: unknown) => resolves.toEqual(value),
    toBeRejectedWith: (value: unknown) => rejects.toEqual(value),
    toBeRejectedWithError: (...args: unknown[]) => {
      const matcher = args.find(a => typeof a === 'string' || a instanceof RegExp);
      return matcher === undefined
        ? rejects.toThrowError()
        : rejects.toThrowError(matcher as string | RegExp);
    },
    already: { toBeResolved: () => settled('resolved') },
    withContext: () => asyncMatchers(actual, negated),
  };

  return negated ? matchers : { ...matchers, not: asyncMatchers(actual, true) };
}

globalRef.expectAsync = (actual: Promise<unknown>) => asyncMatchers(actual, false);
