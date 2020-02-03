'use strict';

const fs = require('fs');
const path = require('path')

const [, , configFile] = process.argv;
const config = JSON.parse(fs.readFileSync(configFile));
var content = clean_file(fs.readFileSync(config.source, "utf8"));
var lines = content.split("\n");
var annotations = read_annotations(lines);
//fs.writeFileSync(config.destination + "source.json", JSON.stringify(annotations, null, 2));

var doc = getDoc(annotations);
// fs.writeFileSync(config.destination + "doc.json", JSON.stringify(doc, null, 2));

fs.writeFileSync(config.destination + "enums.md", create_enums_md("Enumerations", doc));

var structures = doc.classes.filter(item => { return item.returns == undefined && item.namespace[1] == "common" });
fs.writeFileSync(config.destination + "structures.md", create_classes_md("Structures", structures));

var algorithms = doc.classes.filter(item => { return item.returns != undefined && item.namespace[1] == "common" });
fs.writeFileSync(config.destination + "algorithms.md", create_classes_md("Algorithms", algorithms));

var functions = doc.functions.filter(item => { return item.namespace[1] == "common" });
fs.writeFileSync(config.destination + "functions.md", create_functions_md("Functions", functions));

var priorities = config["orgdiagram.md"].reduce((agg, name, index) => {
  agg[name] = index + 1;
  return agg;
}, {})

var orgdiagramclasses = doc.classes.filter(item => {
  return item.namespace[1] == "orgdiagram"
    && item.name != "Control" && item.name != "BaseControl"
});
orgdiagramclasses = orgdiagramclasses.sort((a, b) => {
  var ap = priorities[a.name] || 100;
  var bp = priorities[b.name] || 100;
  if (ap < bp) { return -1; }
  if (ap > bp) { return 1; }
  return 0;
});

fs.writeFileSync(config.destination + "orgdiagram.md", create_classes_md("Organizational Chart Configuration Objects", orgdiagramclasses));

var priorities = config["famdiagram.md"].reduce((agg, name, index) => {
  agg[name] = index + 1;
  return agg;
}, {})

var famdiagramclasses = doc.classes.filter(item => {
  return item.namespace[1] == "famdiagram"
    && item.name != "Control" && item.name != "BaseControl"
});
famdiagramclasses = famdiagramclasses.sort((a, b) => {
  var ap = priorities[a.name] || 100;
  var bp = priorities[b.name] || 100;
  if (ap < bp) { return -1; }
  if (ap > bp) { return 1; }
  return 0;
});

fs.writeFileSync(config.destination + "famdiagram.md", create_classes_md("Family Diagram Configuration Objects", famdiagramclasses));

var controlsclasses = get_controls_annotations(doc);
fs.writeFileSync(config.destination + "javascriptcontrols.md", create_classes_md("JavaScript Controls", controlsclasses));

var pdfkitclasses = get_pdfkit_annotations(doc);
fs.writeFileSync(config.destination + "pdfkitplugins.md", create_classes_md("[PDFKit Plugins](https://pdfkit.org/)", pdfkitclasses));

fs.writeFileSync(config.destination + "readme.md", create_index_md("Basic Primitives Diagrams API Reference", {
  orgdiagramclasses,
  famdiagramclasses,
  enums: doc.enums,
  functions,
  structures,
  algorithms,
  controlsclasses,
  pdfkitclasses
}));

function create_index_md(title, {
  orgdiagramclasses,
  famdiagramclasses,
  enums,
  functions,
  structures,
  algorithms,
  controlsclasses,
  pdfkitclasses
}) {
  var result = "### " + title;
  result += "\r\n#### [JavaScript Controls](javascriptcontrols.md)";
  result = controlsclasses.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + key + "](javascriptcontrols.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [PDFKit Plugins](pdfkitplugins.md)";
  result = pdfkitclasses.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + key + "](pdfkitplugins.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Organizational Chart Configuration Objects](orgdiagram.md)";
  result = orgdiagramclasses.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](orgdiagram.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Family Diagram Configuration Objects](famdiagram.md)";
  result = famdiagramclasses.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](famdiagram.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Enumerations](enums.md)";
  result = enums.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](enums.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Structures](structures.md)";
  result = structures.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](structures.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Functions](functions.md)";
  result = functions.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](functions.md#" + key + ")";
    return agg;
  }, result);
  result += "\r\n#### [Algorithms](algorithms.md)";
  result = algorithms.reduce((agg, annotation) => {
    let { namespace, name } = annotation;
    let key = [...namespace, name].join(".");
    agg += "\r\n* [" + annotation.name + "](algorithms.md#" + key + ")";
    return agg;
  }, result);
  return result;
}

function get_controls_annotations(doc) {
  var orgdiagramControl = doc.classes.find(item => item.name == "Control" && item.namespace[1] == "orgdiagram");
  var famdiagramControl = doc.classes.find(item => item.name == "Control" && item.namespace[1] == "famdiagram");
  var baseControl = doc.classes.find(item => item.name == "BaseControl" && item.namespace[1] == "orgdiagram");
  orgdiagramControl.functions = baseControl.functions;
  famdiagramControl.functions = baseControl.functions;
  return [
    orgdiagramControl,
    famdiagramControl
  ];
}

function get_pdfkit_annotations(doc) {
  var orgdiagram = doc.classes.find(item => item.name == "Plugin" && item.namespace[2] == "orgdiagram");
  var famdiagram = doc.classes.find(item => item.name == "Plugin" && item.namespace[2] == "famdiagram");
  return [
    orgdiagram,
    famdiagram
  ];
}


function create_functions_md(title, annotations) {
  var result = "# " + title;
  return annotations.reduce((agg, annotation) => {
    agg += create_function_md(annotation, true);
    return agg;
  }, result);
}

function create_classes_md(title, classes) {
  var result = "# " + title;
  return classes.reduce((agg, classAnnotation) => {
    let { name, description, namespace, constants, properties, functions, returns, params, callbackproperties } = classAnnotation;
    let key = [...namespace, name].join(".");
    agg += '\r\n## <a name="' + key + '" id="' + key + '">' + name + '</a>';
    agg += "\r\n" + description;
    agg += "\r\n";
    agg += "\r\n `" + key + "` ";
    agg += "\r\n";
    if (returns != undefined || params != undefined) {
      agg += "\r\n### Constructor";
      agg += create_function_md(classAnnotation);
      agg += "\r\n";
    }
    if (constants.length > 0) {
      agg += "\r\n### Constants";
      agg += "\r\n| Name | Type | Default | Description | ";
      agg += "\r\n| --- | --- | --- | --- | ";
      constants.forEach(({ name, value, type, description }) => {
        type = replaceAll(type, "|", ", ");
        agg += "\r\n | `" + name + "` | " + type + " | `" + value + "` | " + (description || spaceCamelCaseName(name)) + " | ";
      });
      agg += "\r\n";
    }
    if (properties.length > 0) {
      let groups = properties.reduce((agg, annotation) => {
        let { group } = annotation;
        agg[group] = agg[group] || [];
        agg[group].push(annotation);
        return agg;
      }, {});

      Object.keys(groups).sort(function (a, b) {
        if (a == "undefined") {
          a = "0";
        }
        if (b == "undefined") {
          b = "0";
        }
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      }).forEach((group) => {
        if (group == "undefined") {
          agg += "\r\n### Properties";
        } else {
          agg += "\r\n### " + group + " Properties";
        }
        agg += "\r\n| Name | Type | Default | Description | ";
        agg += "\r\n| --- | --- | --- | --- | ";
        groups[group].filter(item => item.ignore == undefined).forEach(({ name, value, type, description }) => {
          type = replaceAll(type, "|", ", ");
          agg += "\r\n | `" + name + "` | " + type + " | `" + value + "` | " + (description || spaceCamelCaseName(name)) + " | ";
        });
        agg += "\r\n";
      });
    }

    if (callbackproperties != undefined && callbackproperties.length > 0) {
      agg += "\r\n**Events**";
      callbackproperties.filter(item => item.ignore == undefined).forEach(callback => {
        agg += create_function_md(callback);
      });
    }
    if (functions.length > 0) {
      agg += "\r\n### Functions";
      functions.filter(item => item.ignore == undefined).forEach(funcAnnotation => {
        agg += create_function_md(funcAnnotation);
      });
      agg += "\r\n";
    }
    return agg;
  }, result);
}

function create_function_md({ name, namespace, signature, description, params, returns, callbackparams }, hasBookmark) {
  var result = "\r\n"
  if (hasBookmark) {
    let key = [...namespace, name].join(".");
    result += '\r\n## <a name="' + key + '" id="' + key + '">' + name + '</a>';
  } else {
    result += "\r\n `" + name + "(" + (signature != undefined ? signature.join(", ") : "") + ")` ";
  }
  result += "\r\n"
  result += "\r\n" + description;
  result += "\r\n";
  if (returns != undefined) {
    result += "\r\n Returns: `" + returns.type + "` - " + returns.description.toLowerCase();
    result += "\r\n";
  }
  if (params != undefined) {
    result += "\r\n| Param | Type | Default | Description | ";
    result += "\r\n| --- | --- | --- | --- | ";
    params.forEach(({ name, value, type, description }) => {
      type = replaceAll(type, "|", ", ");
      result += "\r\n | `" + name + "` | " + type + " | `" + (value || "") + "` | " + (description || spaceCamelCaseName(name)) + " | ";
    });
  }
  if (callbackparams != undefined && callbackparams.length > 0) {
    result += "\r\n**Callbacks**";
    callbackparams.forEach(callback => {
      result += create_function_md(callback);
    });
  }
  return result;
}

function create_enums_md(title, doc) {
  var result = "# " + title;
  return doc.enums.filter(item => item.ignore == undefined).reduce((agg, { name, description, namespace, items, type }) => {
    let key = [...namespace, name].join(".");
    agg += '\r\n## <a name="' + key + '" id="' + key + '">' + name + '</a>';
    agg += "\r\n" + description;
    agg += "\r\n";
    agg += "\r\n `" + [...namespace, name].join(".") + "` ";
    agg += "\r\n";
    agg += "\r\n| Name | Type | Value | Description | ";
    agg += "\r\n| --- | --- | --- | --- | ";
    items.forEach(({ name, value, description }) => {
      agg += "\r\n | `" + name + "` | " + get_enum_type(type, doc.typedefs) + " | `" + value + "` | " + (description || spaceCamelCaseName(name)) + " | ";
    });
    agg += "\r\n";
    return agg;
  }, result);
}

function getDoc(annotations) {
  // Aggregate type definitions
  var typedefs = annotations.reduce((agg, item) => {
    if (item.tag == "typedef") {
      agg[item.typedef] = item;
    }
    return agg;
  }, {});


  var enums = annotations.filter(item => item.tag == "enum").map(function (annotation) {
    annotation.items.sort(sortAnnotationsCallback);
    return annotation;
  });
  enums.sort(sortAnnotationsCallback);

  var classes = annotations.filter(item => item.tag == "class").map(function (annotation) {
    annotation.items.sort(sortAnnotationsCallback);
    annotation.constants = annotation.items.filter(item => item.tag == "property" && item.constant == true).sort(sortAnnotationsCallback);
    annotation.properties = annotation.items.filter(item => item.tag == "property" && item.constant == undefined).sort(sortAnnotationsCallback);
    annotation.functions = annotation.items.filter(item => item.tag == "function");
    annotation.callbackproperties = annotation.items.filter(item => item.tag == "event");
    annotation.callbacks = annotation.items.filter(item => item.tag == "callback");
    return annotation;
  });

  annotations.filter(item => item.tag == "callback").forEach(item => {
    if (item.params != undefined) {
      item.signature = get_signature(item.params);
    }
  })

  var callbacksHash = annotations.filter(item => item.tag == "callback").reduce((agg, item) => {
    var { name } = item;
    agg[name] = item;
    return agg;
  }, {});

  var classesHash = classes.reduce((agg, item) => {
    var { namespace, name } = item;
    var key = [...namespace, name].join(".");
    agg[key] = item;
    return agg;
  }, {});

  annotations.filter(item => {
    return item.tag == "function" && item.namespace[item.namespace.length - 1] == "prototype"
  }).forEach(annotation => {
    var { namespace } = annotation;
    var key = namespace.slice(0, namespace.length - 1).join(".");
    var classAnnotation = classesHash[key];
    if (classAnnotation != undefined) {
      classAnnotation.functions.push(annotation);
    }
  });

  classes.forEach(annotation => {
    annotation.functions = annotation.functions.sort(sortAnnotationsCallback);

    if (annotation.params != undefined) {
      annotation.signature = get_signature(annotation.params);
    }

    annotation.callbacks.forEach(item => {
      if (item.params != undefined) {
        item.signature = get_signature(item.params);
      }
    })

    var classCallbacksHash = annotation.callbacks.reduce((agg, item) => {
      var { name } = item;
      agg[name] = item;
      return agg;
    }, {});

    annotation.functions.forEach(func => {
      if (func.params != undefined) {
        func.callbackparams = func.params.filter(param => callbacksHash[param.type] || classCallbacksHash[param.type]).map(param => callbacksHash[param.type] || classCallbacksHash[param.type]);
      }
    });
  });

  var functions = annotations.filter(item => item.tag == "function"
    && item.namespace[item.namespace.length - 1] != "prototype"
    && item.ignore == undefined
    && item.private == undefined
  ).sort(sortAnnotationsCallback);

  functions.forEach(func => {
    if (func.params != undefined) {
      func.callbackparams = func.params.filter(param => {
        var types = param.type.split("|");
        return callbacksHash[types[0]];
      }).map(param => {
        var types = param.type.split("|");
        return callbacksHash[types[0]];
      });
    }
  });

  return {
    enums,
    typedefs,
    classes,
    functions
  }
}

function get_signature(params) {
  var signature = [];
  var hash = {};
  if (params != undefined && params.length > 0) {
    signature = params.reduce((agg, param) => {
      if (hash[param.name] == undefined) {
        agg.push(param.name);
        hash[param.name] = true;
      }
      return agg;
    }, []);
  }
  return signature;
}

function sortAnnotationsCallback(a, b) {
  if (a.name < b.name) { return -1; }
  if (a.name > b.name) { return 1; }
  return 0;
}

function get_enum_type(type, typedefs) {
  if (typedefs[type] != undefined) {
    return typedefs[type].type;
  }
  return type;
}

function read_annotations(lines, parentTag) {
  var annotations = [];
  while (lines.length > 0) {
    var line = lines[0];
    if (line.indexOf("/* ") == -1) {
      if (line.indexOf("/**") > -1) {
        var annotation = read_annotation(lines);
        switch (parentTag) {
          case "enum":
            {
              var enumItemLine = lines.shift();
              var options = get_enum_item(enumItemLine);
              annotation.name = options.name;
              annotation.value = options.value;
            }
            break;
          case "class":
            {
              if (annotation.tag != "callback") {
                var classItemLine = lines.shift();
                if (classItemLine != undefined) {
                  var options = get_class_item(classItemLine);
                  annotation.tag = options.tag;
                  annotation.name = options.name;
                  annotation.value = options.value;
                  annotation.signature = options.signature;
                }
              } else {
                var classItemLine = lines.shift();
                if (classItemLine != undefined && classItemLine.length > 0) {
                  var options = get_class_item(classItemLine);
                  annotation.tag = "event";
                  annotation.name = options.name;
                  annotation.signature = get_signature(annotation.params);
                }
              }
            }
            break;
          default:
            if (annotation.tag == undefined) {
              var nextLine = lines.shift();
              if (nextLine.indexOf("function") > -1) {
                var options = get_function_item(nextLine);
                annotation.tag = "function";
                annotation.name = options.name;
                annotation.namespace = options.namespace;
                annotation.signature = options.signature;
              } else {
                annotation.undefinedTag = true;
              }
            }
            break;
        }
        annotations.push(annotation);
        continue;
      }
    }
    switch (parentTag) {
      case "enum":
        {
          if (line.indexOf(":") > -1) {
            var enumItemLine = lines.shift();
            var options = get_enum_item(enumItemLine);
            var annotation = {
              name: options.name,
              value: options.value
            }
            annotations.push(annotation);
            continue;
          }
          break;
        }
      default:
        break;
    }
    lines.shift();

  }
  return annotations;
}

function read_annotation(lines) {

  var annotationLines = get_annotaton_lines(lines);

  var annotation = {};
  var tags = [];
  var descriptionTag = annotation;
  for (var index = 0; index < annotationLines.length; index += 1) {
    var annotationLine = annotationLines[index];
    var tagName;
    switch (tagName = get_tag_name(annotationLine)) {
      case "namespace":
        annotation.tag = tagName;
        annotation.namespace = get_tag_description(annotationLine).split(".");
        break;
      case "preserve":
        annotation.tag = tagName;
        annotation.nomerge = true;
        annotation.description = get_tag_description(annotationLine);
        break;
      case "constructor":
        annotation.constructor = true;
        break;
      case "private":
        annotation.private = true;
        break;
      case "protected":
        annotation.protected = true;
        break;
      case "public":
        annotation.public = true;
        break;
      case "constant":
      case "const":
      case "readonly":
        annotation.constant = true;
        break;
      case "default":
        annotation.default = true;
        break;
      case "override":
        annotation.override = true;
        break;
      case "type":
        annotation.type = get_type_tag(annotationLine);
        break;
      case "this":
        annotation.this = get_type_tag(annotationLine);
        break;
      case "ignore":
        annotation.ignore = true;
        break;
      case "param":
        var param = get_param_tag(annotationLine);
        annotation.params = annotation.params || [];
        annotation.params.push(param);
        descriptionTag = param;
        break;
      case "property":
        var property = get_param_tag(annotationLine);
        annotation.properties = annotation.properties || [];
        annotation.properties.push(property);
        descriptionTag = property;
        break;
      case "returns":
      case "return":
        annotation.returns = get_returns_tag(annotationLine);
        descriptionTag = annotation.returns;
        break;
      case "callback":
        annotation.tag = tagName;
        annotation.name = get_tag_description(annotationLine);
        break;
      case "class":
        annotation.tag = tagName;
        annotation.class = get_tag_description(annotationLine);

        var blockOfLines = get_block_lines(lines);
        var classLine = blockOfLines.shift();
        var options2 = get_enum_name(classLine);
        annotation.namespace = options2.namespace;
        annotation.name = options2.name;
        annotation.items = read_annotations(blockOfLines, tagName);
        break;
      case "group":
        annotation.tag = tagName;
        annotation.group = get_tag_description(annotationLine);
        break;
      case "classdesc":
        if (annotationLine != "") {
          var description = get_tag_description(annotationLine);
          if (descriptionTag.description == undefined) {
            descriptionTag.description = description;
          } else {
            descriptionTag.description += (" " + description);
          }
        }
        break;
      case "typedef":
        {
          var options = get_typedef_tag(annotationLine);
          annotation.tag = tagName;
          annotation.type = options.type;
          annotation.typedef = options.typedef;
        }
        break;
      case "enum":
        {
          var options = get_enum_tag(annotationLine);
          annotation.tag = tagName;
          annotation.type = options.type;
          var blockOfLines = get_block_lines(lines);

          var enumLine = blockOfLines.shift();
          var options2 = get_enum_name(enumLine);
          annotation.namespace = options2.namespace;
          annotation.name = options2.name;
          annotation.items = read_annotations(blockOfLines, tagName);
        }
        break;
      case "empty":
        if (annotationLine != "") {
          if (descriptionTag.description == undefined) {
            descriptionTag.description = annotationLine.trim();
          } else {
            descriptionTag.description += ((descriptionTag.nomerge ? "\n" : " ") + annotationLine.trim());
          }
        }
        break;
      default:
        tags.push(tagName);
        break;
    }
  }

  if (tags.length > 0) {
    annotation.lines = annotationLines;
    annotation.unresolvedTags = tags;
  }

  return annotation;
}

function get_type_tag(line) {
  var description = get_tag_description(line);
  var words = description.split(" ");
  var type = words[0].substr(1, words[0].length - 2);
  return type;
}

function get_typedef_tag(line) {
  var description = get_tag_description(line);
  var words = description.split(" ");
  var type = words[0].substr(1, words[0].length - 2);
  var typedef = words[1];
  var result = {
    type: type,
    typedef: typedef
  };
  return result;
}

function get_enum_tag(line) {
  var description = get_tag_description(line);
  var words = description.split(" ");
  var type = words[0].substr(1, words[0].length - 2);
  var result = {
    type: type
  };
  return result;
}

function get_enum_name(line) {
  var words = line.substr(0, line.indexOf("=") - 1).trim().split(".");
  var name = words[words.length - 1];
  var namespace = words.slice(0, words.length - 1);
  var result = {
    name,
    namespace
  }
  return result;
}

function get_enum_item(line) {
  line = replaceAll(line, ",", "");
  var words = line.trim().split(":");
  var name = words[0].trim();
  var value = words[1].trim();
  var result = {
    name: name,
    value: value
  }
  return result;
}

function get_function_item(line) {
  line = replaceAll(line, "()", "( )")
  var words = line.split(/[=\(\)]+/);
  var names = words[0].trim().split(".");
  var name = names[names.length - 1];
  var namespace = names.slice(0, names.length - 1);
  var signature = words[2].trim().split(",");
  var result = {
    name,
    namespace,
    signature
  }
  return result;
}

function get_class_item(line) {
  let tag = "";
  let name = "";
  let value = undefined;
  let signature = undefined;
  if (line.indexOf("function") > -1) {
    tag = "function";

    line = replaceAll(line, "()", "( )")
    if (line.indexOf("this.") > -1) {
      var words = line.trim().split(/[=\(\)]+/);
      var names = words[0].trim().split(".");
      name = names[1].trim();
      signature = words[2].trim().split(".");
    } else {
      var words = line.trim().split(/[\(\)]+/);
      var names = words[0].trim().split(" ");
      name = names[names.length - 1].trim();
      signature = words[1].trim().split(".");
    }
  } else {
    tag = "property";

    if (line.indexOf("this.") > -1) {
      line = replaceAll(line, ";", "");
      var words = line.trim().split("=");
      var names = words[0].split(".");
      name = names[1].trim();
      value = words[1].trim();
    } else {
      line = replaceAll(line, ";", "");
      line = replaceAll(line, ",", "");
      var words = line.trim().split("=");
      name = words[0].trim();
      value = words[1].trim();
    }
    if (value.indexOf("/") > -1) {
      value = value.substr(0, value.indexOf("/"));
    }
    var values = value.split(/[\(\)]+/);
    if (values.length > 1) {
      value = "{" + values[1] + "}";
    }
  }


  var result = {
    tag,
    name,
    value,
    signature
  }
  return result;
}

function get_param_tag(line) {
  var description = get_tag_description(line);
  var words = description.trim().split(" ");
  var type = words[0].substr(1, words[0].length - 2);
  var paramNames = words[1].trim().split(/[=\[\]]+/);
  var name = paramNames[0].trim();
  var value = undefined;
  if (paramNames.length > 1) {
    name = paramNames[1].trim();
    value = paramNames[2].trim();;
  }
  var description = words.slice(2).join(" ");
  var result = {
    type,
    name,
    value,
    description
  };
  return result;
}

function get_returns_tag(line) {
  var description = get_tag_description(line);
  var words = description.split(" ");
  var type = words[0].substr(1, words[0].length - 2);
  var description = words.slice(1).join(" ");
  var result = {
    type: type,
    description: description
  };
  return result;
}

function get_tag_description(line) {
  var result = "";
  var hasFound = false;
  line = replaceAll(line, "\t", " ");
  var words = line.split(" ");
  for (var index = 0; index < words.length; index += 1) {
    var word = words[index];
    if (hasFound) {
      if (result.length > 0) {
        result += " ";
      }
      result += word;
    } else {
      if (word[0] == "@") {
        hasFound = true;
      }
    }
  }
  return result;
}

function get_tag_name(line) {
  line = replaceAll(line, "\t", " ");
  var words = line.split(" ");
  for (var index = 0; index < words.length; index += 1) {
    var word = words[index];
    if (word[0] == "@") {
      return word.substr(1);
    }
  }
  return "empty";
}

function get_annotaton_lines(lines) {
  var annotationLines = [];
  while (lines.length > 0) {
    var line = lines.shift();

    var breakLoop = (line.indexOf("*/") > -1);

    line = replaceAll(line, "/**", "");
    line = replaceAll(line, "*/", "").trim();
    if (line[0] == "*") {
      line = line.substr(1);
    }
    annotationLines.push(line);

    if (breakLoop) {
      break;
    }
  }
  return annotationLines;
}

function get_block_lines(lines) {
  var blockLines = [];
  var brackets = 0;
  while (lines.length > 0) {
    var line = lines.shift();

    for (var index = 0; index < line.length; index += 1) {
      switch (line[index]) {
        case "{":
          brackets += 1;
          break;
        case "}":
          brackets -= 1;
          if (brackets < 0) {
            throw "Unbalanced brackets in block of lines";
          }
          break;
      }
    }

    blockLines.push(line);

    if (brackets == 0) {
      break;
    }
  }
  return blockLines;
}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(text, search, replacement) {
  if (text != undefined) {
    return text.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
  }
  return "";
};

function clean_file(content) {
  content = replaceAll(content, "\r", "");
  return content;
}

function spaceCamelCaseName(name) {
  return splitCamelCaseName(name).join(" ");
}

function splitCamelCaseName(name) {
  var result = [];
  var word = "";
  for (var i = 0; i < name.length; i += 1) {
    var c = name[i];
    if (c >= 'A' && c <= 'Z') {
      if (word !== "") {
        result.push(word);
      }
      word = c;
    } else {
      word += c;
    }
  }
  if (word !== "") {
    result.push(word);
  }
  return result;
};