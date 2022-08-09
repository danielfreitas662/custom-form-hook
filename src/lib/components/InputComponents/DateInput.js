import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import './DateInput.scss';

function DateInput({ placeholder, value, setValue, name, id, inputClasses, fullWidth, style = {} }) {
  const [viewCalendar, setViewCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(value) || new Date());
  const [date, setDate] = useState(new Date());
  const [today] = useState(new Date());
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  const [inputText, setInputText] = useState(
    value ? `${zeroPad(value.getDate(), 2)}/${zeroPad(value.getMonth() + 1, 2)}/${value.getFullYear()}` : ''
  );
  const ref = useRef();
  useEffect(() => {
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
  useEffect(() => {
    if (!viewCalendar) {
      checkDate();
    }
  }, [viewCalendar]);
  useEffect(() => {
    //console.log(inputText);
  }, [inputText]);
  const months = [
    { long: 'Janeiro', short: 'Jan' },
    { long: 'Fevereiro', short: 'Fev' },
    { long: 'Março', short: 'Mar' },
    { long: 'Abril', short: 'Abr' },
    { long: 'Maio', short: 'Mai' },
    { long: 'Junho', short: 'Jun' },
    { long: 'Julho', short: 'Jul' },
    { long: 'Agosto', short: 'Ago' },
    { long: 'Setembro', short: 'Set' },
    { long: 'Outubro', short: 'Out' },
    { long: 'Novembro', short: 'Nov' },
    { long: 'Dezembro', short: 'Dez' },
  ];
  const weekDays = [
    { long: 'Domingo', short: 'Dom' },
    { long: 'Segunda', short: 'Seg' },
    { long: 'Terça', short: 'Ter' },
    { long: 'Quarta', short: 'Qua' },
    { long: 'Quinta', short: 'Qui' },
    { long: 'Sexta', short: 'Sex' },
    { long: 'Sábado', short: 'Sab' },
  ];
  const getMonthDays = (date) => {
    const amount = 40 - new Date(date.getFullYear(), date.getMonth(), 40).getDate();
    const days = new Array(amount);
    for (let i = 1; i <= amount; i++) {
      days[i] = { day: i, weekday: weekDays[new Date(date.getFullYear(), date.getMonth(), i).getDay()] };
    }
    return days;
  };

  const formatDate = (date) => {
    return `${zeroPad(date.getDate(), 2)}/${zeroPad(date.getMonth() + 1, 2)}/${date.getFullYear()}`;
  };
  const checkDate = () => {
    let parts = inputText.split('/');
    if (!moment(`${zeroPad(parts[0], 2)}/${zeroPad(Number(parts[1]), 2)}/${parts[2]}`, 'DD/MM/YYYY').isValid()) {
      setDate(new Date());
      setInputText('');
      setValue({ target: { value: '', name: name } });
    }
  };
  const handleInputChange = (e) => {
    let tempValue = e.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1');
    setInputText(tempValue);
    if (tempValue === '') {
      setValue({ target: { value: '', name: name } });
    }
    if (tempValue.match(/\d{2}\/\d{2}\/\d{4}/g) !== null) {
      let parts = tempValue.split('/');
      let newDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      if (moment(`${zeroPad(parts[0], 2)}/${zeroPad(Number(parts[1]), 2)}/${parts[2]}`, 'DD/MM/YYYY').isValid()) {
        setDate(newDate);
        setSelectedDate(newDate);
        setValue({ target: { value: newDate, name: name } });
      }
    }
  };
  return (
    <div
      ref={ref}
      className={`input-wrapper ${inputClasses}`}
      style={{ ...style, display: fullWidth ? 'flex' : 'inline-flex' }}
      onFocus={() => {
        setViewCalendar(true);
      }}
    >
      <input
        className="input-date"
        value={inputText}
        name={name}
        id={id}
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <div className={`calendar-container ${viewCalendar ? 'visible' : ''}`}>
        <div className="calendar-menu">
          <button
            type="button"
            className="btn-year"
            onClick={() => setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1))}
          >
            {'<<'}
          </button>
          <button
            type="button"
            className="btn-month"
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
          >
            {'<'}
          </button>
          <div className="current-date">
            <div>{date && date.getFullYear()}</div>
            <div>{date && months[date.getMonth()].short}</div>
          </div>
          <button
            type="button"
            className="btn-month"
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
          >
            {'>'}
          </button>
          <button
            type="button"
            className="btn-year"
            onClick={() => setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1))}
          >
            {'>>'}
          </button>
        </div>
        <hr />
        <div className="week-days">
          {weekDays.map((c) => (
            <div className="weekday">{c.short[0]}</div>
          ))}
        </div>
        <div className="calendar-days">
          {getMonthDays(date).map((d, i) => (
            <div
              onClick={() => {
                let newDate = new Date(date.getFullYear(), date.getMonth(), d.day);
                setInputText(formatDate(newDate));
                setSelectedDate(newDate);
                setValue({ target: { value: newDate, name: name } });
                setViewCalendar(false);
              }}
              style={{ gridColumnStart: d.day === 1 ? weekDays.indexOf(d.weekday) + 1 : 0 }}
              className={`day ${d.day === 1 ? 'day1' : ''} ${d?.weekday?.short} ${
                new Date(date.getFullYear(), date.getMonth(), d.day).valueOf() ===
                new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf()
                  ? 'today'
                  : ''
              } ${
                new Date(date.getFullYear(), date.getMonth(), d.day).valueOf() ===
                new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).valueOf()
                  ? 'selected'
                  : ''
              }`}
            >
              {d.day}
            </div>
          ))}
        </div>
        <hr />
        <div className="bottom">
          <button
            type="button"
            className="btn-today"
            onClick={() => {
              setInputText(formatDate(new Date()));
              setSelectedDate(new Date());
              setDate(new Date());
              setValue({ target: { value: new Date(), name: name } });
            }}
          >
            Hoje
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateInput;
