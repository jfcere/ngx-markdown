// workaround to fix rollup namespace import
// https://github.com/rollup/rollup/issues/670#issuecomment-284621537
import * as _marked from 'marked';
const marked = _marked;

export class MarkdownOptions {
  callback?: (error: any | undefined, parseResult: string) => void;
  options?: marked.MarkedOptions;
}
