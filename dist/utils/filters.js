"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterobject = exports.filteredfilterValue = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filteredfilterValue = (filterValue, value, tipo) => {
  if (tipo === 'string') {
    return value ? value.toString().normalize().includes(filterValue.normalize()) : false;
  } else if (tipo === 'daterange') {
    if ((0, _moment.default)(value).isValid()) {
      if ((0, _moment.default)(value).isAfter(filterValue[0]) && (0, _moment.default)(value).isBefore(filterValue[1])) return true;else return false;
    } else return false;
  } else if (tipo === 'mes') {
    return (0, _moment.default)(value).isValid() ? (0, _moment.default)(value).month() === (0, _moment.default)(filterValue).month() && (0, _moment.default)(value).year() === (0, _moment.default)(filterValue).year() : false;
  } else if (tipo === 'customselect') {
    return value === filterValue;
  }
};

exports.filteredfilterValue = filteredfilterValue;

const filterobject = (data, value) => {
  if (!value) return data;else {
    let filtered = [];
    let values = value.split(' ');
    data.forEach(c => {
      const keys = Object.keys(c);
      if (values.every(v => {
        return keys.some(k => {
          if (k === 'id') return false;else {
            if (String(c[k]).normalize().includes(v.normalize())) return true;else return false;
          }
        });
      })) filtered.push(c);
    });
    return filtered;
  }
};

exports.filterobject = filterobject;
Object.defineProperty(String.prototype, 'normalize', {
  value: function normalize() {
    return this.toLowerCase().replace(/á|à|ã|â/, 'a').replace(/ç/, 'c').replace(/é|è|ê/, 'e').replace(/í|ì|ê/, 'i').replace(/ó|ò|õ|ô/, 'o').replace(/ú|ù|û/, 'u');
  },
  writable: true,
  configurable: true
});