import { Provider } from '@angular/core';
import { getSanitizeProvider, MarkdownModuleConfig } from './markdown.module';
import { MarkdownService } from './markdown.service';

export function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig): Provider[] {
  return [
    MarkdownService,
    markdownModuleConfig?.loader ?? [],
    markdownModuleConfig?.clipboardOptions ?? [],
    markdownModuleConfig?.markedOptions ?? [],
    markdownModuleConfig?.mermaidOptions ?? [],
    markdownModuleConfig?.markedExtensions ?? [],
    getSanitizeProvider(markdownModuleConfig?.sanitize) ?? [],
  ];
}
