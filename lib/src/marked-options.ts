/* eslint-disable */
import { MarkedRenderer } from './marked-renderer';

export class MarkedOptions {
  /**
   * Enable GFM line breaks. This option requires the gfm option to be true.
   */
  breaks?: boolean;

  /**
   * Enable GitHub flavored markdown.
   */
  gfm?: boolean;

  /**
   * Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
   */
  pedantic?: boolean;

  /**
   * Type: object Default: new Renderer()
   *
   * An object containing functions to render tokens to HTML.
   */
  renderer?: MarkedRenderer;

  /**
   * Shows an HTML error message when rendering fails.
   */
  silent?: boolean;
}
