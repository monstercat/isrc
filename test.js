
var test = require('tape');
var ISRC = require('./');

test('isrc.next works', function (t) {
  t.plan(2);

  var isrc = ISRC({
    country: 'CA',
    registrant: '6D2',
    year: 2015
  })

  t.equal(isrc.stringify(), "CA6D21500000")
  isrc = isrc.next()
  t.equal(isrc.stringify(), "CA6D21500001")
});
