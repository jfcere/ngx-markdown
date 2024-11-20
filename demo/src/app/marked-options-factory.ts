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
