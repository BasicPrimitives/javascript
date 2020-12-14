import UserTemplate from './UserTemplate';
import ItemtemplateConfig from '../../configs/TemplateConfig';

test('UserTemplate', () => {
    expect(new UserTemplate(null, new ItemtemplateConfig()) != null).toBe(true);
});