QUnit.module('Graphics - Structs - Thickness');

QUnit.test("primitives.common.Thickness - 2D padding structure defined by left, top, right and bottom values", function (assert) {

  var thickness = new primitives.common.Thickness(5);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 5, 
    top: 5,
    right: 5,
    bottom: 5
  }, "Init thickness with single numeric argument");

  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 1, 
    top: 2,
    right: 3,
    bottom: 4
  }, "Init thickness with 4 numeric arguments");

  thickness = new primitives.common.Thickness({left: 1, top: 2, right: 3, bottom: 4 });
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 1, 
    top: 2,
    right: 3,
    bottom: 4
  }, "Init thickness with another thickness structure");  

  thickness = new primitives.common.Thickness(5, 2, 7, 4);
  thickness2 = new primitives.common.Thickness(1, 6, 3, 8);
  thickness.maxThickness(thickness2);
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 5, 
    top: 6,
    right: 7,
    bottom: 8
  }, "Maximum thickness");  

  thickness = new primitives.common.Thickness(1, 2, 3, 5);
  thickness.scale(3);
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 3, 
    top: 6,
    right: 9,
    bottom: 15
  }, "Scale thickness");  

  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  thickness.addThickness(1);
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 2, 
    top: 3,
    right: 4,
    bottom: 5
  }, "Add numeric value to thickness");

  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  thickness.addThickness(10, 20, 30, 40);
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 11, 
    top: 22,
    right: 33,
    bottom: 44
  }, "Add 4 numeric values to thickness");  

  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  thickness.addThickness({left: 10, top: 20, right: 30, bottom: 40});
  values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };
  assert.deepEqual(values, {left: 11, 
    top: 22,
    right: 33,
    bottom: 44
  }, "Add thickness structure"); 
});
