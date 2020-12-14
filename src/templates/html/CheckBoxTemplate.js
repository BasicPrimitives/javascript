export default function CheckBoxTemplate(selectCheckBoxLabel) {
  var _template = ["div",
    ["label",
      ["nobr",
        ["input",
          {
            "type": "checkbox",
            "name": "checkbox",
            "class": "bp-selectioncheckbox"
          }
        ],
        '\xa0',
        ["span",
          {
            "name": "selectiontext",
            "class": "bp-selectiontext"
          },
          selectCheckBoxLabel
        ]
      ]
    ]
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultCheckBoxTemplate";
  }

  function render(event, data) {
    var checkBox = data.element.firstChild.firstChild.firstChild;
    checkBox.checked = data.isSelected;
    checkBox.setAttribute("data-id", data.id);
    var label = data.element.firstChild.firstChild.childNodes[2];
    label.setAttribute("data-id", data.id);
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};