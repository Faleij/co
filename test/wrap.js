
var assert = require('assert');

var co = require('..');

function* noop(a, b, c) {}

describe('co.wrap(fn*)', function () {
  it('should pass context', function () {
    var ctx = {
      some: 'thing'
    };

    return co.wrap(function* () {
      assert.equal(ctx, this);
    }).call(ctx);
  })

  it('should pass arguments', function () {
    return co.wrap(function* (a, b, c) {
      assert.deepEqual([1, 2, 3], [a, b, c]);
    })(1, 2, 3);
  })

  it('should match arguments length', function () {
    assert(co.wrap(noop).length === noop.length);
  })

  it('should expose the underlying generator function', function () {
    var wrapped = co.wrap(noop);
    var source = Object.toString.call(wrapped.__generatorFunction__);
    assert(source.indexOf('function*') === 0);
  })
})
