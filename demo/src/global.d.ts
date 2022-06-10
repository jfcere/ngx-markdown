declare module 'gumshoejs' {
  namespace Gumshoe {}

  class Gumshoe {
    constructor(selector: string, options: GumshoeOptions);
    destroy(): void;
    setup(): void;
  }

  class GumshoeOptions {
    offset?: number;
    reflow?: boolean;
  }

  export = Gumshoe;
}
