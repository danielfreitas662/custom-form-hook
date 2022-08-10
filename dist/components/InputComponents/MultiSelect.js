"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiSelect;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

require("./MultiSelect.scss");

var _filters = require("../../utils/filters");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MultiSelect(_ref) {
  let {
    options = [],
    placeholder,
    value = [],
    setValue,
    name,
    id,
    inputClasses,
    onChange = () => {}
  } = _ref;
  const [show, setShow] = (0, _react.useState)(false);
  const [classes, setClasses] = (0, _react.useState)('mselect-content');
  const [selectoptions, setSelectOptions] = (0, _react.useState)(options);
  const [typedValue, setTypedValue] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    if (show) setClasses('mselect-content visible');else setClasses('mselect-content');
  }, [show]);
  (0, _react.useEffect)(() => {
    onChange(value);
  }, [value]);
  (0, _react.useEffect)(() => {
    setSelectOptions(options);
  }, [options]);
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
        setTypedValue('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mselect-wrapper",
    ref: ref,
    id: "teste"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mselect-input-wrapper ".concat(inputClasses),
    onFocus: () => setShow(true)
  }, value.map((c, i) => {
    var _options$find;

    return /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: "selected-item",
      onClick: () => {
        setValue({
          target: {
            value: value.filter(v => v !== c),
            name: name
          }
        });
      }
    }, (_options$find = options.find(o => o.value === c)) === null || _options$find === void 0 ? void 0 : _options$find.label);
  }), /*#__PURE__*/_react.default.createElement("input", {
    className: "mselect-input",
    value: typedValue,
    placeholder: placeholder,
    id: id,
    onChange: e => {
      setSelectOptions((0, _filters.filterobject)(options, e.target.value));
      setTypedValue(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes,
    style: {}
  }, selectoptions.map(c => {
    let classes = 'mselect-option-item' + (value.includes(c.value) ? ' selected' : '');
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classes,
      key: c.value,
      onMouseDown: () => {
        if (value.includes(c.value)) {
          setValue({
            target: {
              value: value.filter(v => v !== c.value),
              name: name
            }
          });
        } else {
          setValue({
            target: {
              value: [...value, c.value],
              name: name
            }
          });
        }
      }
    }, c.label);
  }), selectoptions.length === 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "mselect-option-item"
  }, "Nenhum resultado")));
}