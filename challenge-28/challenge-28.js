(function () {
  'use strict';
  /*
    No HTML:
    - Crie um formulário com um input de texto que receberá um CEP e um botão
    de submit;
    - Crie uma estrutura HTML para receber informações de endereço:
    "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
    preenchidas com os dados da requisição feita no JS.
    - Crie uma área que receberá mensagens com o status da requisição:
    "Carregando, sucesso ou erro."

    No JS:
    - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
    deve ser limpo e enviado somente os números para a requisição abaixo;
    - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
    "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
    no input criado no HTML;
    - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
    com os dados recebidos.
    - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
    a mensagem: "Buscando informações para o CEP [CEP]..."
    - Se não houver dados para o CEP entrado, mostrar a mensagem:
    "Não encontramos o endereço para o CEP [CEP]."
    - Se houver endereço para o CEP digitado, mostre a mensagem:
    "Endereço referente ao CEP [CEP]:"
    - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
    adicionar as informações em tela.
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

  var $formCEP = new DOM('[data-js="form-cep"]');
  var $inputCEP = new DOM('[data-js="input-cep"]');
  var $logradouro = new DOM('[data-js="logradouro"]');
  var $bairro = new DOM('[data-js="bairro"]');
  var $estado = new DOM('[data-js="estado"]');
  var $cidade = new DOM('[data-js="cidade"]');
  var $cep = new DOM('[data-js="cep"]');
  var $status = new DOM('[data-js="status"]');
  var ajax = new XMLHttpRequest();
  $formCEP.on('submit', handeSubmitFormCEP);

  function handeSubmitFormCEP(event) {
    event.preventDefault();
    var url = getURL();
    console.log(url);
    ajax.open('GET', url);
    ajax.send();
    getMessage('loading');
    ajax.addEventListener('readystatechange', handleReadyStateChange);
  }

  function getURL() {
    return replaceCEP('https://ws.apicep.com/cep/[CEP].json');
  }

  function getClearCEP() {
    return $inputCEP.get()[0].value.replace(/\D/g, '');
  }

  function handleReadyStateChange() {
    if (isRequestOK()) {
      getMessage('ok');
      fillCEPFields();
    }
  }

  function isRequestOK() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function fillCEPFields() {
    var data = parseData();
    console.log(parseData());

    if (!data.ok) {
      getMessage('error');
      data = clearData();
    }

    $logradouro.get()[0].textContent = data.address;
    $bairro.get()[0].textContent = data.district;
    $estado.get()[0].textContent = data.state;
    $cidade.get()[0].textContent = data.city;
    $cep.get()[0].textContent = data.code;
  }

  function clearData() {
    return {
      address: '-',
      district: '-',
      state: '-',
      city: '-',
      code: '-',
    };
  }

  function parseData() {
    var result;

    try {
      result = JSON.parse(ajax.responseText);
    } catch (err) {
      result = null;
    }

    return result;
  }

  function getMessage(type) {
    var messages = {
      loading: 'Buscando informações para o CEP [CEP]...',
      ok: 'Endereço referente ao CEP [CEP]:',
      error: 'Não encontramos o endereço para o CEP [CEP].',
    };

    $status.get()[0].textContent = replaceCEP(messages[type]);
  }

  function replaceCEP(message) {
    return message.replace('[CEP]', getClearCEP());
  }
})();
