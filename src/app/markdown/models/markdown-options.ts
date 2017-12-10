import * as MarkdownIt from 'markdown-it';

export class MarkdownOptions {
  preset?: 'commonmark' | 'zero' | 'default';
  options?: MarkdownIt.Options;
}
