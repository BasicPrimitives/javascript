import Point from '../graphics/structs/Point';
import Vector from '../graphics/structs/Vector';
import LinkedHashItems from './LinkedHashItems';
/**
 * Callback function to iterate over result shapes
 * 
 * @callback onMergedRectangleItemCallback
 * @param {Point[]} points Collection of points tracing margin around result area formed via merge of rectangles.
 * The outer shape margin has clock wise sequence of data points. Internal holes inside of the shape are formed by counter clock wise 
 * sequence of data points.
 */

/**
 * Merges collection of rectangles into shapes. Calls callback function to pass result sequences of data points.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} items Collection of rectangles.
 * @param {onMergedRectangleItemCallback} onItem Callback function to pass result sequences of margin data points.
 */
export default function getMergedRectangles(thisArg, items, onItem) {
  var index, len,
    index2, len2,
    point;

  items.sort(function (a, b) {
    if (a.x == b.x) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });

  var points = [];
  var pointsHash = {};

  for (index = 0, len = items.length; index < len; index += 1) {
    var item = items[index];
    var xs = [item.x, item.right()];
    for (var k = 0; k < xs.length; k += 1) {
      var x = xs[k];
      point = pointsHash[x];
      if (point == null) {
        point = {
          x: x,
          add: [],
          remove: []
        };
        pointsHash[x] = point;
        points.push(point);
      }
      if (x == item.x) {
        point.add.push(index);
      } else {
        point.remove.push(index);
      }
    }
  }

  points.sort(function (a, b) {
    return a.x - b.x;
  });

  function Range(start, end) {
    this.start = start;
    this.startHead = null;

    this.end = end;
    this.endHead = null;

    this.overlap = function (range) {
      return !(this.end < range.start || this.start > range.end);
    };
  }

  function Stripe(x, ranges) {
    this.x = x;
    this.ranges = ranges;
  }

  var active = {};
  var stripes = [];
  stripes.push(new Stripe(null, []));

  for (index = 0, len = points.length; index < len; index += 1) {
    point = points[index];

    for (index2 = 0, len2 = point.add.length; index2 < len2; index2 += 1) {
      active[point.add[index2]] = true;
    }
    for (index2 = 0, len2 = point.remove.length; index2 < len2; index2 += 1) {
      delete active[point.remove[index2]];
    }

    var activeRects = [];
    for (var key in active) {
      if (active.hasOwnProperty(key)) {
        activeRects.push(items[key]);
      }
    }

    activeRects.sort(function (a, b) {
      return a.y - b.y;
    });

    var ranges = [];

    var start = null;
    var end = null;

    for (index2 = 0, len2 = activeRects.length; index2 < len2; index2 += 1) {
      var activeRect = activeRects[index2];

      if (start == null) {
        start = activeRect.y;
        end = activeRect.bottom();
      } else {
        if (end < activeRect.y) {
          ranges.push(new Range(start, end));
          start = activeRect.y;
          end = activeRect.bottom();
        } else {
          end = Math.max(end, activeRect.bottom());
        }
      }
    }
    if (start != null) {
      ranges.push(new Range(start, end));
    }

    stripes.push(new Stripe(point.x, ranges));
  }

  var lists = [];
  var heads = {};
  var counter = 1;

  function Head(isHead, list) {
    this.isHead = isHead;
    this.list = list;

    if (!heads.hasOwnProperty(list)) {
      heads[list] = [];
    }
    heads[list].push(this);

    this.add = function (segment) {
      if (!segment.from.equalTo(segment.to)) {
        if (this.isHead) {
          lists[this.list].add(counter, segment);
          counter += 1;
        } else {
          lists[this.list].unshift(counter, segment);
          counter += 1;
        }
      }
    };

    this.getTail = function () {
      return new Head(!this.isHead, this.list);
    };

    this.attach = function (head) {
      if (this.list != head.list) {
        lists[this.list].attach(lists[head.list]);

        var refs = heads[head.list];
        delete heads[head.list];
        if (refs != null) {
          for (var index = 0, len = refs.length; index < len; index += 1) {
            var ref = refs[index];
            if (ref != head) {
              ref.list = this.list;
              heads[this.list].push(ref);
            }
          }
        }
      }
    };
  }

  function createHead(isHead) {
    lists.push(new LinkedHashItems());
    return new Head(isHead, lists.length - 1);
  }

  for (index = 1, len = stripes.length; index < len; index += 1) {
    var prev = stripes[index - 1];
    var curr = stripes[index];

    var pi = 0, ci = 0;
    while (pi < prev.ranges.length || ci < curr.ranges.length) {
      var pr = pi < prev.ranges.length ? prev.ranges[pi] : null;
      var cr = ci < curr.ranges.length ? curr.ranges[ci] : null;

      if (cr == null) {
        // close pr
        points = [
          new Point(prev.x, pr.end),
          new Point(curr.x, pr.end),
          new Point(curr.x, pr.start),
          new Point(prev.x, pr.start)
        ];
        for (var pindex = 1; pindex < points.length; pindex += 1) {
          pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
        }
        pr.endHead.attach(pr.startHead);
        pi += 1;
        continue;
      }

      if (pr == null) {
        // open cr
        cr.endHead = createHead(true);
        cr.endHead.add(new Vector(new Point(curr.x, cr.start), new Point(curr.x, cr.end)));
        cr.startHead = cr.endHead.getTail();
        ci += 1;
        continue;
      }

      if (!cr.overlap(pr)) {
        if (pr.start < cr.start) {
          // close pr
          points = [
            new Point(prev.x, pr.end),
            new Point(curr.x, pr.end),
            new Point(curr.x, pr.start),
            new Point(prev.x, pr.start)
          ];
          for (pindex = 1; pindex < points.length; pindex += 1) {
            pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
          }
          pr.endHead.attach(pr.startHead);
          pi += 1;
          continue;
        } else {
          // open cr
          cr.endHead = createHead(true);
          cr.endHead.add(new Vector(new Point(curr.x, cr.start), new Point(curr.x, cr.end)));
          cr.startHead = cr.endHead.getTail();
          ci += 1;
          continue;
        }
      } else {
        // ovelaps
        // extend pr.start to cr.start
        points = [
          new Point(prev.x, pr.start),
          new Point(curr.x, pr.start),
          new Point(curr.x, cr.start)
        ];
        for (pindex = 1; pindex < points.length; pindex += 1) {
          pr.startHead.add(new Vector(points[pindex], points[pindex - 1]));
        }
        cr.startHead = pr.startHead;

        var loop = true;
        while (loop) {
          loop = false;

          if (pr.end > cr.end) {
            var nextcr = (ci + 1) < curr.ranges.length ? curr.ranges[ci + 1] : null;
            if (nextcr != null && nextcr.overlap(pr)) {
              // open loop cr.end to nextcr.start
              var p1 = new Point(curr.x, nextcr.start);
              var p2 = new Point(curr.x, cr.end);
              cr.endHead = createHead(true);
              cr.endHead.add(new Vector(p1, p2));
              nextcr.startHead = cr.endHead.getTail();

              ci += 1;
              cr = nextcr;
              loop = true;
            }
          } else {
            var nextpr = (pi + 1) < prev.ranges.length ? prev.ranges[pi + 1] : null;
            if (nextpr != null && nextpr.overlap(cr)) {
              // close loop pr.end to nextpr.start
              points = [
                new Point(prev.x, pr.end),
                new Point(curr.x, pr.end),
                new Point(curr.x, nextpr.start),
                new Point(prev.x, nextpr.start)
              ];
              for (pindex = 1; pindex < points.length; pindex += 1) {
                pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
              }
              pr.endHead.attach(nextpr.startHead);
              pi += 1;
              pr = nextpr;
              loop = true;
            }
          }
        }
        // extend pr.end to cr.end
        points = [
          new Point(prev.x, pr.end),
          new Point(curr.x, pr.end),
          new Point(curr.x, cr.end)
        ];
        for (pindex = 1; pindex < points.length; pindex += 1) {
          pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
        }
        cr.endHead = pr.endHead;
        pi += 1;
        ci += 1;
      }
    }
  }
  if (onItem != null) {
    for (index = 0; index < lists.length; index += 1) {
      if (heads.hasOwnProperty(index)) {
        var list = lists[index];
        points = [];
        list.iterate(function (segment, key) {
          if (points.length == 0) {
            points.push(segment.from);
            points.push(segment.to);
          } else {
            points.push(segment.to);
          }
        });
        onItem.call(thisArg, points);
      }
    }
  }
};
