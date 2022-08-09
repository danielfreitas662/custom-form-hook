"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = useForm;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useForm() {
  let validatingOnChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  const [values, SetValues] = (0, _react.useState)({});
  const [errors, SetErrors] = (0, _react.useState)({});
  const [fields, setFields] = (0, _react.useState)({});
  const formRef = (0, _react.useRef)();

  const validate = fieldsValue => {
    let tempErrors = errors;

    if (Object.keys(fieldsValue).length > 0) {
      Object.keys(fieldsValue).forEach(field => {
        if (fields[field]) {
          fields[field].forEach(rule => {
            if (rule.required) {
              if (fieldsValue[field] === '' || fieldsValue[field] === null || fieldsValue[field] === undefined) {
                tempErrors[field] = rule.message;
              } else {
                tempErrors[field] = '';
              }

              SetErrors(tempErrors);
            }
          });
        }
      });
    }

    return Object.keys(tempErrors).every(x => tempErrors[x] == '');
  };

  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;

    if (typeof name === 'object') {
      let temp = values[name[0]];
      temp[name[1]] = _objectSpread(_objectSpread({}, temp[name[1]]), {}, {
        [name[2]]: value
      });
      SetValues(_objectSpread(_objectSpread({}, values), {}, {
        [name[0]]: temp
      }));
    } else {
      SetValues(_objectSpread(_objectSpread({}, values), {}, {
        [name]: value
      }));
      if (validatingOnChange) validate({
        [name]: value
      });
    }
  };

  const resetForm = initialValues => {
    SetValues(initialValues);
    SetErrors({});
  };

  const submit = () => {
    formRef.current.click();
  };

  return {
    fields,
    setFields,
    formRef,
    values,
    SetValues,
    errors,
    SetErrors,
    handleInputChange,
    resetForm,
    submit,
    validate
  };
}