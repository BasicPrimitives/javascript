primitives.common.SortedList = function () {
  var _rootNode = null;

  function Node(value, context) {
    this.value = value;
    this.context = context;

    this.left = null;
    this.right = null;

    this.balance = 0;
  }

  function _rebalance(node) {
    var balance;
    if (node.balance == 2) {
      var right = node.right;
      balance = right.balance;
      if (balance >= 0) {
        _rotateSmallLeft(right, node);
      } else {
        _rotateBigLeft(right, node);
      }
    } else if (node.balance == -2) {
      var left = node.left;
      balance = left.balance;
      if (balance <= 0) {
        _rotateSmallRight(node.left, node);
      } else {
        _rotateBigRight(node.left, node);
      }
    }
    return balance;
  }

  function _rotateSmallLeft(node, parent) {
    _rotateLeft(node, parent);

    if (node.balance == 1) {
      parent.balance = 0;
      node.balance = 0;
    } else {
      parent.balance = -1;
      node.balance = 1;
    }
  }

  function _rotateLeft(node, parent) {
    _swap(node, parent);
    parent.right = node.right;
    node.right = node.left;
    node.left = parent.left;
    parent.left = node;
  }

  function _rotateSmallRight(node, parent) {
    _rotateRight(node, parent);

    if (node.balance == -1) {
      parent.balance = 0;
      node.balance = 0;
    } else {
      parent.balance = 1;
      node.balance = -1;
    }
  }

  function _rotateRight(node, parent) {
    _swap(node, parent);
    parent.left = node.left;
    node.left = node.right;
    node.right = parent.right;
    parent.right = node;
  }

  function _rotateBigLeft(node, parent) {
    var bottom = node.left;
    _rotateRight(bottom, node);
    _rotateLeft(node, parent);

    parent.balance = 0;
    switch (bottom.balance) {
      case 1:
        node.balance = -1;
        bottom.balance = 0;
        break;
      case 0:
        bottom.balance = 0;
        node.balance = 0;
        break;
      default:
        bottom.balance = 1;
        node.balance = 0;
        break;
    }
  }

  function _rotateBigRight(node, parent) {
    var bottom = node.right;
    _rotateLeft(bottom, node);
    _rotateRight(node, parent);

    parent.balance = 0;
    switch (bottom.balance) {
      case -1:
        bottom.balance = 0;
        node.balance = 1;
        break;
      case 0:
        bottom.balance = 0;
        node.balance = 0;
        break;
      default:
        bottom.balance = -1;
        node.balance = 0;
        break;
    }
  }

  function add(value, context, thisArg, onDuplicate) {
    if (_rootNode == null) {
      _rootNode = new Node(value, context);
    } else {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        if (node != null) {
          trace.push(node);
        }
        node = next;
        if (node.value == value) {
          if (onDuplicate != null) {
            onDuplicate.call(thisArg, node.context);
          } else {
            throw "Structure does not support duplicates.";
          }
        } else {
          if (node.value > value) {
            next = node.left;
          } else {
            next = node.right;
          }
        }
      }
      trace.push(node);
      var newNode = new Node(value, context);
      if (node.value > value) {
        node.left = newNode;
      } else {
        node.right = newNode;
      }
      node = newNode;

      while ((next = trace.pop()) != null) {
        if (node.value < next.value) {
          if (next.balance < 0) {
            next.balance -= 1;
            _rebalance(next);
            break;
          } else {
            if (next.balance > 0) {
              next.balance -= 1;
              break;
            }
            next.balance -= 1;
          }
        } else {
          if (next.balance > 0) {
            next.balance += 1;
            _rebalance(next);
            break;
          } else {
            if (next.balance < 0) {
              next.balance += 1;
              break;
            }
            next.balance += 1;
          }
        }
        node = next;
      }
    }
  }

  function _delete(node, parent) {
    var child = node.right != null ? node.right : node.left;
    if (parent != null) {
      if (parent.value > node.value) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    } else {
      _rootNode = child;
    }
  }

  function _swap(node1, node2) {
    var value = node1.value;
    node1.value = node2.value;
    node2.value = value;

    var context = node1.context;
    node1.context = node2.context;
    node2.context = context;
  }

  function _copy(fromNode, toNode) {
    toNode.value = fromNode.value;
    toNode.context = fromNode.context;
  }

  function remove(value) {
    var trace = [];
    var node = _rootNode;
    while (node != null) {
      if (node.value == value) {
        if (node.right != null && node.left != null) {
          trace.push(node);
          var next = node.right;
          while (next.left != null) {
            trace.push(next);
            next = next.left;
          }
          _copy(next, node);
          _delete(next, trace[trace.length - 1]);
          trace.push(next);
        } else {
          _delete(node, trace[trace.length - 1]);
          trace.push(node);
        }
        for (var index = trace.length - 2; index >= 0; index -= 1) {
          var parent = trace[index];
          node = trace[index + 1];
          if (parent.value > node.value) {
            if (parent.balance > 0) {
              parent.balance += 1;
              if (_rebalance(parent) === 0) {
                break;
              }
            } else {
              if (parent.balance === 0) {
                parent.balance += 1;
                break;
              }
              parent.balance += 1;
            }
          } else {
            if (parent.balance < 0) {
              parent.balance -= 1;
              if (_rebalance(parent) === 0) {
                break;
              }
            } else {
              if (parent.balance === 0) {
                parent.balance -= 1;
                break;
              }
              parent.balance -= 1;
            }
          }
        }
        break;
      } else {
        trace.push(node);
        if (node.value > value) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
  }

  function nextContext(fromValue) {
    var result = null;
    loopForward(this, fromValue, function (value, context) {
      result = context;
      return true;
    });
    return result;
  }

  function loopForward(thisArg, fromValue, onItem) { //function onItem(value, context)
    if (onItem != null) {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        node = next;
        if (node.value >= fromValue || fromValue == null) {
          trace.push(node);
          next = node.left;
        } else {
          next = node.right;
        }
      }
      while ((node = trace.pop()) != null) {
        if (onItem.call(thisArg, node.value, node.context)) {
          return;
        }
        next = node.right;
        while (next != null) {
          node = next;
          if (node.left != null) {
            trace.push(node);
            next = node.left;
          } else {
            if (onItem.call(thisArg, node.value, node.context)) {
              return;
            }
            next = node.right;
          }
        }
      }
    }
  }

  function previousContext(fromValue) {
    var result = null;
    loopBackward(this, fromValue, function (nextValue, context) {
      result = context;
      return true;
    });
    return result;
  }

  function loopBackward(thisArg, fromValue, onItem) {
    if (onItem != null) {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        node = next;
        if (node.value <= fromValue || fromValue == null) {
          trace.push(node);
          next = node.right;
        } else {
          next = node.left;
        }
      }
      while ((node = trace.pop()) != null) {
        if (onItem.call(thisArg, node.value, node.context)) {
          return;
        }
        next = node.left;
        while (next != null) {
          node = next;
          if (node.right != null) {
            trace.push(node);
            next = node.right;
          } else {
            if (onItem.call(thisArg, node.value, node.context)) {
              return;
            }
            next = node.left;
          }
        }
      }
    }
  }

  function _getValidationDepth(node) {
    var level = [],
      result = 0;
    if (node != null) {
      level.push(node);
      while (level.length > 0) {
        var newLevel = [];

        for (var index = 0; index < level.length; index += 1) {
          node = level[index];

          if (node.left != null) {
            newLevel.push(node.left);
          }

          if (node.right != null) {
            newLevel.push(node.right);
          }
        }

        level = newLevel;
        result += 1;
      }
    }
    return result;
  }

  function validate() {
    if (_rootNode != null) {
      var level = [_rootNode];
      while (level.length > 0) {
        var newLevel = [];

        for (var index = 0; index < level.length; index += 1) {
          var node = level[index];

          if (node.value == null) {
            return false;
          }

          if (node.left != null) {
            newLevel.push(node.left);
            if (node.left.value >= node.value) {
              return false;
            }
          }

          if (node.right != null) {
            newLevel.push(node.right);
            if (node.right.value <= node.value) {
              return false;
            }
          }

          if (node.balance != (_getValidationDepth(node.right) - _getValidationDepth(node.left))) {
            // eslint-disable-next-line no-console
            console.log("Disbalanced node: " + node.value + " - " + JSON.stringify(_rootNode));
            return false;
          }
        }

        level = newLevel;
      }
    }
    return true;
  }

  return {
    add: add,
    remove: remove,
    loopForward: loopForward,
    loopBackward: loopBackward,
    nextContext: nextContext,
    previousContext: previousContext,
    validate: validate
  };
};