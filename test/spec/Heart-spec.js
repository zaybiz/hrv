var expect = require('chai').expect;
  let intervalArray = require('../data');

describe('Time Domain Measures:', function () {
  var Time = require('../../src/Time');
  it('should return a correct MRR value', () => {
    expect(Time.getMRR(intervalArray)).to.eql(936.6721044045677)
  });
  it('should return a correct pNN50 value', () => {
    expect(Time.getPNN(intervalArray,50)).to.eql(52.94117647058824)
  });
  it('should return a correct SDNN value', () => {
    expect(Time.getSDNN(intervalArray)).to.eql(195.72192501053422)
  });
  it('should return a correct RMSSD value', () => {
    expect(Time.getRMSSD(intervalArray)).to.eql(121.22900060726103)
  });
  it('should return a correct LogRMSSD10x2 value', () => {
    expect(Time.getLogRMSSD10x2(intervalArray)).to.eql(95.95362647900744)
  });
  it('should return a correct SDSD value', () => {
    expect(Time.getSDSD(intervalArray)).to.eql(121.22818590315995)
  });
  it('should return a correct MADRR value', () => {
    expect(Time.getMADRR(intervalArray)).to.eql(56)
  });
  it('should return a correct IRRR value', () => {
    expect(Time.getIRRR(intervalArray)).to.eql(100)
  });
});
