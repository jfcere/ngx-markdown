declare module 'gumshoejs' {
  namespace Gumshoe {}
  class Gumshoe {
    constructor(selector: string, options: any);
    destroy(): void;
    setup(): void;
  }
  export = Gumshoe;
}
