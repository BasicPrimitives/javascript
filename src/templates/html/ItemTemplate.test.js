import ItemTemplate from './ItemTemplate';
import ItemtemplateConfig from '../../configs/TemplateConfig';

test('ItemTemplate', () => {
    expect(new ItemTemplate(null, new ItemtemplateConfig()) != null).toBe(true);
});