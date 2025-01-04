class DateFormatter {
  constructor(datetime) {
    this._datetime = new Date(datetime)
  }

  displayDate() {
    return this._formatDate() + ' ' + this._formatTime();
  }

  displayId() {
    return this._datetime.valueOf();
  }

  _formatDate() {
    return `${this._year}-${this._month}-${this._day}`;
  }

  _formatTime() {
    return `${this._hours}:${this._minutes}`;
  }

  get _year() {
    return this._padNumber(this._datetime.getFullYear());
  }

  get _month() {
    return this._padNumber(this._datetime.getMonth() + 1);
  }

  get _day() {
    return this._padNumber(this._datetime.getDate());
  }

  get _hours() {
    return this._padNumber(this._datetime.getHours());
  }

  get _minutes() {
    return this._padNumber(this._datetime.getMinutes());
  }

  _padNumber(number) {
    return number.toString().padStart(2, '0')
  }
}
