const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var screenshots = [
  {
    url: "http://localhost:3000/familychartitemsordering",
    imageName: "FamilyNodesOrdering.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseAdviserAndAssistantItemTypes.html",
    imageName: "CaseAdviserAndAssistantItemTypes.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSubAdviserAndSubAssistantItemTypes.html",
    imageName: "CaseSubAdviserAndSubAssistantItemTypes.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseButtonsPanel.html",
    imageName: "CaseButtonsPanel.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseChildrenPlacementType.html",
    imageName: "CaseChildrenPlacementType.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseConnectorAnnotation.html",
    imageName: "CaseConnectorAnnotation.png"
  },
  {
    url: "http://localhost/primitives/samples/bootstrap.styles/CaseCursorTemplateAndTwitterBootstrap.html",
    imageName: "CaseCursorTemplateAndTwitterBootstrap.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseCursorTemplate.html",
    imageName: "CaseCursorTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseButtonsInCursorTemplate.html",
    imageName: "CaseButtonsInCursorTemplate.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseCustomLayoutWithInvisibleItems.html",
    imageName: "CaseCustomLayoutWithInvisibleItems.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSkippedLevels.html",
    imageName: "CaseSkippedLevels.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyChartItemsOrdering.html",
    imageName: "CaseFamilyChartItemsOrdering.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseMultipleFamiliesOrdering.html",
    imageName: "CaseMultipleFamiliesOrdering.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyChartRelations.html",
    imageName: "CaseFamilyChartRelations.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyChartMatrixLayout.html",
    imageName: "CaseFamilyChartMatrixLayout.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyChartGrandParentsRelations.html",
    imageName: "CaseFamilyChartGrandParentsRelations.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyChartHiddenGrandParentsRelations.html",
    imageName: "CaseFamilyChartHiddenGrandParentsRelations.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFirstFamilyChart.html",
    imageName: "CaseFirstFamilyChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFirstOrganizationalChart.html",
    imageName: "CaseFirstOrganizationalChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseHighlightPathAnnotation.html",
    imageName: "CaseHighlightPathAnnotation.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CasePERTChart.html",
    imageName: "CasePERTChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseFamilyHideGrandParentsConnections.html",
    imageName: "CaseFamilyHideGrandParentsConnections.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseHighlightTemplate.html",
    imageName: "CaseHighlightTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseInactiveFamilyItems.html",
    imageName: "CaseInactiveFamilyItems.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseInactiveItems.html",
    imageName: "CaseInactiveItems.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseItemAndGroupTitleColors.html",
    imageName: "CaseItemAndGroupTitleColors.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseItemTemplateLabel.html",
    imageName: "CaseItemTemplateLabel.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseItemTemplate.html",
    imageName: "CaseItemTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseAddingLinkToItemTemplate.html",
    imageName: "CaseAddingLinkToItemTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSelectionCheckboxInItemTemplate.html",
    imageName: "CaseSelectionCheckboxInItemTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/jquery.widgets/CaseCustomControlTemplate.html",
    imageName: "CaseCustomControlTemplate.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseLabelsCascadesInFamilyChart.html",
    imageName: "CaseLabelsCascadesInFamilyChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseMultipleRootItemsInChart.html",
    imageName: "CaseMultipleRootItemsInChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseMatrixLayoutOfMultipleRootItemsInChart.html",
    imageName: "CaseMatrixLayoutOfMultipleRootItemsInChart.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseGeneralPartnerItemType.html",
    imageName: "CaseGeneralPartnerItemType.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseLimitedPartnerItemType.html",
    imageName: "CaseLimitedPartnerItemType.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseAdviserPartnerItemType.html",
    imageName: "CaseAdviserPartnerItemType.png"
  },

  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSelectedItems.html",
    imageName: "CaseSelectedItems.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSelectingHighlightItem.html",
    imageName: "CaseSelectingHighlightItem.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSelectingCursorItem.html",
    imageName: "CaseSelectingCursorItem.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSelectionPathMode.html",
    imageName: "CaseSelectionPathMode.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseShapeAnnotation.html",
    imageName: "CaseShapeAnnotation.png"
  },
  {
    url: "http://localhost/primitives/samples/javascript.controls/CaseSpousesInFamilyLayout.html",
    imageName: "CaseSpousesInFamilyLayout.png"
  }

];


async function task(url, imageName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 2980,
    height: 6880,
    deviceScaleFactor: 0.5
  });
  await page.goto(url, {
    waitUntil: 'load'
  });
  //  const placeholder = await page.$('#basicdiagram');
  // const rect = await page.evaluate((placeholder) => {
  //   const { y, x, bottom, right } = placeholder.getBoundingClientRect();
  //   return {
  //     x: x + 1,
  //     y: y + 1,
  //     height: bottom - y - 2,
  //     width: right - x - 2
  //   };
  // }, placeholder);

  const screenshot = await page.screenshot({
    fullPage: true
    // clip: {
    //   x: rect.x,
    //   y: rect.y,
    //   width: rect.width,
    //   height: rect.height
    // }
  });
  browser.close();
  fs.writeFileSync('./samples/images/screenshots/screenshot.png', screenshot);


  async function clip() {
    const { stdout, stderr } = await exec(`magick convert ./samples/images/screenshots/screenshot.png -flatten -fuzz 1% -trim +repage ./samples/images/screenshots/clipped.png`);
    if (stdout != "") {
      console.log('stdout:', stdout);
    }
    if (stderr != "") {
      console.log('stderr:', stderr);
    }
  }
  await clip();

  async function addborder() {
    const { stdout, stderr } = await exec(`magick convert ./samples/images/screenshots/clipped.png -bordercolor White -border 10 ./samples/images/screenshots/${imageName}`);
    if (stdout != "") {
      console.log('stdout:', stdout);
    }
    if (stderr != "") {
      console.log('stderr:', stderr);
    }
  }
  await addborder();
}


async function process() {
  for (var index = 0; index < screenshots.length && index < 1; index += 1) {
    screenshot = screenshots[index];
    await task(screenshot.url, screenshot.imageName);
  };
  fs.unlinkSync("./samples/images/screenshots/screenshot.png");
  fs.unlinkSync("./samples/images/screenshots/clipped.png");
}

process();
