import { SegmentType } from '../../enums';

export default function DotSegment(x, y, width, height, cornerRadius) {
  this.segmentType = SegmentType.Dot;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.cornerRadius = cornerRadius;
};
