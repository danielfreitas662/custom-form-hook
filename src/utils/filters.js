import moment from 'moment';
export const filteredfilterValue = (filterValue, value, tipo) => {
  if (tipo === 'string') {
    return value ? value.toString().normalize().includes(filterValue.normalize()) : false;
  } else if (tipo === 'daterange') {
    if (moment(value).isValid()) {
      if (moment(value).isAfter(filterValue[0]) && moment(value).isBefore(filterValue[1])) return true;
      else return false;
    } else return false;
  } else if (tipo === 'mes') {
    return moment(value).isValid()
      ? moment(value).month() === moment(filterValue).month() && moment(value).year() === moment(filterValue).year()
      : false;
  } else if (tipo === 'customselect') {
    return value === filterValue;
  }
};

export const filterobject = (data, value) => {
  if (!value) return data;
  else {
    let filtered = [];
    let values = value.split(' ');
    data.forEach((c) => {
      const keys = Object.keys(c);
      if (
        values.every((v) => {
          return keys.some((k) => {
            if (k === 'id') return false;
            else {
              if (String(c[k]).normalize().includes(v.normalize())) return true;
              else return false;
            }
          });
        })
      )
        filtered.push(c);
    });
    return filtered;
  }
};

Object.defineProperty(String.prototype, 'normalize', {
  value: function normalize() {
    return this.toLowerCase()
      .replace(/á|à|ã|â/, 'a')
      .replace(/ç/, 'c')
      .replace(/é|è|ê/, 'e')
      .replace(/í|ì|ê/, 'i')
      .replace(/ó|ò|õ|ô/, 'o')
      .replace(/ú|ù|û/, 'u');
  },
  writable: true,
  configurable: true,
});
