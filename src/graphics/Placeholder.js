export default function Placeholder(name) {
  this.name = name;

  this.layers = {};
  this.activeLayer = null;

  this.size = null;
  this.rect = null;

  this.div = null;
};