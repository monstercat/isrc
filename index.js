
function Isrc ( opts ) {
  if (!(this instanceof Isrc)) return new Isrc(opts)
  this.country = opts.country || "CC";
  this.registrant = opts.registrant || "XXX";
  this.year = +opts.year || (new Date()).getFullYear();
  this.id = +opts.id || 0;
}

Isrc.separator = "-";

Isrc.parse = function ( value ) {
  if ( typeof value == "string" ) {
    str = value.replace(Isrc.separator, "");
    return new Isrc({
      country: str.substr(0, 2),
      registrant: str.substr(3, 3),
      year: str.substr(5, 2),
      id: str.substr(7, 5)
    });
  }

  return new Isrc(value);
};

Isrc.parseYear = function ( year ) {
  return parseInt(year.toString().match(/\d{2}$/)[0]);
};

Isrc.prototype.toString = function () {
  return this.stringify(this.id);
};

Isrc.prototype.toObject = function () {
  return {
    country: this.country,
    registrant: this.registrant,
    year: this.year,
    id: this.id
  };
};

Isrc.prototype.clone = function ( id ) {
  var o = this.toObject();
  o.id = id || o.id;
  return new Isrc(o);
};

Isrc.prototype.next = function () {
  return this.clone(this.id + 1);
};

Isrc.prototype.previous = function () {
  return this.clone(this.id - 1);
};

Isrc.prototype.stringify = function ( id, separator ) {
  id = id != null? id.toString() : this.id.toString();
  separator = separator || "";
  while ( id.length < 5 ) {
    id = "0" + id;
  }
  return (this.country + separator
    + this.registrant + separator
    + Isrc.parseYear(this.year) + separator
    + id).toUpperCase();
};

module.exports = Isrc;
