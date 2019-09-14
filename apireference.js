'use strict';

const fs = require('fs');
const path = require('path')

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

const [node, app, configFile] = process.argv;
const config = JSON.parse(fs.readFileSync(configFile));

const files = read_files(config.source);

var annotations = [];
files.forEach(({ folder, name }) => {
  const extention = path.extname(name);
  if (extention == '.js') {
    var fileAnnotations = {
      folder: folder,
      name: name,
      annotations: []
    }
    var fileContents = fs.readFileSync(folder + name, "utf8");
    const matches = fileContents.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
    if (matches != null) {
      matches.forEach((matched, index) => {
        fileAnnotations.annotations.push(read_annotation(matched));
      });
    }
    annotations.push(fileAnnotations);
  }
})

var output = "";

fs.writeFileSync(config.destination + "enums.md", JSON.stringify(annotations, null, 2));
console.log('\x1b[33m%s\x1b[0m', "enum.md");


function read_files(path) {
  var result = [];
  read_folder(path, (name, folder) => {
    result.push({
      folder,
      name
    });
  });
  return result;
}

function read_folder(folder, onItem) {
  const items = fs.readdirSync(folder);
  const stats = items.reduce((agg, name) => {
    agg[name] = fs.lstatSync(folder + name);
    return agg;
  }, {});
  items.forEach(name => {
    if (stats[name].isDirectory()) {
      read_folder(folder + name + "\\", onItem);
    } else {
      onItem(name, folder);
    }
  });
}

function read_annotation(annotation) {
  var lines = annotation.split("\n");
  var result = {
    name: null,
    keyword: null
  };
  var section = result;
  for (var index = 0; index < lines.length; index += 1) {
    var line = lines[index];
    switch (line) {
      case "/*":
      case "*/":
        break;
      default:
        {
          var colonIndex = line.indexOf(":");
          var dashIndex = line.indexOf("-");
          if (colonIndex >= 0) {
            var name = line.substring(0, colonIndex - 1).trim().toLowerCase();
            var keyword = line.substring(colonIndex + 1, line.length).trim();
            switch (name) {
              case "function":
                result.name = name;
                result.keyword = keyword;
                section = result;
                break;
              case "parameters":
              case "returns":
                result[name] = {
                  name: name
                }
                section = result[name];
                break;
            }
          } else if (dashIndex > 0) {
            var name = line.substring(0, dashIndex - 1).trim().toLowerCase();
            var description = line.substring(dashIndex + 1, line.length).trim();
            section.items = section.items || [];
            section.items.push({
              name: name,
              description: description
            })
          } else {
            section.description = section.description || "";
            section.description += line.trim();
          }
        }
    }
  }
  return result;
}
