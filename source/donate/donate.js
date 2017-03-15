(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.donate = global.donate || {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function initJQuery(jQuery) {
  jQuery = jQuery || window.$;
  if (!jQuery) {
    throw 'jQuery not found!';
  }
  jQuery.fn.initDonate = function (options) {
    var el = this[0];
    return initDonate(_extends({}, options, {
      el: el
    }));
  };
}

function buildQueryString(params) {
  var keys = params && Object.keys(params);
  if (!keys || !keys.length) return '';
  return '?' + keys.map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
}

/**
 * @param {Object} options
 *   - account: {String} email address
 */
function buildPayPal(options) {
  var params = {
    cmd: '_donations',
    no_shipping: 1,
    lc: 'US',
    currency_code: 'USD',
    business: options.account
  };
  var url = 'https://www.paypal.com/cgi-bin/webscr' + buildQueryString(params);
  return {
    image: options.image,
    text: options.text || 'PayPal',
    onClick: function onClick(donate) {
      window.open(url);
    }
  };
}

/**
 * @param {Object} options
 *   - qrcode: {String} | {HTMLElement}
 */
function buildQR(options) {
  var qrcode = options.qrcode;

  if (typeof qrcode === 'string') {
    var url = qrcode;
    qrcode = new Image();
    qrcode.src = url;
  }
  return {
    image: options.image,
    text: options.text,
    onClick: function onClick(donate) {
      donate.popup(qrcode);
    }
  };
}

function buildAliPay(options) {
  return buildQR(_extends({
    text: 'AliPay'
  }, options));
}

function buildWeChatPay(options) {
  return buildQR(_extends({
    text: 'WeChat Pay'
  }, options));
}

/**
 * @param {Object} options
 *   - el: container element
 *   - paypal: {URL} paypal
 *
 */
function initDonate(options) {
  var el = options.el,
      paypal = options.paypal,
      alipay = options.alipay,
      wechatpay = options.wechatpay,
      logo = options.logo;

  if (typeof el === 'string') el = document.querySelector(el);
  el.classList.add('donate-widget');

  var wrap = createElement('div', { class: 'donate-wrap' });
  el.appendChild(wrap);
  if (logo && logo.image) {
    var logoEl = createElement('div', { class: 'donate-logo' });
    logoEl.appendChild(createElement('img', { src: logo.image }));
    if (logo.text) {
      var div = createElement('div');
      div.textContent = logo.text;
      logoEl.appendChild(div);
    }
    wrap.appendChild(logoEl);
  }

  var panel = createElement('div', { class: 'donate-panel' });
  wrap.appendChild(panel);
  var services = [];
  paypal && services.push(buildPayPal(paypal));
  alipay && services.push(buildAliPay(alipay));
  wechatpay && services.push(buildWeChatPay(wechatpay));
  services.forEach(function (service) {
    var child = createElement('div', { class: 'donate-item' });
    var content = void 0;
    if (service.image) {
      content = createElement('img', { src: service.image });
    } else {
      content = createElement('span');
      content.textContent = service.text;
    }
    child.appendChild(content);
    service.onClick && child.addEventListener('click', function (e) {
      service.onClick(donate);
    }, false);
    panel.appendChild(child);
  });

  var popup = createElement('div', { class: 'donate-popup' });
  el.appendChild(popup);
  popup.addEventListener('click', function (e) {
    setPopup();
  }, false);

  function setPopup(content) {
    if (!content) {
      el.classList.remove('donate-popup-active');
    } else {
      el.classList.add('donate-popup-active');
      if (typeof content === 'string') {
        popup.innerHTML = content;
      } else {
        popup.innerHTML = '';
        popup.appendChild(content);
      }
    }
  }

  var donate = {
    popup: setPopup
  };
  return donate;
}

function createElement(tag, attrs) {
  var el = document.createElement(tag);
  attrs && Object.keys(attrs).forEach(function (key) {
    el.setAttribute(key, attrs[key]);
  });
  return el;
}

exports.initJQuery = initJQuery;
exports.initDonate = initDonate;

Object.defineProperty(exports, '__esModule', { value: true });

})));
