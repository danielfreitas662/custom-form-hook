"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Select;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./Select.scss");

var _ai = require("react-icons/ai");

var _uuid = require("uuid");

var _filters = require("../../utils/filters");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Select(_ref) {
  var _options$find;

  let {
    options = [],
    placeholder,
    value,
    setValue,
    name,
    id,
    inputClasses,
    allowClear = false,
    onChange = value => {}
  } = _ref;
  const [show, setShow] = (0, _react.useState)(false);
  const [classes, setClasses] = (0, _react.useState)('select-dropdown');
  const [selectoptions, setSelectOptions] = (0, _react.useState)(options);
  const [typedValue, setTypedValue] = (0, _react.useState)((_options$find = options.find(c => c.value === value)) === null || _options$find === void 0 ? void 0 : _options$find.label);
  const [position, setPosition] = (0, _react.useState)({
    top: 45
  });
  const ref = (0, _react.useRef)();
  const componentRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (show) setClasses('select-dropdown visible');else setClasses('select-dropdown');
  }, [show]);
  const dpcID = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const el = componentRef.current.getBoundingClientRect();

    if (el.y + 200 > screenHeight) {
      setPosition({
        top: el.y - 200
      });
    } else {
      setPosition({
        top: el.y + 30
      });
    }
  }, [window, show, componentRef]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'select-input-wrapper ' + inputClasses,
    ref: componentRef
  }, /*#__PURE__*/_react.default.createElement("input", {
    value: typedValue,
    className: 'select-input-element',
    autoComplete: true,
    name: name,
    id: id,
    ref: ref,
    onFocus: () => setShow(true),
    onBlur: () => {
      setSelectOptions(options);
      setShow(false);

      if (options.find(c => c.label === value || c.value === value) === undefined) {
        setValue({
          target: {
            value: null,
            name: name
          }
        });
      }

      setTypedValue(options.find(c => c.value === value).label);
    },
    placeholder: placeholder,
    onChange: e => {
      setTypedValue(e.target.value);
      setSelectOptions((0, _filters.filterobject)(options, e.target.value));
    }
  }), value && allowClear && /*#__PURE__*/_react.default.createElement(_ai.AiOutlineClose, {
    style: {
      cursor: 'pointer'
    },
    onClick: () => {
      setTypedValue('');
      onChange(null);
      setValue({
        target: {
          value: null,
          name: name
        }
      });
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: 'select-input-icon' + (show ? ' show' : '')
  }, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineDown, {
    onClick: () => {
      if (show) {
        setShow(false);
      } else {
        ref.current.focus();
      }
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    ref: dpcID,
    className: classes,
    style: position
  }, selectoptions.map(c => {
    let classes = 'select-option-item' + (c.value === value ? ' selected' : '');
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classes,
      key: c.value,
      onMouseDown: () => {
        onChange(c.value);
        setTypedValue(c.label);
        setValue({
          target: {
            value: c.value,
            name: name
          }
        });
      }
    }, c.label);
  }), selectoptions.length === 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "select-empty"
  }, "Nenhum resultado")));
}