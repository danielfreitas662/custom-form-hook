"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./Radio.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RadioContext = /*#__PURE__*/(0, _react.createContext)();

function Radio(_ref) {
  let {
    children,
    value,
    onChange = () => {},
    id,
    name,
    setValue = () => {}
  } = _ref;
  const [selectedValue, setSelectedValue] = (0, _react.useState)(value);
  (0, _react.useEffect)(() => {
    setValue({
      target: {
        value: selectedValue,
        name: name
      }
    });
  }, [selectedValue]);
  return /*#__PURE__*/_react.default.createElement(RadioContext.Provider, {
    value: [selectedValue, setSelectedValue, onChange]
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "radio",
    id: id
  }, children));
}

function Option(_ref2) {
  let {
    children,
    value
  } = _ref2;
  const [selectedValue, setSelectedValue, onChange] = (0, _react.useContext)(RadioContext);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    onClick: () => {
      setSelectedValue(value);
      onChange(value);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "checkmark ".concat(selectedValue === value ? 'checked' : '')
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "white"
  })), /*#__PURE__*/_react.default.createElement("span", null, children));
}

Radio.Option = Option;
var _default = Radio;
exports.default = _default;