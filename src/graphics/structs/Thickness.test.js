import Size from './Size';
import Thickness from './Thickness';

test('Thickness - Init thickness with single numeric argument', () => {
  var thickness = new Thickness(5);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 5, 
    top: 5,
    right: 5,
    bottom: 5
  });
});

test('Thickness - Init thickness with 4 numeric arguments', () => {
  var thickness = new Thickness(1, 2, 3, 4);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 1, 
    top: 2,
    right: 3,
    bottom: 4
  });
});

test('Thickness - Init thickness with another thickness structure', () => {
  var thickness = new Thickness({left: 1, top: 2, right: 3, bottom: 4 });
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 1, 
    top: 2,
    right: 3,
    bottom: 4
  });
});

test('Thickness - Maximum thickness', () => {
  var thickness = new Thickness(5, 2, 7, 4);
  var thickness2 = new Thickness(1, 6, 3, 8);
  thickness.maxThickness(thickness2);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 5, 
    top: 6,
    right: 7,
    bottom: 8
  });
});

test('Thickness - Scale thickness', () => {
  var thickness = new Thickness(1, 2, 3, 5);
  thickness.scale(3);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 3, 
    top: 6,
    right: 9,
    bottom: 15
  });
});

test('Thickness - Add numeric value to thickness', () => {
  var thickness = new Thickness(1, 2, 3, 4);
  thickness.addThickness(1);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 2, 
    top: 3,
    right: 4,
    bottom: 5
  });
});

test('Thickness - Add 4 numeric values to thickness', () => {
  var thickness = new Thickness(1, 2, 3, 4);
  thickness.addThickness(10, 20, 30, 40);
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 11, 
    top: 22,
    right: 33,
    bottom: 44
  });
});

test('Thickness - Add thickness structure', () => {
  var thickness = new Thickness(1, 2, 3, 4);
  thickness.addThickness({left: 10, top: 20, right: 30, bottom: 40});
  var values = {left: thickness.left, 
    top: thickness.top,
    right: thickness.right,
    bottom: thickness.bottom
  };

  expect(values).toEqual({left: 11, 
    top: 22,
    right: 33,
    bottom: 44
  });
});