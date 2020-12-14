import HighlightTemplate from './HighlightTemplate';
import ItemtemplateConfig from '../../configs/TemplateConfig';

test('HighlightTemplate', () => {
    expect(new HighlightTemplate(null, new ItemtemplateConfig()) != null).toBe(true);
});