(function () {
  'use strict';
  /*
    Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
    métodos semelhantes aos que existem no array, mas que sirvam para os
    elementos do DOM selecionados.
    Crie os seguintes métodos:
    - forEach, map, filter, reduce, reduceRight, every e some.

    Crie também métodos que verificam o tipo do objeto passado por parâmetro.
    Esses métodos não precisam depender de criar um novo elmento do DOM, podem
    ser métodos estáticos.

    Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
    no objeto, como nos exemplos abaixo:
    DOM.isArray([1, 2, 3]); // true
    DOM.isFunction(function() {}); // true
    DOM.isNumber('numero'); // false

    Crie os seguintes métodos para verificação de tipo:
    - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
    O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(elements) {
    // this.elements = this.getDOMElements(elements);
    this.elements = document.querySelectorAll(elements);
  }

  // DOM.prototype.getDOMElements = function getDOMElements(elements) {
  //   return document.querySelectorAll(elements);
  // };
  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.elements, function (element) {
      element.addEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.elements, function (element) {
      element.revemoEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.get = function get() {
    return this.elements;
  };

  // Crie os seguintes métodos:
  // - forEach, map, filter, reduce, reduceRight, every e some.

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.elements, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.elements, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.elements, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.elements, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.elements, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.elements, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.elements, arguments);
  };

  DOM.isArray = function isArray(param) {
    return Object.prototype.toString.call(param) === '[object Array]';
  };

  DOM.isFunction = function isFunction(param) {
    return Object.prototype.toString.call(param) === '[object Function]';
  };

  DOM.isNumber = function isNumber(param) {
    return Object.prototype.toString.call(param) === '[object Number]';
  };

  DOM.isString = function isString(param) {
    return Object.prototype.toString.call(param) === '[object String]';
  };

  DOM.isBoolean = function isBoolean(param) {
    return Object.prototype.toString.call(param) === '[object Boolean]';
  };

  DOM.isNull = function isNull(param) {
    return (
      Object.prototype.toString.call(param) === '[object Null]' ||
      Object.prototype.toString.call(param) === '[object Undefined]'
    );
  };

  var $a = new DOM('[data-js="link"]');
  var dataJs = $a.map(function (item) {
    return item.getAttribute('data-js');
  });

  console.log(DOM.isArray([1, 2, 3]));
  console.log(DOM.isArray([1, 2, 3]));
  console.log(DOM.isNull(null));
})();
