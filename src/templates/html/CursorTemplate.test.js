import CursorTemplate from './CursorTemplate';
import ItemtemplateConfig from '../../configs/TemplateConfig';

test('CursorTemplate', () => {
    expect(new CursorTemplate(null, new ItemtemplateConfig()) != null).toBe(true);
});