import Interval from './Interval';

test('Interval - width', () => {
  var interval = new Interval(10, 40);

    expect(interval.width()).toBe(30);
});
