export default function BaseTransformer(debug) {
  this.debug = debug;
};

BaseTransformer.prototype.validate = function (logicalFamily, strongValidate) {
  /* test consistency of references in family tree */
  if (!logicalFamily.validate()) {
    throw "Family structure failed to pass validation!";
  }

  logicalFamily.loop(this, function (famItemId, famItem) {

    logicalFamily.loopChildren(this, famItemId, function (childid, child, level) {
      if (child.level === null || famItem.level === null || (strongValidate ? child.level != famItem.level + 1 : child.level <= famItem.level)) {
        throw "Family tree is broken. Children/Parents or levels mismatch!";
      }
      return logicalFamily.SKIP;
    });
  });
};
