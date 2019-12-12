(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["playground"] = factory();
	else
		root["App"] = root["App"] || {}, root["App"]["playground"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/playground.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/playground.ts":
/*!***************************!*\
  !*** ./src/playground.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Playground; });
class Playground {
  /**
   * @param config
   */
  constructor(config) {
    /**
     * Holder nodes
     */
    this.nodes = {
      area: null,
      input: null
    };
    this.crypto = config.cryptoSystem;
    this.socketServer = config.socketServer;

    if (!config.holder) {
      throw new Error('Please set holder');
    }

    this.holder = document.getElementById(config.holder);
    this.prepare();
  }
  /**
   * Prepare playground
   */


  prepare() {
    if (!this.holder) {
      throw new Error('something went wrong');
    }

    this.prepareNodes();
    this.startSocketConnection();
  }

  prepareNodes() {
    const area = this.holder.getElementsByClassName('container__message-area');
    this.nodes.area = area.item(0);
    const input = this.holder.getElementsByClassName('container__input');
    this.nodes.input = input.item(0);
    this.nodes.input.addEventListener('keydown', event => {
      if (event.keyCode !== 13) {
        return;
      }

      event.preventDefault();
      const message = this.nodes.input.textContent;
      console.log('Message is:', message);
      const cipherText = this.crypto.encrypt(message);
      console.log('Sending ]encrypted message:', cipherText);
      console.log('------------------------');
      this.ws.send(cipherText);
      this.nodes.input.textContent = '';
    }, false);
  }

  startSocketConnection() {
    this.ws = new WebSocket('ws://' + this.socketServer);

    this.ws.onmessage = message => {
      this.handleMessage(message);
    };
  }

  handleMessage(message) {
    const data = message.data;

    if (!data) {
      return;
    }

    console.log('Got new message:', data);
    const decrypted = this.crypto.decrypt(data);
    console.log('Decrypted message is:', decrypted);
    const messageElement = this.createMessage(decrypted);
    this.nodes.area.append(messageElement);
  }

  createMessage(content) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = 'Аноним:' + content;
    return message;
  }

}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=playground.js.map