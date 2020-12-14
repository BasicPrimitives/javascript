export default function getFamilyUnits(family) {
  var familyUnits = [],
    familyUnitByParent = {},
    index,
    len;

  function FamilySiblings() {
    this.fromIndex = 0;
    this.toIndex = 0;
    this.items = [];
    this.hash = {};
  }

  function FamilyUnit(id) {
    this.id = id;
    this.parents = new FamilySiblings();
    this.children = new FamilySiblings();

    this.loopSiblings = function (thisArg, itemid, onItem) {
      this._loop(thisArg, this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
    };

    this.loopNonSiblings = function (thisArg, itemid, onItem) {
      this._loop(thisArg, !this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
    };

    this.loop = function (thisArg, onItem) {
      this._loop(thisArg, this.parents.items, onItem);
      this._loop(thisArg, this.children.items, onItem);
    };

    this._loop = function (thisArg, items, onItem) {
      if (onItem != null) {
        for (var index = 0, len = items.length; index < len; index += 1) {
          var sibling = items[index];
          onItem.call(thisArg, sibling);
        }
      }
    };

    this.addParent = function (itemid) {
      this._add(itemid, this.parents);
    };

    this.addChild = function (itemid) {
      this._add(itemid, this.children);
    };

    this._add = function (itemid, siblings) {
      if (!siblings.hash.hasOwnProperty(itemid)) {
        siblings.items.push(itemid);
        siblings.hash[itemid] = true;
      }
    };
  }

  index = 0;
  family.loop(this, function (itemid, item) {
    var childrenCount = family.countChildren(itemid);
    if (childrenCount > 0) {
      if (!familyUnitByParent.hasOwnProperty(itemid)) {
        var familyUnit = new FamilyUnit(index);
        index += 1;
        familyUnit.addParent(itemid);
        family.loopChildren(this, itemid, function (childid, child) {
          familyUnit.addChild(childid);
          if (childrenCount == 1) {
            family.loopParents(this, childid, function (parentid) {
              familyUnit.addParent(parentid);
              familyUnitByParent[parentid] = familyUnit;
              return family.SKIP;
            });
          }
          return family.SKIP;
        });
        familyUnits.push(familyUnit);
        familyUnitByParent[itemid] = familyUnit;
      }
    }
  });

  var familyUnitByItemId = {};
  for (index = 0, len = familyUnits.length; index < len; index += 1) {
    var familyUnit = familyUnits[index];
    familyUnit.loop(this, function (itemid) {
      if (!familyUnitByItemId.hasOwnProperty(itemid)) {
        familyUnitByItemId[itemid] = [familyUnit];
      } else {
        familyUnitByItemId[itemid].push(familyUnit);
      }
    });
  }

  return familyUnitByItemId;
};