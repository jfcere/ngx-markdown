/**
 * Jasmine compatibility shim for the Vitest runner.
 *
 * The specs are written against the Jasmine API (`spyOn().and.returnValue()`,
 * `jasmine.createSpyObj`, `expectAsync`, `jasmine.clock`, ...). Rather than
 * rewriting ~260 call sites in tests that cover the sanitization pipeline,
 * this shim maps the Jasmine surface onto Vitest primitives.
 *
 * It is loaded through the `setupFiles` option of `@angular/build:unit-test`.
 */

import { expect, vi } from 'vitest';

type AnyFn = (...args: any[]) => any;

/** Attach Jasmine's `.and` / `.calls` fluent API onto a Vitest mock. */
function decorate(mock: any): any {
  if (mock.and) {
    return mock;
  }

  mock.and = {
    returnValue: (value: unknown) => (mock.mockReturnValue(value), mock),
    returnValues: (...values: unknown[]) => {
      values.forEach(v => mock.mockReturnValueOnce(v));
      return mock;
    },
    resolveTo: (value?: unknown) => (mock.mockResolvedValue(value), mock),
    rejectWith: (value?: unknown) => (mock.mockRejectedValue(value), mock),
    callFake: (fn: AnyFn) => (mock.mockImplementation(fn), mock),
    callThrough: () => (mock.mockRestore?.(), mock),
    stub: () => (mock.mockImplementation(() => undefined), mock),
    throwError: (error: unknown) => {
      mock.mockImplementation(() => {
        throw typeof error === 'string' ? new Error(error) : error;
      });
      return mock;
    },
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

globalRef.spyOn = (object: any, method: string) => decorate(vi.spyOn(object, method));

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
globalRef.expectAsync = (actual: Promise<unknown>) => ({
  toBeResolved: () => expect(actual).resolves.toBeDefined(),
  toBeResolvedTo: (value: unknown) => expect(actual).resolves.toEqual(value),
  toBeRejected: () => expect(actual).rejects.toBeDefined(),
  toBeRejectedWith: (value: unknown) => expect(actual).rejects.toEqual(value),
  toBeRejectedWithError: (...args: unknown[]) => {
    const matcher = args.find(a => typeof a === 'string' || a instanceof RegExp);
    return matcher === undefined
      ? expect(actual).rejects.toThrowError()
      : expect(actual).rejects.toThrowError(matcher as string | RegExp);
  },
  already: { toBeResolved: () => expect(actual).resolves.toBeDefined() },
  withContext: () => globalRef.expectAsync(actual),
});
