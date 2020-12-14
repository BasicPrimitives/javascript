export default function CombinedTemplateParamsTask(itemTemplateParamsTask, labelAnnotationTemplateParamsTask) {
  function process() {
    return true;
  }

  function getTemplateParams(itemId) {
    return itemTemplateParamsTask.getTemplateParams(itemId) || labelAnnotationTemplateParamsTask.getTemplateParams(itemId);
  }

  return {
    process: process,
    getTemplateParams: getTemplateParams
  };
};