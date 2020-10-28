/**
 * @preserve Basic Primitives Diagrams v5.9.2
 * Copyright (c) 2013 - 2020 Basic Primitives Inc
 *
 * Non-commercial - Free
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * Commercial and government licenses:
 * http://www.basicprimitives.com/pdf/license.pdf
 *
 */
/* File: Basic Primitives (primitives.latest.js)*/
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return (root.primitives = factory());
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = (root.primitives = factory());
  } else {
    root.primitives = factory();
  }
}(this, function () {

  //placeholder

  return primitives;
}));