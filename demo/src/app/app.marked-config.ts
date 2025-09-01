import DOMPurify from 'dompurify';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { AnchorService } from '@shared/anchor';

export function markedOptionsFactory(anchorService: AnchorService): MarkedOptions {
  const renderer = new MarkedRenderer();

  // fix `href` for absolute link with fragments so that _copy-paste_ urls are correct
  renderer.link = ({ href, text })  => {
    return `<a href="${anchorService.normalizeExternalUrl(href)}">${text}</a>`;
  };

  return { renderer };
}

export function sanitizeHtml(html: string): string {
  // configure DOMPurify to allow...
  // - `class` as it is safe by default
  // - `href` as its content is validated by DOMPurify
  // - `style` as its content is validated by DOMPurify
  // - `id` to be validated by the hook
  DOMPurify.setConfig({
    ALLOWED_ATTR: ['class', 'href', 'style'],
    ADD_ATTR: ['id'],
  });

  // hook to validate and restrict `id` usage on header elements only
  // and ensure they do not containt javascript or other unsafe characters
  // to prevent potential XSS attacks through `id` attributes
  DOMPurify.addHook('uponSanitizeElement', (node: Node) => {
    const isNodeElement = node instanceof Element;
    if (!isNodeElement) {
      return;
    }

    const isHeader = /^(h[1-6])$/i.test(node.tagName);
    if (isHeader) {
      const idValue = node.getAttribute('id') ?? '';
      const isValidId = /^[a-zA-Z][\w\-:.]*$/.test(idValue);
      if (!isValidId) {
        node.removeAttribute('id');
      }
    } else {
      node.removeAttribute('id');
    }
  });

  return DOMPurify.sanitize(html);
}
