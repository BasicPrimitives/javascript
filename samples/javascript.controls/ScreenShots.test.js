import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

let browser;
beforeAll(async () => {
  browser = await puppeteer.launch({
    defaultViewport: {width: 1920, height: 1080}
  });
  expect.extend({ toMatchImageSnapshot });
});

afterAll(async () => {
  await browser.close();
});

async function testByTemplate({imageName, url}) {
  const page = await browser.newPage();
  await page.goto(url)

  var space = await page.evaluate( function(){
    var element = document.getElementById("basicdiagram");
    var rect = element.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.right - rect.left, height: rect.bottom - rect.top };
  } );

  const image = await page.screenshot({
    clip: {
      x: space.x,
      y: space.y,
      width: space.width,
      height: space.height,
    }
  });
  await page.close();
  expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: imageName,
      noColors: false
  });
}
describe("Screen Shots", () => {

  it('CasePlaceAdvisersAboveChildren', async () => {
    await testByTemplate({ 
      imageName: "CasePlaceAdvisersAboveChildren", 
      url: "http://localhost:8080/samples/javascript.controls/CasePlaceAdvisersAboveChildren.html"
    })
  });

  it('CasePlaceAssistantsAboveChildren', async () => {
    await testByTemplate({ 
      imageName: "CasePlaceAssistantsAboveChildren", 
      url: "http://localhost:8080/samples/javascript.controls/CasePlaceAssistantsAboveChildren.html"
    })
  });

  it('CaseShowFrame', async () => {
    await testByTemplate({ 
      imageName: "CaseShowFrame", 
      url: "http://localhost:8080/samples/javascript.controls/CaseShowFrame.html"
    })
  });

  it('CaseLoopsInFamilyChart', async () => {
    await testByTemplate({ 
      imageName: "CaseLoopsInFamilyChart", 
      url: "http://localhost:8080/samples/javascript.controls/CaseLoopsInFamilyChart.html"
    })
  });

  it('CaseFamilyChartItemsOrdering', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartItemsOrdering.html",
      imageName: "CaseFamilyChartItemsOrdering"
    })
  });

  it('CaseFamilyChartPrimaryParent', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartPrimaryParent.html",
      imageName: "CaseFamilyChartPrimaryParent"
    })
  });

  it('CaseAdviserAndAssistantItemTypes', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseAdviserAndAssistantItemTypes.html",
      imageName: "CaseAdviserAndAssistantItemTypes"
    })
  });

  it('CaseSubAdviserAndSubAssistantItemTypes', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSubAdviserAndSubAssistantItemTypes.html",
      imageName: "CaseSubAdviserAndSubAssistantItemTypes"
    })
  });

  it('CaseButtonsPanel', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseButtonsPanel.html",
      imageName: "CaseButtonsPanel"
    })
  });

  it('CaseChildrenPlacementType', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseChildrenPlacementType.html",
      imageName: "CaseChildrenPlacementType"
    })
  });

  it('CaseConnectorAnnotation', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseConnectorAnnotation.html",
      imageName: "CaseConnectorAnnotation"
    })
  });

  it('CaseLevelAnnotation', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseLevelAnnotation.html",
      imageName: "CaseLevelAnnotation"
    })
  });

  it('CaseCursorTemplate', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseCursorTemplate.html",
      imageName: "CaseCursorTemplate"
    })
  });

  it('CaseCustomLayoutWithInvisibleItems', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseCustomLayoutWithInvisibleItems.html",
      imageName: "CaseCustomLayoutWithInvisibleItems"
    })
  });

  it('CaseSkippedLevels', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSkippedLevels.html",
      imageName: "CaseSkippedLevels"
    })
  });

  it('CaseFamilyChartItemsOrdering', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartItemsOrdering.html",
      imageName: "CaseFamilyChartItemsOrdering"
    })
  });

  it('CaseMultipleFamiliesOrdering', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseMultipleFamiliesOrdering.html",
      imageName: "CaseMultipleFamiliesOrdering"
    })
  });

  it('CaseFamilyChartRelations', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartRelations.html",
      imageName: "CaseFamilyChartRelations"
    })
  });

  it('CaseFamilyChartMatrixLayout', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartMatrixLayout.html",
      imageName: "CaseFamilyChartMatrixLayout"
    })
  });

  it('CaseFamilyChartGrandParentsRelations', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartGrandParentsRelations.html",
      imageName: "CaseFamilyChartGrandParentsRelations"
    })
  });

  it('CaseFamilyChartHiddenGrandParentsRelations', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyChartHiddenGrandParentsRelations.html",
      imageName: "CaseFamilyChartHiddenGrandParentsRelations"
    })
  });

  it('CaseFirstFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFirstFamilyChart.html",
      imageName: "CaseFirstFamilyChart"
    })
  });

  it('CaseFirstOrganizationalChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFirstOrganizationalChart.html",
      imageName: "CaseFirstOrganizationalChart"
    })
  });

  it('CaseHighlightPathAnnotation', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseHighlightPathAnnotation.html",
      imageName: "CaseHighlightPathAnnotation"
    })
  });

  it('CasePERTChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CasePERTChart.html",
      imageName: "CasePERTChart"
    })
  });

  it('CaseFamilyHideGrandParentsConnections', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseFamilyHideGrandParentsConnections.html",
      imageName: "CaseFamilyHideGrandParentsConnections"
    })
  });

  it('CaseHighlightTemplate', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseHighlightTemplate.html",
      imageName: "CaseHighlightTemplate"
    })
  });

  it('CaseInactiveFamilyItems', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseInactiveFamilyItems.html",
      imageName: "CaseInactiveFamilyItems"
    })
  });

  it('CaseInactiveItems', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseInactiveItems.html",
      imageName: "CaseInactiveItems"
    })
  });

  it('CaseItemTemplateLabel', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseItemTemplateLabel.html",
      imageName: "CaseItemTemplateLabel"
    })
  });


  it('CaseItemAndGroupTitleColors', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseItemAndGroupTitleColors.html",
      imageName: "CaseItemAndGroupTitleColors"
    })
  });

  it('CaseItemTemplate', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseItemTemplate.html",
      imageName: "CaseItemTemplate"
    })
  });

  it('CaseAddingLinkToItemTemplate', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseAddingLinkToItemTemplate.html",
      imageName: "CaseAddingLinkToItemTemplate"
    })
  });

  it('CaseSelectionCheckboxInItemTemplate', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSelectionCheckboxInItemTemplate.html",
      imageName: "CaseSelectionCheckboxInItemTemplate"
    })
  });

  it('CaseLabelsCascadesInFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseLabelsCascadesInFamilyChart.html",
      imageName: "CaseLabelsCascadesInFamilyChart"
    })
  });

  it('CaseLabelsNMatrixInFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseLabelsNMatrixInFamilyChart.html",
      imageName: "CaseLabelsNMatrixInFamilyChart"
    })
  });

  it('CaseLabelsCascadesInFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseMultipleRootItemsInChart.html",
      imageName: "CaseMultipleRootItemsInChart"
    })
  });

  it('CaseMatrixLayoutOfMultipleRootItemsInChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseMatrixLayoutOfMultipleRootItemsInChart.html",
      imageName: "CaseMatrixLayoutOfMultipleRootItemsInChart"
    })
  });

  it('CaseGeneralPartnerItemType', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseGeneralPartnerItemType.html",
      imageName: "CaseGeneralPartnerItemType"
    })
  });

  it('CaseLimitedPartnerItemType', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseLimitedPartnerItemType.html",
      imageName: "CaseLimitedPartnerItemType"
    })
  });

  it('CaseAdviserPartnerItemType', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseAdviserPartnerItemType.html",
      imageName: "CaseAdviserPartnerItemType"
    })
  });

  it('CaseSelectedItems', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSelectedItems.html",
      imageName: "CaseSelectedItems"
    })
  });

  it('CaseSelectingHighlightItem', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSelectingHighlightItem.html",
      imageName: "CaseSelectingHighlightItem"
    })
  });

  it('CaseSelectingCursorItem', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSelectingCursorItem.html",
      imageName: "CaseSelectingCursorItem"
    })
  });

  it('CaseSelectionPathMode', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseSelectionPathMode.html",
      imageName: "CaseSelectionPathMode"
    })
  });

  it('CaseShapeAnnotation', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseShapeAnnotation.html",
      imageName: "CaseShapeAnnotation"
    })
  });

  it('CaseMatrixLayoutInFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseMatrixLayoutInFamilyChart.html",
      imageName: "CaseMatrixLayoutInFamilyChart"
    })
  });

  it('CaseMatrixGroupsInFamilyChart', async () => {
    await testByTemplate({
      url: "http://localhost:8080/samples/javascript.controls/CaseMatrixGroupsInFamilyChart.html",
      imageName: "CaseMatrixGroupsInFamilyChart"
    })
  });

});