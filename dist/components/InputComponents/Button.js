"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Loading = _interopRequireDefault(require("../FeedBack Components/Loading"));

require("./Button.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(_ref) {
  let {
    children,
    onClick,
    icon,
    disabled,
    variant = 'primary',
    loading
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "button-wrapper ".concat(loading ? 'loading' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "button ".concat(variant, " ").concat(loading ? 'loading' : ''),
    type: "button",
    onClick: onClick,
    disabled: loading || disabled
  }, icon && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingRight: 5,
      fontSize: 'medium'
    }
  }, icon), /*#__PURE__*/_react.default.createElement("div", null, children)), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-spin"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-mask"
  }));
}

var _default = Button;
exports.default = _default;