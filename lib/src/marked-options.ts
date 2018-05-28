import { Renderer } from 'marked';

export class MarkedOptions implements marked.MarkedOptions {
  /**
   * Type: object Default: new Renderer()
   *
   * An object containing functions to render tokens to HTML.
   */
  renderer?: Renderer;

  /**
   * Enable GitHub flavored markdown.
   */
  gfm?: boolean;

  /**
   * Enable GFM tables. This option requires the gfm option to be true.
   */
  tables?: boolean;

  /**
   * Enable GFM line breaks. This option requires the gfm option to be true.
   */
  breaks?: boolean;

  /**
   * Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
   */
  pedantic?: boolean;

  /**
   * Sanitize the output. Ignore any HTML that has been input.
   */
  sanitize?: boolean;

  /**
   * Mangle autolinks (<email@domain.com>).
   */
  mangle?: boolean;

  /**
   * Use smarter list behavior than the original markdown. May eventually be default with the old behavior moved into pedantic.
   */
  smartLists?: boolean;

  /**
   * Shows an HTML error message when rendering fails.
   */
  silent?: boolean;

  /**
   * Set the prefix for code block classes.
   */
  langPrefix?: string;

  /**
   * Use "smart" typograhic punctuation for things like quotes and dashes.
   */
  smartypants?: boolean;

  /**
   * Set the prefix for header tag ids.
   */
  headerPrefix?: string;

  /**
   * Generate closing slash for self-closing tags (<br/> instead of <br>)
   */
  xhtml?: boolean;

  /**
   * A function to highlight code blocks. The function takes three arguments: code, lang, and callback.
   */
  highlight?(code: string, lang: string, callback?: (error: any | undefined, code: string) => void): string;

  /**
   * Optionally sanitize found HTML with a sanitizer function.
   */
  sanitizer?(html: string): string;
}
