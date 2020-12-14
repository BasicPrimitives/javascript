import {isNullOrEmpty} from '../common';

export default function ArrayReader(itemTemplate, containsUniqueItems, uniquePropertyKey, createSourceHash, isOrdered) {
  this.itemTemplate = itemTemplate;
  this.containsUniqueItems = containsUniqueItems;
  this.uniquePropertyKey = uniquePropertyKey;
  this.containsPrimitiveValues = isNullOrEmpty(uniquePropertyKey);
  this.createSourceHash = createSourceHash;
  this.isOrdered = isOrdered;
};

ArrayReader.prototype.read = function (target, source, path, context) {
  var result = [], resultHash = {},
    hash, sequence, resultSequence = {},
    sourceHash = {},
    item, itemid,
    index, len,
    newHashObject,
    sequencePath = path + "-seq";

  /* validate source array */
  if (!source || !Array.isArray(source)) {
    source = [];
  }

  /* hash values for tracking changes */
  hash = context.hash.hasOwnProperty(path) ? context.hash[path] : {};
  sequence = context.hash.hasOwnProperty(sequencePath) ? context.hash[sequencePath] : {};

  for (index = 0, len = source.length; index < len; index += 1) {
    item = source[index];

    itemid = this.containsUniqueItems ? (this.containsPrimitiveValues ? item : item[this.uniquePropertyKey]) : index;

    if (!resultHash.hasOwnProperty(itemid)) {
      newHashObject = this.itemTemplate.read(hash.hasOwnProperty(itemid) ? hash[itemid] : {}, item, path + "-" + index, context);

      result.push(newHashObject);
      resultHash[itemid] = newHashObject;
      resultSequence[index] = itemid;
      if (this.createSourceHash) {
        sourceHash[itemid] = item;
      }

      if (this.isOrdered) {
        if (sequence[index] != resultSequence[index]) {
          context.isChanged = true;
        }
      }
    }
  }

  context.hash[path] = resultHash;
  context.hash[sequencePath] = resultSequence;
  if (this.createSourceHash) {
    context.sourceHash[path] = sourceHash;
  }

  if (target == null || target.length != result.length) {
    context.isChanged = true;
  }

  return result;
};