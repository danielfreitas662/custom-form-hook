"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.match.js");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

require("./DateInput.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DateInput(_ref) {
  let {
    placeholder,
    value,
    setValue,
    name,
    id,
    inputClasses,
    fullWidth,
    style = {}
  } = _ref;
  const [viewCalendar, setViewCalendar] = (0, _react.useState)(false);
  const [selectedDate, setSelectedDate] = (0, _react.useState)(new Date(value) || new Date());
  const [date, setDate] = (0, _react.useState)(new Date());
  const [today] = (0, _react.useState)(new Date());

  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const [inputText, setInputText] = (0, _react.useState)(value ? "".concat(zeroPad(value.getDate(), 2), "/").concat(zeroPad(value.getMonth() + 1, 2), "/").concat(value.getFullYear()) : '');
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setViewCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, inputText]);
  (0, _react.useEffect)(() => {
    if (!viewCalendar) {
      checkDate();
    }
  }, [viewCalendar]);
  (0, _react.useEffect)(() => {//console.log(inputText);
  }, [inputText]);
  const months = [{
    long: 'Janeiro',
    short: 'Jan'
  }, {
    long: 'Fevereiro',
    short: 'Fev'
  }, {
    long: 'Março',
    short: 'Mar'
  }, {
    long: 'Abril',
    short: 'Abr'
  }, {
    long: 'Maio',
    short: 'Mai'
  }, {
    long: 'Junho',
    short: 'Jun'
  }, {
    long: 'Julho',
    short: 'Jul'
  }, {
    long: 'Agosto',
    short: 'Ago'
  }, {
    long: 'Setembro',
    short: 'Set'
  }, {
    long: 'Outubro',
    short: 'Out'
  }, {
    long: 'Novembro',
    short: 'Nov'
  }, {
    long: 'Dezembro',
    short: 'Dez'
  }];
  const weekDays = [{
    long: 'Domingo',
    short: 'Dom'
  }, {
    long: 'Segunda',
    short: 'Seg'
  }, {
    long: 'Terça',
    short: 'Ter'
  }, {
    long: 'Quarta',
    short: 'Qua'
  }, {
    long: 'Quinta',
    short: 'Qui'
  }, {
    long: 'Sexta',
    short: 'Sex'
  }, {
    long: 'Sábado',
    short: 'Sab'
  }];

  const getMonthDays = date => {
    const amount = 40 - new Date(date.getFullYear(), date.getMonth(), 40).getDate();
    const days = new Array(amount);

    for (let i = 1; i <= amount; i++) {
      days[i] = {
        day: i,
        weekday: weekDays[new Date(date.getFullYear(), date.getMonth(), i).getDay()]
      };
    }

    return days;
  };

  const formatDate = date => {
    return "".concat(zeroPad(date.getDate(), 2), "/").concat(zeroPad(date.getMonth() + 1, 2), "/").concat(date.getFullYear());
  };

  const checkDate = () => {
    let parts = inputText.split('/');

    if (!(0, _moment.default)("".concat(zeroPad(parts[0], 2), "/").concat(zeroPad(Number(parts[1]), 2), "/").concat(parts[2]), 'DD/MM/YYYY').isValid()) {
      setDate(new Date());
      setInputText('');
      setValue({
        target: {
          value: '',
          name: name
        }
      });
    }
  };

  const handleInputChange = e => {
    let tempValue = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1');
    setInputText(tempValue);

    if (tempValue === '') {
      setValue({
        target: {
          value: '',
          name: name
        }
      });
    }

    if (tempValue.match(/\d{2}\/\d{2}\/\d{4}/g) !== null) {
      let parts = tempValue.split('/');
      let newDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

      if ((0, _moment.default)("".concat(zeroPad(parts[0], 2), "/").concat(zeroPad(Number(parts[1]), 2), "/").concat(parts[2]), 'DD/MM/YYYY').isValid()) {
        setDate(newDate);
        setSelectedDate(newDate);
        setValue({
          target: {
            value: newDate,
            name: name
          }
        });
      }
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: "input-wrapper ".concat(inputClasses),
    style: _objectSpread(_objectSpread({}, style), {}, {
      display: fullWidth ? 'flex' : 'inline-flex'
    }),
    onFocus: () => {
      setViewCalendar(true);
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "input-date",
    value: inputText,
    name: name,
    id: id,
    type: "text",
    onChange: handleInputChange,
    placeholder: placeholder
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-container ".concat(viewCalendar ? 'visible' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-menu"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn-year",
    onClick: () => setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1))
  }, '<<'), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn-month",
    onClick: () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }, '<'), /*#__PURE__*/_react.default.createElement("div", {
    className: "current-date"
  }, /*#__PURE__*/_react.default.createElement("div", null, date && date.getFullYear()), /*#__PURE__*/_react.default.createElement("div", null, date && months[date.getMonth()].short)), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn-month",
    onClick: () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }, '>'), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn-year",
    onClick: () => setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1))
  }, '>>')), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
    className: "week-days"
  }, weekDays.map(c => /*#__PURE__*/_react.default.createElement("div", {
    className: "weekday"
  }, c.short[0]))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-days"
  }, getMonthDays(date).map((d, i) => {
    var _d$weekday;

    return /*#__PURE__*/_react.default.createElement("div", {
      onClick: () => {
        let newDate = new Date(date.getFullYear(), date.getMonth(), d.day);
        setInputText(formatDate(newDate));
        setSelectedDate(newDate);
        setValue({
          target: {
            value: newDate,
            name: name
          }
        });
        setViewCalendar(false);
      },
      style: {
        gridColumnStart: d.day === 1 ? weekDays.indexOf(d.weekday) + 1 : 0
      },
      className: "day ".concat(d.day === 1 ? 'day1' : '', " ").concat(d === null || d === void 0 ? void 0 : (_d$weekday = d.weekday) === null || _d$weekday === void 0 ? void 0 : _d$weekday.short, " ").concat(new Date(date.getFullYear(), date.getMonth(), d.day).valueOf() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf() ? 'today' : '', " ").concat(new Date(date.getFullYear(), date.getMonth(), d.day).valueOf() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).valueOf() ? 'selected' : '')
    }, d.day);
  })), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
    className: "bottom"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn-today",
    onClick: () => {
      setInputText(formatDate(new Date()));
      setSelectedDate(new Date());
      setDate(new Date());
      setValue({
        target: {
          value: new Date(),
          name: name
        }
      });
    }
  }, "Hoje"))));
}

var _default = DateInput;
exports.default = _default;