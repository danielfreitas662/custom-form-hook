"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = Form;
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

require("./FormField.scss");

var _flat = _interopRequireDefault(require("flat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FormContext = /*#__PURE__*/_react.default.createContext();

const FormListContext = /*#__PURE__*/_react.default.createContext();

function useForm() {
  let initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  const toPlain = v => {
    return (0, _flat.default)(v, {
      delimiter: ','
    });
  };

  const toNested = v => {
    return _flat.default.unflatten(v, {
      delimiter: ','
    });
  };

  const valuesReducer = (state, data) => {
    let tempValues = toNested(state);
    tempValues = _objectSpread(_objectSpread({}, tempValues), data);
    return toPlain(tempValues);
  };

  const [values, SetValues] = (0, _react.useReducer)(valuesReducer, toPlain(initialValues));
  const [errors, SetErrors] = (0, _react.useState)({});
  const [fields, SetFields] = (0, _react.useState)({});
  const formRef = (0, _react.useRef)();

  const submit = () => {
    formRef.current.click();
  };

  const getValues = () => {
    return toNested(values);
  };

  return {
    fields,
    getValues,
    SetFields,
    formRef,
    values,
    SetValues,
    errors,
    SetErrors,
    submit,
    toPlain,
    toNested
  };
}

function Form(_ref) {
  let {
    children,
    form,
    onFinish = () => {},
    labelCol = 10,
    wrapperCol = 14,
    colon = false,
    onChange = () => {},
    name = '',
    layout = 'vertical',
    validatingOnChange = true
  } = _ref;

  const validate = fieldsValue => {
    let tempErrors = form.errors;
    Object.keys(fieldsValue).map(c => tempErrors[c] = []);

    if (Object.keys(fieldsValue).length > 0) {
      Object.keys(fieldsValue).forEach(field => {
        if (form.fields[field]) {
          form.fields[field].forEach(rule => {
            if (rule.required) {
              if (fieldsValue[field] === '' || fieldsValue[field] === null || fieldsValue[field] === undefined || fieldsValue[field].length === 0) {
                tempErrors[field] = [...tempErrors[field], rule.message];
              }
            }

            if (rule.pattern) {
              console.log(fieldsValue[field], rule.pattern.test(fieldsValue[field]));

              if (!RegExp(rule.pattern).test(fieldsValue[field])) {
                tempErrors[field] = [...tempErrors[field], rule.message];
              }
            }
          });
        }
      });
      form.SetErrors(_objectSpread({}, tempErrors));
    }

    return Object.keys(tempErrors).every(x => tempErrors[x] == '');
  };

  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;

    if (typeof name === 'object') {
      let temp = form.values[name[0]];
      temp[name[1]] = _objectSpread(_objectSpread({}, temp[name[1]]), {}, {
        [name[2]]: value
      });
      form.SetValues(_objectSpread(_objectSpread({}, form.values), {}, {
        [name[0]]: temp
      }));
    } else {
      form.SetValues(_objectSpread(_objectSpread({}, form.values), {}, {
        [name]: value
      }));
      if (validatingOnChange) validate({
        [name]: value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let v = {};
    Object.keys(form.fields).forEach(c => v[c] = form.values[c]);
    validate(v);
    const validation = validate(v);

    if (validation) {
      onFinish(form.toNested(form.values));
    }
  };

  return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
    value: {
      labelCol,
      wrapperCol,
      colon,
      onChange,
      layout,
      form,
      handleInputChange
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    name: name
  }, children, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    ref: form.formRef,
    hidden: true,
    onClick: handleSubmit
  }, "Teste")));
}

function FormField(_ref2) {
  let {
    children,
    name,
    type,
    label,
    required,
    fullWidth,
    rules = [{
      required: false,
      message: ''
    }, {
      pattern: '',
      message: ''
    }, {
      custom: () => {},
      message: ''
    }]
  } = _ref2;

  const context = _react.default.useContext(FormContext);

  const listcontext = _react.default.useContext(FormListContext);

  if (context) {
    var _form$errors, _form$errors$name, _form$errors2, _form$errors$name2, _form$errors3, _form$errors$name3;

    const {
      labelCol,
      wrapperCol,
      colon,
      layout,
      form,
      handleInputChange
    } = context;
    const labelSize = 100 * labelCol / 24;
    const wrapperSize = 100 * wrapperCol / 24;
    const fieldid = (0, _uuid.v4)();
    (0, _react.useEffect)(() => {
      let fields = form.fields;

      if (listcontext) {
        let tempName = [listcontext, ...name];
        fields[tempName] = rules;
      } else {
        fields[name] = rules;
      }

      form.SetFields(fields);
    }, [form.fields]);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "formfield-wrapper",
      style: {
        display: layout === 'vertical' ? 'block' : 'flex'
      },
      id: "formfield-".concat(fieldid)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "formfield-label ".concat(required ? 'required' : '', " ").concat(colon ? 'colon' : ''),
      style: {
        flex: "1 0 calc(".concat(labelSize, "%)"),
        textAlign: layout === 'vertical' ? '' : 'end'
      }
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: "form-item-".concat(name),
      className: "".concat(required ? 'required' : '', " ").concat(colon ? 'colon' : '')
    }, label)), /*#__PURE__*/_react.default.createElement("div", {
      className: "formfield-field",
      style: {
        flex: "1 0 ".concat(wrapperSize, "%")
      }
    }, /*#__PURE__*/_react.default.isValidElement(children) && /*#__PURE__*/_react.default.cloneElement(children, {
      setValue: handleInputChange,
      value: listcontext ? form.values[[listcontext, ...name]] : form.values[name],
      name: listcontext ? [listcontext, ...name] : name,
      id: "form-item-".concat(listcontext ? [listcontext, ...name] : name),
      inputClasses: (listcontext ? (_form$errors = form.errors[[listcontext, ...name]]) === null || _form$errors === void 0 ? void 0 : _form$errors.length : (_form$errors$name = form.errors[name]) === null || _form$errors$name === void 0 ? void 0 : _form$errors$name.length) > 0 ? ' error' : '',
      fullWidth: fullWidth ? true : false,
      type: type
    }), (listcontext ? (_form$errors2 = form.errors[[listcontext, ...name]]) === null || _form$errors2 === void 0 ? void 0 : _form$errors2.length : (_form$errors$name2 = form.errors[name]) === null || _form$errors$name2 === void 0 ? void 0 : _form$errors$name2.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
      className: (listcontext ? (_form$errors3 = form.errors[[listcontext, ...name]]) === null || _form$errors3 === void 0 ? void 0 : _form$errors3.length : (_form$errors$name3 = form.errors[name]) === null || _form$errors$name3 === void 0 ? void 0 : _form$errors$name3.length) > 0 ? 'helper error' : 'helper'
    }, (listcontext ? form.errors[[listcontext, ...name]] : form.errors[name]).map(c => /*#__PURE__*/_react.default.createElement("div", null, c)))));
  } else {
    throw new Error('FormField is not wrapped in a Form provider');
  }
}

const List = _ref3 => {
  let {
    name,
    children
  } = _ref3;

  const context = _react.default.useContext(FormContext);

  if (!context) {
    throw new Error('Form List is not wrapped in a Form provider');
  } else {
    const {
      labelCol,
      wrapperCol,
      colon,
      layout,
      form,
      handleInputChange
    } = context;

    const addItem = item => {
      let newvalues = form.toNested(form.values);
      newvalues[name] = [...newvalues[name], item];
      form.SetValues(_objectSpread({}, form.toPlain(newvalues))); //form.SetValues({ ...form.values, [name]: '' });
    };

    const removeItem = fieldName => {
      let newfields = form.fields;
      let names = Object.keys(form.fields);
      names.forEach(c => {
        let slice = c.split(',');

        if (slice[0] === name && slice[1] === fieldName) {
          delete newfields[c];
        }
      });
      let newvalues = form.toNested(form.values);
      newvalues[name] = newvalues[name].filter((c, i) => fieldName != i);
      form.SetValues(_objectSpread({}, form.toPlain(newvalues)));
      form.SetFields(_objectSpread({}, newfields));
    };

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "formlist"
    }, /*#__PURE__*/_react.default.createElement(FormListContext.Provider, {
      value: name
    }, children(Object.keys(form.toNested(form.values)[name]).map((c, i) => {
      return {
        key: c,
        index: i
      };
    }), {
      addItem,
      removeItem
    })));
  }
};

Form.Field = FormField;
Form.List = List;
Form.useForm = useForm;
var _default = Form;
exports.default = _default;