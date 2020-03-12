QUnit.module('Algorithms - FamilyAlignment calculate distances between nodes in family accounting for space for children and parents');

QUnit.test("primitives.common.FamilyAlignment - Horizontal alignment of family nodes.", function (assert) {

  function getFamily(items) {
    var family = primitives.common.family();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      family.add(item.parents, item.id, item);
    }
    return family;
  }

  function getTreeLevels(levels) {
    var treeLevels = primitives.common.TreeLevels();
    for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
      var level = levels[levelIndex];
      for (var index = 0, len = level.length; index < len; index += 1) {
        treeLevels.addItem(levelIndex, level[index], {});
      }
    }
    return treeLevels;
  };

  function getPlacements(treeLevels, familyAlignment, isBig) {
    var placements = {};

    treeLevels.loopLevels(this, function (levelIndex, level) {
      treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
        var nodeOffset = familyAlignment.getOffset(nodeid);
        if (isBig == null || isBig.hasOwnProperty(nodeid)) {
          placements[nodeid] = new primitives.common.Rect(nodeOffset - 25, levelIndex * 50, 50, 40);
        } else {
          placements[nodeid] = new primitives.common.Rect(nodeOffset - 1, levelIndex * 50, 2, 40);
        }
      })
    });

    return placements;
  }

  function countPlacementsOverlaps(treeLevels, placements) {
    var result = 0;

    treeLevels.loopLevels(this, function (levelIndex, level) {
      treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
        if (position > 0) {
          var prevNodeId = treeLevels.getItemAtPosition(levelIndex, position - 1);
          var prevPlacement = placements[prevNodeId];
          var nodePlacement = placements[nodeid];

          if (prevPlacement.overlaps(nodePlacement)) {
            result += 1;
          }
        }
      })
    });

    return result;
  }

  function GetPlacementMarker(placement, label, color) {
    var div = jQuery("<div></div>");

    div.append(label);
    div.css(placement.getCSS());
    div.css({
      "background": color,
      visibility: "visible",
      position: "absolute",
      font: "Areal",
      "font-size": "12px",
      "border-style": "solid",
      "border-color": "black",
      "border-width": "2px"
    });

    return div;
  }

  function ShowLayout(fixture, placements, title) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var offsetX = null;
    var offsetY = null;
    var space = new primitives.common.Rect();
    for (var key in placements) {
      if (placements.hasOwnProperty(key)) {
        var placement = placements[key];

        offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
        offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

        space.addRect(placement);
      }
    }

    var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    placeholder.css({
      width: space.width,
      height: space.height
    });
    for (var key in placements) {
      if (placements.hasOwnProperty(key)) {
        var placement = new primitives.common.Rect(placements[key]);
        placement.translate(-offsetX, -offsetY);

        var div = GetPlacementMarker(placement, key, "grey");
        placeholder.append(div);
      }
    }


    fixture.append(placeholder);
  }

  function TestLayout(title, familyItems, treeLevelsItems, sized) {
    var family = getFamily(familyItems);
    var treeLevels = getTreeLevels(treeLevelsItems);

    var isBig = null;
    if (sized != null) {
      isBig = {};
      for (var index = 0; index < sized.length; index += 1) {
        isBig[sized[index]] = true;
      }
    }

    var familyAlignment = new primitives.common.FamilyAlignment(this, family, treeLevels, function (nodeid, node) {
      if (isBig == null || isBig.hasOwnProperty(nodeid)) {
        return 6 + 50 + 6;
      } else {
        return 6 + 2 + 6;
      }
    });

    var placements = getPlacements(treeLevels, familyAlignment, isBig);

    ShowLayout(jQuery("#qunit-fixture"), placements, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    var result = countPlacementsOverlaps(treeLevels, placements);

    assert.equal(result, 0, title);
  };

  (function () {
    TestLayout("Empty family layout", [
      {}
    ], [
      []
    ]);
  })();


  (function () {
    TestLayout("Single node family layout", [
      { id: 'A', parents: [] }
    ], [
      ['A']
    ]);
  })();

  (function () {
    TestLayout("Side by side 2 families where the left one starts one generation below", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: ['1'] }
    ], [
      ['1'],
      ['2', '3']
    ]);
  })();

  (function () {
    TestLayout("Side by side families", [
      { id: '1', parents: [] },
      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '2', parents: [] },
      { id: '5', parents: ['2'] },
      { id: '6', parents: ['2'] }
    ], [
      ['1', '2'],
      ['3', '4', '5', '6']
    ]);
  })();

  (function () {
    TestLayout("Internal orphan family", [
      { id: '1', parents: [] },

      { id: '2', parents: ['1'] },
      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '5', parents: ['2', '3'] },
      { id: '6', parents: [] },
      { id: '7', parents: ['4'] },
      { id: '8', parents: ['4'] },
      { id: '9', parents: ['6'] },
      { id: '10', parents: ['6'] },
      { id: '11', parents: ['5', '7', '8'] }
    ], [
      ['1'],
      ['2', '3', '6', '4'],
      ['5', '9', '10', '7', '8'],
      ['11']
    ]);
  })();

  (function () {
    TestLayout("Side by side and upside-down families", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: [] },
      { id: '4', parents: ['1'] },
      { id: '5', parents: ['1'] },
      { id: '6', parents: ['2', '3'] }
    ], [
      ['1', '2', '3'],
      ['4', '5', '6']
    ]);
  })();

  (function () {
    TestLayout("Family diagram horizontal alignment with multiple cycles", [
      { id: 'A', parents: [] },
      { id: 'K', parents: [] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['A'] },
      { id: 'D', parents: ['A'] },
      { id: 'E', parents: [] },
      { id: 'F', parents: ['K'] },
      { id: 'L', parents: ['K'] },
      { id: 'M', parents: ['K'] },
      { id: 'G', parents: ['B'] },
      { id: 'H', parents: ['D', 'E', 'F'] },
      { id: 'I', parents: ['M'] },
      { id: 'J', parents: ['M'] },
      { id: 'N', parents: ['G'] },
      { id: 'O', parents: ['G'] },
      { id: 'Q', parents: ['H'] },
      { id: 'R', parents: ['H'] },
      { id: 'S', parents: ['H'] },
      { id: 'T', parents: ['I', 'J'] },
      { id: 'P', parents: ['O', 'Q'] },
      { id: 'U', parents: ['S', 'T'] }
    ], [
      ['A', 'K'],
      ['B', 'C', 'D', 'E', 'F', 'L', 'M'],
      ['G', 'H', 'I', 'J'],
      ['N', 'O', 'Q', 'R', 'S', 'T'],
      ['P', 'U']
    ]);
  })();

  (function () {
    TestLayout("Family diagram large rombus alignment", [
      { id: 'A2', parents: [] },
      { id: 'A', parents: ['A2'] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['A'] },
      { id: 'D', parents: ['A'] },
      { id: 'E', parents: ['B', 'C', 'D'] },
      { id: 'A1', parents: ['A2'] },
      { id: 'B1', parents: ['A1'] },
      { id: 'C1', parents: ['A1'] },
      { id: 'D1', parents: ['A1'] },
      { id: 'E1', parents: ['B1', 'C1', 'D1'] },
      { id: 'E2', parents: ['E', 'E1'] },
    ], [
      ['A2'],
      ['A', 'A1'],
      ['B', 'C', 'D', 'B1', 'C1', 'D1'],
      ['E', 'E1'],
      ['E2']
    ]);
  })();

  (function () {
    TestLayout("Small Sand clock family layout", [
      { id: 'A', parents: [] },
      { id: 'B', parents: [] },
      { id: 'C', parents: ['A', 'B'] },
      { id: 'D', parents: ['C'] },
      { id: 'E', parents: ['C'] }
    ], [
      ['A', 'B'],
      ['C'],
      ['D', 'E']
    ]);
  })();

  (function () {
    TestLayout("Small Rombus family layout", [
      { id: 'A', parents: [] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['A'] },
      { id: 'D', parents: ['B', 'C'] }
    ], [
      ['A'],
      ['B', 'C'],
      ['D']
    ]);
  })();

  (function () {
    TestLayout("Regular tree family layout", [
      { id: 'A', parents: [] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['A'] },
      { id: 'D', parents: ['B'] },
      { id: 'E', parents: ['B'] },
      { id: 'F', parents: ['C'] },
      { id: 'G', parents: ['C'] }
    ], [
      ['A'],
      ['B', 'C'],
      ['D', 'E', 'F', 'G']
    ]);
  })();

  (function () {
    TestLayout("Upside-down tree family layout", [
      { id: 'A', parents: [] },
      { id: 'B', parents: [] },
      { id: 'C', parents: [] },
      { id: 'D', parents: [] },
      { id: 'E', parents: ['A', 'B'] },
      { id: 'F', parents: ['C', 'D'] },
      { id: 'G', parents: ['E', 'F'] }
    ], [
      ['A', 'B', 'C', 'D'],
      ['E', 'F'],
      ['G']
    ]);
  })();

  (function () {
    TestLayout("2 Cross Relations Demo family layout", [
      { id: '2', parents: [] },
      { id: '1', parents: [] },
      { id: '8', parents: ['2'] },
      { id: '6', parents: ['2'] },
      { id: '7', parents: ['2'] },
      { id: '5', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '3', parents: ['1'] },
      { id: '12', parents: ['8'] },
      { id: '11', parents: ['7', '5'] },
      { id: '10', parents: ['4'] },
      { id: '9', parents: ['3'] }
    ], [
      ['2', '1'],
      ['8', '6', '7', '5', '4', '3'],
      ['12', '11', '10', '9']
    ]);
  })();

  (function () {
    TestLayout("Family unit overlaps node between parents", [
      { id: '6', parents: [] },
      { id: '5', parents: ['6'] },
      { id: '2', parents: ['6'] },
      { id: '1', parents: [] },
      { id: '7', parents: ['1', '2'] },
      { id: '3', parents: ['7'] },
      { id: '4', parents: ['7'] }
    ], [
      ['6'],
      ['1', '5', '2'],
      ['7'],
      ['3', '4']
    ]);
  })();

  (function () {
    TestLayout("Family unit overlaps node between children", [
      { id: '3', parents: [] },
      { id: '4', parents: [] },
      { id: '7', parents: ['3', '4'] },
      { id: '1', parents: ['7'] },
      { id: '5', parents: [] },
      { id: '2', parents: ['7'] },
      { id: '6', parents: ['5', '2'] }
    ], [
      ['3', '4'],
      ['7'],
      ['1', '5', '2'],
      ['6']
    ]);
  })();

  (function () {
    TestLayout("Cycle 2", [
      { id: '1', parents: [] },
      { id: '2', parents: ['1'] },
      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '5', parents: ['1'] },
      { id: '6', parents: ['1'] },
      { id: '7', parents: ['1'] },
      { id: '8', parents: ['1'] },
      { id: '9', parents: ['1'] },
      { id: '10', parents: ['1'] },

      { id: '11', parents: ['9'] },
      { id: '12', parents: ['9'] },
      { id: '13', parents: ['9'] },
      { id: '14', parents: ['9'] },
      { id: '15', parents: ['9'] },
      { id: '16', parents: ['9'] },
      { id: '17', parents: ['10'] },

      { id: '18', parents: ['11'] },
      { id: '19', parents: [] },
      { id: '20', parents: [] },
      { id: '21', parents: [] },
      { id: '22', parents: [] },
      { id: '23', parents: [] },
      { id: '24', parents: [] },
      { id: '25', parents: ['17'] },

      { id: '26', parents: ['18', '19', '20', '21', '22', '23', '24', '25'] }
    ], [
      ['1'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ['11', '12', '13', '14', '15', '16', '17'],
      ['18', '19', '20', '21', '22', '23', '24', '25'],
      ['26']
    ]);
  })();

  (function () {
    TestLayout("Large sandclock", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: [] },
      { id: '4', parents: [] },
      { id: '5', parents: ['1', '2'] },
      { id: '6', parents: ['3', '4'] },
      { id: '7', parents: ['5', '6'] },
      { id: '8', parents: ['7'] },
      { id: '9', parents: ['7'] },
      { id: '10', parents: ['8'] },
      { id: '11', parents: ['8'] },
      { id: '12', parents: ['9'] },
      { id: '13', parents: ['9'] }
    ], [
      ['1', '2', '3', '4'],
      ['5', '6'],
      ['7'],
      ['8', '9'],
      ['10', '11', '12', '13']
    ]);
  })();

  (function () {
    TestLayout("Fance layout", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },

      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '5', parents: ['2'] },
      { id: '6', parents: ['2'] },

      { id: '7', parents: ['3'] },
      { id: '8', parents: ['4', '5'] },
      { id: '9', parents: ['6'] },

      { id: '10', parents: ['7'] },
      { id: '11', parents: ['8'] },
      { id: '12', parents: ['8'] },
      { id: '13', parents: ['9'] },

      { id: '14', parents: ['10', '11'] },
      { id: '15', parents: ['12', '13'] }
    ], [
      ['1', '2'],
      ['3', '4', '5', '6'],
      ['7', '8', '9'],
      ['10', '11', '12', '13'],
      ['14', '15']
    ]);
  })();

  (function () {
    TestLayout("Wave layout", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: [] },
      { id: '4', parents: [] },

      { id: '5', parents: ['1'] },
      { id: '6', parents: ['1'] },
      { id: '7', parents: ['2'] },
      { id: '8', parents: ['2'] },
      { id: '9', parents: ['3'] },
      { id: '10', parents: ['3'] },
      { id: '11', parents: ['4'] },

      { id: '12', parents: ['5'] },
      { id: '13', parents: ['6', '7'] },
      { id: '14', parents: ['8', '9'] },
      { id: '15', parents: ['10', '11'] }
    ], [
      ['1', '2', '3', '4'],
      ['5', '6', '7', '8', '9', '10', '11'],
      ['12', '13', '14', '15']
    ]);
  })();

  (function () {
    TestLayout("Skewed rombus layout", [
      { id: '1', parents: ['1'] },
      { id: '2', parents: ['1'] },
      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },
      { id: '5', parents: ['1'] },
      { id: '6', parents: ['1'] },

      { id: '7', parents: ['2'] },
      { id: '8', parents: ['2'] },
      { id: '9', parents: ['2'] },
      { id: '10', parents: ['6'] },
      { id: '11', parents: ['6'] },

      { id: '12', parents: ['7'] },
      { id: '13', parents: [] },
      { id: '14', parents: [] },
      { id: '15', parents: [] },
      { id: '16', parents: ['11'] },

      { id: '17', parents: ['12', '13'] },
      { id: '18', parents: ['14', '15', '16'] },

      { id: '19', parents: ['17', '18'] }
    ], [
      ['1'],
      ['2', '3', '4', '5', '6'],
      ['7', '8', '9', '10', '11'],
      ['12', '13', '14', '15', '16'],
      ['17', '18'],
      ['19']
    ]);
  })();

  (function () {
    TestLayout("3 Cross Relations Test Layout", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: [] },
      { id: '4', parents: [] },
      { id: '5', parents: [] },

      { id: '6', parents: ['1', '2'] },
      { id: '7', parents: ['3'] },
      { id: '8', parents: ['4'] },
      { id: '9', parents: ['4'] },
      { id: '10', parents: ['5'] },


      { id: '11', parents: ['6'] },
      { id: '12', parents: ['7', '8'] },
      { id: '13', parents: ['9', '10'] },

      { id: '14', parents: ['11'] },
      { id: '15', parents: ['11'] },
      { id: '16', parents: ['12'] },
      { id: '17', parents: ['12'] },
      { id: '18', parents: ['12'] },
      { id: '19', parents: ['13'] },
      { id: '20', parents: ['13'] },

      { id: '21', parents: ['14'] },
      { id: '22', parents: ['15', '16'] },
      { id: '23', parents: ['20'] },

      { id: '24', parents: ['21'] },
      { id: '25', parents: ['21'] },
      { id: '26', parents: ['22'] },
      { id: '27', parents: ['22'] },
      { id: '28', parents: ['23'] },
      { id: '29', parents: ['23'] }
    ], [
      ['1', '2', '3', '4', '5'],
      ['6', '7', '8', '9', '10'],
      ['11', '12', '13'],
      ['14', '15', '16', '17', '18', '19', '20'],
      ['21', '22', '23'],
      ['24', '25', '26', '27', '28', '29']
    ]);
  })();

  (function () {
    TestLayout("Skipped Members Test Layout", [
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: [] },
      { id: '4', parents: [] },
      { id: '5', parents: [] },
      { id: '6', parents: [] },

      { id: '7', parents: ['1', '2'] },
      { id: '8', parents: ['3', '4'] },
      { id: '9', parents: ['5', '6'] },

      { id: '10', parents: ['7'] },
      { id: '11', parents: ['7'] },
      { id: '12', parents: ['8'] },
      { id: '13', parents: ['8'] },
      { id: '14', parents: ['9'] },
      { id: '15', parents: ['9'] },

      { id: '16', parents: ['10'] },
      { id: '17', parents: ['11'] },
      { id: '18', parents: ['11'] },
      { id: '19', parents: ['12'] },
      { id: '20', parents: ['13'] },
      { id: '21', parents: ['13'] },
      { id: '22', parents: ['14'] },
      { id: '23', parents: ['14'] },
      { id: '241', parents: ['15'] },

      { id: '24', parents: ['17'] },
      { id: '25', parents: ['18'] },
      { id: '26', parents: ['19', '20'] },
      { id: '27', parents: ['21'] },
      { id: '28', parents: ['22'] },
      { id: '29', parents: ['23', '241'] },

      { id: '30', parents: ['24'] },
      { id: '31', parents: ['25'] },
      { id: '32', parents: ['26'] },
      { id: '33', parents: ['26'] },
      { id: '34', parents: ['27'] },
      { id: '35', parents: ['28'] },
      { id: '36', parents: ['29'] },

      { id: '37', parents: ['30'] },
      { id: '38', parents: ['31', '32'] },
      { id: '39', parents: ['34'] },
      { id: '40', parents: ['35'] },
      { id: '41', parents: ['36'] },

    ], [
      ['1', '2', '3', '4', '5', '6'],
      ['7', '8', '9'],
      ['10', '11', '12', '13', '14', '15'],
      ['16', '17', '18', '19', '20', '21', '22', '23', '241'],
      ['24', '25', '26', '27', '28', '29'],
      ['30', '31', '32', '33', '34', '35', '36'],
      ['37', '38', '39', '40', '41']
    ], [
      '1', '2', '3', '4', '5', '6', '11', '13', '14', '37', '38', '39', '40', '41'
    ]);
  })();

  (function () {
    TestLayout("Left spiral layout", [
      { id: '1', parents: [] },

      { id: '2', parents: ['1'] },
      { id: '3', parents: [] },
      { id: '4', parents: ['1'] },

      { id: '5', parents: ['2'] },
      { id: '6', parents: ['3'] },
      { id: '7', parents: [] },
      { id: '8', parents: ['3'] },

      { id: '9', parents: ['5'] },
      { id: '10', parents: ['6'] },
      { id: '11', parents: ['7'] },
      { id: '12', parents: ['7'] },
      { id: '13', parents: ['8'] },

      { id: '14', parents: ['9'] },
      { id: '15', parents: ['10', '12'] },
      { id: '16', parents: ['13'] },

      { id: '17', parents: ['14', '16'] }
    ], [
      ['1'],
      ['2', '3', '4'],
      ['5', '6', '7', '8'],
      ['9', '10', '11', '12', '13'],
      ['14', '15', '16'],
      ['17']
    ]);
  })();

  (function () {
    TestLayout("Right spiral layout", [
      { id: '1', parents: [] },

      { id: '2', parents: ['1'] },
      { id: '3', parents: [] },
      { id: '4', parents: ['1'] },

      { id: '5', parents: ['3'] },
      { id: '6', parents: [] },
      { id: '7', parents: ['3'] },
      { id: '8', parents: ['4'] },

      { id: '9', parents: ['5'] },
      { id: '10', parents: ['6'] },
      { id: '11', parents: ['6'] },
      { id: '12', parents: ['7'] },
      { id: '13', parents: ['8'] },

      { id: '14', parents: ['9'] },
      { id: '15', parents: ['10', '12'] },
      { id: '16', parents: ['13'] },

      { id: '17', parents: ['14', '16'] }
    ], [
      ['1'],
      ['2', '3', '4'],
      ['5', '6', '7', '8'],
      ['9', '10', '11', '12', '13'],
      ['14', '15', '16'],
      ['17']
    ]);
  })();

  (function () {
    TestLayout("Alignment of items having variable width", [
      { id: '1', parents: [] },

      { id: '2', parents: ['1'] },
      { id: '3', parents: ['1'] },
      { id: '4', parents: ['1'] },

      { id: '6', parents: ['2'] },
      { id: '7', parents: ['3', '4'] }
    ], [
      ['1'],
      ['2', '3', '4'],
      ['6', '7']
    ], [
      '1', '4', '6', '7'
    ]);
  })();
});