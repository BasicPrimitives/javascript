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

const files = read_files(config.folder, config.priorities);
const enums = read_enumerations(files, config.enums.reduce((agg, name) => { agg[name] = true; return agg }, {}));

var ssiContents = "";
var jsContents = "";

files.forEach(({ folder, name }) => {
  const extention = path.extname(name);
  if (name != 'module.js' && extention == '.js') {
    const filePath = (folder + name).replaceAll('\\', '/');
    ssiContents += `<script type="text/javascript" src="/primitives/${filePath}"></script>\r\n`;

    const filePathLocal = filePath.substr(config.folder.length - 1);
    jsContents += "\r\n";
    jsContents += `\r\n/* ${filePathLocal}*/\r\n`;
    jsContents += fs.readFileSync(folder + name, "utf8");
  }
})

ssiContents += "\r\n";

const replacements = {};
const matches = jsContents.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);

/* find comments and store them in dictionary, this way we avoid replacements in comments */
matches.forEach((matched, index) => {
  const dummyComment = `/*Comment#${index}*/`;
  replacements[dummyComment] = matched;
  jsContents = jsContents.replaceAll(matched, dummyComment);
});


/* replace enumerations with their values */
for (var key in enums) {
  if (enums.hasOwnProperty(key)) {
    jsContents = jsContents.replace(new RegExp("\\b" + key + "\\b", 'g'), `${enums[key]}/*${key}*/`);
  }
}

/* find dummy comments and put back original comments */
for (var key in replacements) {
  if (replacements.hasOwnProperty(key)) {
    jsContents = jsContents.replaceAll(key, replacements[key]);
  }
}

// Wrap content into NPM module
const moduleFile = config.folder + 'module.js';
if (fs.existsSync(moduleFile)) {
  const placeholder = "//placeholder";
  const moduleText = fs.readFileSync(moduleFile, 'utf8');
  jsContents = moduleText.substring(0, moduleText.indexOf(placeholder)) + jsContents + moduleText.substring(moduleText.indexOf(placeholder) + placeholder.length);
}

// kill BOM
jsContents = jsContents.replaceAll('\uFEFF', '');

fs.writeFileSync(config.htmlfilename, ssiContents);
console.log('\x1b[33m%s\x1b[0m', config.htmlfilename);
fs.writeFileSync(config.jsfilename, jsContents);
console.log('\x1b[33m%s\x1b[0m', config.jsfilename);


function read_files(path, priorities) {
  var result = [];
  read_folder(path, (name, folder) => {
    result.push({
      folder,
      name
    });
  }, (first, second) => {
    const fp = priorities[first] || 0;
    const sp = priorities[second] || 0
    if (fp > 0 || sp > 0)
      return sp - fp;
    else
      return second.toUpperCase() > first.toUpperCase() ? -1 : 1;
  });
  return result;
}

function read_enumerations(files, enums) {
  var result = {};
  files.forEach(({ folder, name }) => {
    if (enums[name] != null) {
      result = {
        ...result,
        ...(getEnumValues(folder + name))
      }
    }
  });
  return result;
}

function getEnumValues(fileName) {
  const fileContent = fs.readFileSync(fileName, "utf8");
  let fileText = fileContent.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gi, () => {
    return '';
  });

  const chars = ['\uFEFF', "\n", "\r", "\t", " "];
  chars.forEach(item => {
    fileText = fileText.replaceAll(item, '');
  });

  const enumName = fileText.substring(0, fileText.indexOf("=")).trim();
  const enumLines = fileText.substring(fileText.indexOf("{") + 1, fileText.lastIndexOf("}"))
  const enums = enumLines.split(',').map(item => item.trim());

  return enums.reduce((agg, enumLine) => {
    const [enumItemName, enumItemValue] = enumLine.split(':');
    agg[enumName + "." + enumItemName] = enumItemValue;
    return agg;
  }, {});
}

function read_folder(folder, onItem, compare) {
  const items = fs.readdirSync(folder);
  const stats = items.reduce((agg, name) => {
    agg[name] = fs.lstatSync(folder + name);
    return agg;
  }, {});
  items.sort((first, second) => {
    if (stats[first].isDirectory()) {
      if (stats[second].isDirectory()) {
        return compare(first, second);
      } else {
        return -1;
      }
    } else {
      if (stats[second].isDirectory()) {
        return 1;
      } else {
        return compare(first, second);
      }
    }
  })
  items.forEach(name => {
    if (stats[name].isDirectory()) {
      read_folder(folder + name + "\\", onItem, compare);
    } else {
      onItem(name, folder);
    }
  });
}
