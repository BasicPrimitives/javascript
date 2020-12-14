import DotHighlightTemplate from './DotHighlightTemplate';
import ItemtemplateConfig from '../../configs/TemplateConfig';

test('DotHighlightTemplate', () => {
    expect(new DotHighlightTemplate(null, new ItemtemplateConfig()) != null).toBe(true);
});