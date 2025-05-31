import { Provider, SecurityContext } from '@angular/core';
import { MarkdownModuleConfig } from './markdown.module';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';

export function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig): Provider[] {
  return [
    MarkdownService,
    markdownModuleConfig?.loader ?? [],
    markdownModuleConfig?.clipboardOptions ?? [],
    markdownModuleConfig?.markedOptions ?? [],
    markdownModuleConfig?.mermaidOptions ?? [],
    markdownModuleConfig?.markedExtensions ?? [],
    {
      provide: SECURITY_CONTEXT,
      useValue: markdownModuleConfig?.sanitize ?? SecurityContext.HTML,
    },
  ];
}
