/**
 * Global test setup for the Vitest runner.
 *
 * Loaded through the `setupFiles` option of `@angular/build:unit-test`.
 *
 * Vitest keeps a spy installed until it is restored explicitly, so a stub left
 * on a shared object (`console.error`, `marked.use`) would leak into whichever
 * spec runs next. Restoring after every test keeps specs independent of each
 * other's ordering. The builder exposes no `restoreMocks` option, so it is set
 * here rather than in a Vitest config file.
 */

import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.restoreAllMocks();
});
