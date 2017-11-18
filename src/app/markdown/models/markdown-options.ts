import markdownit from 'markdown-it';

export class MarkdownOptions {
  preset?: 'commonmark' | 'zero' | 'default';
  options?: markdownit.Options;
}
