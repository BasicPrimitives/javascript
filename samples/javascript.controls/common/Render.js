import { ControlType, ValueType } from './enums';
import { CaptionRender } from './Caption';
import { RadioBoxRender } from './RadioBox';
import { CheckBoxRender } from './CheckBox';
import { DropDownBoxRender } from './DropDownBox';
import { SizeRender } from './Size';
import { TextBoxRender } from './TextBox';
import { ColorRender } from './Color';
import { RangeRender } from './Range';

import { IntegerFormatter, StringFormatter, NumberFormatter, BooleanFormatter, SizeFormatter, ThicknessFormatter } from './Formatters';

import { isNullOrEmpty } from '../../../src/common';
import JsonML from '../../../src/common/jsonml-html';

export default function Render(panels, defaultValues) {
    this.renders = {};
    this.renders[ControlType.Caption] = new CaptionRender();
    this.renders[ControlType.RadioBox] = new RadioBoxRender();
    this.renders[ControlType.CheckBox] = new CheckBoxRender();
    this.renders[ControlType.DropDownBox] = new DropDownBoxRender();
    this.renders[ControlType.SizeBox] = new SizeRender();
    this.renders[ControlType.TextBox] = new TextBoxRender();
    this.renders[ControlType.ColorPicker] = new ColorRender();
    this.renders[ControlType.Range] = new RangeRender();
  
    this.formatters = {};
    this.formatters[ValueType.Integer] = IntegerFormatter;
    this.formatters[ValueType.String] = StringFormatter;
    this.formatters[ValueType.Number] = NumberFormatter;
    this.formatters[ValueType.Boolean] = BooleanFormatter;
    this.formatters[ValueType.Size] = SizeFormatter;
    this.formatters[ValueType.Thickness] = ThicknessFormatter;
  
    this.activePanel = "panel0";
    this.panels = panels;
    this.defaultValues = defaultValues;
  
    this.togglePanel = function(event) {
      if(this.activePanel !== null) {
        var element = document.getElementById(this.activePanel);
        element.setAttribute("class", "accordion-button collapsed");
        element.setAttribute("data-bs-toggle", "show");
        element.setAttribute("aria-expanded", "true");

        var panelElement = document.getElementById(element.getAttribute("aria-controls"))
        panelElement.setAttribute( "class", "accordion-collapse collapse" );
      }
      
      if(this.activePanel !== event.target.id) {
        this.activePanel = event.target.id;

        var element = document.getElementById(this.activePanel);
        element.setAttribute("class", "accordion-button");
        element.setAttribute("data-bs-toggle", "collapse");
        element.setAttribute("aria-expanded", "false");
  
        var panelElement = document.getElementById(element.getAttribute("aria-controls"))
        panelElement.setAttribute( "class", "accordion-collapse collapse show" );
      } else {
        this.activePanel = null;
      }
    }

    this.render = function (placeholder) {
      var self = this;
      var accordion = ["div",
        {
          "class": "accordion"
        }
      ];
  
      for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
        var panelConfig = this.panels[panelIndex];
        var panelId = "panel" + panelIndex;
        var isActivePanel  = panelId == this.activePanel;
  
        accordion.push(["div",
          {
            "class": "accordion-item",
            "id": "#accordionoptions"
          },
          ["h2",
            {
              "class": "accordion-header",
              "id": ("heading" + panelIndex)
            },
            ["button",
              {
                "class": "accordion-button" + (isActivePanel ? "" : " collapsed" ),
                "type": "button",
                "data-bs-toggle": (isActivePanel ? "collapse" : "show" ),
                "data-bs-target": ("#collapse" + panelIndex),
                "aria-expanded": (isActivePanel ? "true" : "false" ),
                "aria-controls": ("collapse" + panelIndex),
                "id": ("panel" + panelIndex),
                "$": function (element) { element.addEventListener("click", function(event) { self.togglePanel(event); }); }
              },
              panelConfig.caption
            ]
          ]
        ]);
        
        var content = ["div",
          {
            "class": "accordion-body"
          }
        ];
        var accordionbody = ["div",
          {
            "id": ("collapse" + panelIndex),
            "class": "accordion-collapse collapse" + (isActivePanel ? " show" : "" ),
            "aria-labelledby": ("heading" + panelIndex),
            "data-bs-parent": "#accordionoptions"
          },
          content
        ];
        accordion.push(accordionbody);
        for (var index = 0; index < panelConfig.items.length; index += 1) {
          var item = panelConfig.items[index];
          var render = this.renders[item.controlType];
          var defaulValue = isNullOrEmpty(panelConfig.namespace) ? this.defaultValues[item.id] : this.defaultValues[panelConfig.namespace][item.id];
  
          content.push(render.render(item, panelConfig.namespace || '', defaulValue));
        }
      }
  
      placeholder.appendChild(JsonML.toHTML(accordion));
    };
  
    this.getValues = function () {
      var result = {};
      for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
        var panelConfig = this.panels[panelIndex];
  
        var panelOptions = result;
        if (!isNullOrEmpty(panelConfig.namespace)) {
          if (!result.hasOwnProperty(panelConfig.namespace)) {
            result[panelConfig.namespace] = {};
          }
          panelOptions = result[panelConfig.namespace];
        }
  
        for (var index = 0; index < panelConfig.items.length; index += 1) {
          var item = panelConfig.items[index];
          var render = this.renders[item.controlType];
  
          if (render.getValue != null) {
            panelOptions[item.id] = render.getValue(item, panelConfig.namespace || '', this.formatters);
          }
        }
      }
      return result;
    };
  };