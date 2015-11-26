const expect = require('chai').expect;
const intervalArray = require('../data');
const Geometric = require('../../src/Geometric');

describe('Geometric Measures:', function () {
  it('should return a correct TINN value', () => {
    expect(Geometric.getTINN(intervalArray)).to.eql(319.2708333333333)
  });
  it('should return a correct RRTri value', () => {
    expect(Geometric.getRRTri(intervalArray)).to.eql(40.86666666666667)
  });
});
