"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _ai = require("react-icons/ai");

require("./TextInput.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TextInput(_ref) {
  let {
    placeholder,
    type = 'text',
    value,
    setValue,
    name,
    id,
    inputClasses,
    fullWidth,
    style = {}
  } = _ref;
  const [show, setShow] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "input-text-wrapper ".concat(inputClasses),
    style: _objectSpread(_objectSpread({}, style), {}, {
      display: fullWidth ? 'flex' : 'inline-flex'
    })
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "input-text-input",
    value: value,
    name: name,
    id: id,
    type: type === 'password' ? show ? 'text' : 'password' : 'text',
    placeholder: placeholder,
    onChange: setValue
  }), type === 'password' && /*#__PURE__*/_react.default.createElement("div", {
    className: "input-text-eye"
  }, show && /*#__PURE__*/_react.default.createElement(_ai.AiFillEye, {
    onClick: () => setShow(!show)
  }), !show && /*#__PURE__*/_react.default.createElement(_ai.AiFillEyeInvisible, {
    onClick: () => setShow(!show)
  })));
}

var _default = TextInput;
exports.default = _default;