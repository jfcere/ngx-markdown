import { LanguagePipe } from './language.pipe';

describe('LanguagePipe', () => {
  let pipe: LanguagePipe;

  beforeEach(() => {
    pipe = new LanguagePipe();
  });

  it('should log error and return value when value is not a string', () => {
    const markdowns: any[] = [undefined, null, 0, {}, [], /regex/];

    spyOn(console, 'error');

    markdowns.forEach(markdown => {
      const result = pipe.transform(markdown, markdown);

      expect(result).toBe(markdown);
      expect(console.error).toHaveBeenCalledWith(`LanguagePipe has been invoked with an invalid value type [${markdown}]`);
    });
  });

  it('should log error and return value when parameter is not a string', () => {
    const markdown = '# Markdown';
    const languages: any[] = [undefined, null, 0, {}, [], /regex/];

    spyOn(console, 'error');

    languages.forEach(language => {
      const result = pipe.transform(markdown, language);

      expect(result).toBe(markdown);
      expect(console.error).toHaveBeenCalledWith(`LanguagePipe has been invoked with an invalid parameter [${language}]`);
    });
  });

  it('should append language to value', () => {
    const markdown = '# Markdown';
    const language = 'language';

    const result = pipe.transform(markdown, language);

    expect(result).toBe('```' + language + '\n' + markdown + '\n```');
  });
});
