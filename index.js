
var Point = require("point");

function Isrc ( country, registrant, year, id ) {
  this.country = country;
  this.registrant = registrant;
  this.year = parseInt(year.toString().match(/\d{2}$/)[0]);
  this.id = Point.clamp(0, 99999, (parseInt(id) || 0));
}

Isrc.separator = "-";

Isrc.prettify = function ( str ) {
  return (str.substr(0, 2) + Isrc.separator 
    + str.substr(2, 3) + Isrc.separator
    + str.substr(5, 2) + Isrc.separator
    + str.substr(7, 5)
    ).toUpperCase();
}

Isrc.parse = function ( str ) {
  str = str.replace("-", "");
  return new Isrc(str.substr(0, 2), str.substr(3, 3), str.substr(5, 2), str.substr(7, 5));
}

Isrc.prototype.toString = function () {
  return this.stringify(this.id);
};

Isrc.prototype.next = function () {
  return new Isrc(this.country, this.registrant, this.year, this.id + 1);
};

Isrc.prototype.previous = function () {
  return new Isrc(this.country, this.registrant, this.year, this.id - 1);
};

Isrc.prototype.stringify = function ( id, separator ) {
  id = id.toString();
  separator = separator || "";
  while ( id.length < 5 ) {
    id = "0" + id;
  }
  return (this.country + separator
    + this.registrant + separator
    + this.year + separator 
    + id).toUpperCase();
};

Isrc.prototype.pretty = function () {
  return this.stringify(this.id, Isrc.separator);
};

module.exports = Isrc;