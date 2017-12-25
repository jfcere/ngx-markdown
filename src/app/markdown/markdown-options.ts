import * as marked from 'marked';

export class MarkdownOptions {
  callback?: (error: any | undefined, parseResult: string) => void;
  options?: marked.MarkedOptions;
}
