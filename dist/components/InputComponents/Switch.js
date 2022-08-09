"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./Switch.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Switch(_ref) {
  let {
    children,
    value = false,
    onChange = () => {},
    id,
    name,
    setValue
  } = _ref;
  const [v, setV] = (0, _react.useState)(value);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "switch"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-button ".concat(v ? 'on' : 'off'),
    id: id,
    onClick: () => {
      onChange(!v);
      setV(!v);
      setValue({
        target: {
          value: !v,
          name: name
        }
      });
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-indicator"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-label"
  }, children));
}

var _default = Switch;
exports.default = _default;