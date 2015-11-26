'use strict';

var _ = require('lodash');
var jStat = require('jStat').jStat;
var hist = require('histogramjs');

var TimeMeasures = {
  getAll: function getAll(points) {
    var stats = {
      MHR: this.getMHR(points),
      NN50: this.getNN(points, 50),
      pNN50: this.getPNN(points, 50),
      NN20: this.getNN(points, 20),
      pNN20: this.getPNN(points, 20),
      MRR: this.getMRR(points),
      SDNN: this.getSDNN(points),
      SDSD: this.getSDSD(points),
      RMSSD: this.getRMSSD(points),
      LogRMSSD10x2: this.getLogRMSSD10x2(points),
      IRRR: this.getIRRR(points),
      MADRR: this.getMADRR(points)
    };
    return stats;
  },
  getIRRR: function getIRRR(points) {
    var diffs = jStat.diff(points);
    var quartiles = jStat.quartiles(diffs);
    return quartiles[2] - quartiles[0];
  },
  getMADRR: function getMADRR(points) {
    var diffs = jStat.diff(points);
    return jStat.median(jStat.abs(diffs));
  },
  getNN: function getNN(points, diff) {
    var nn = 0;
    points.forEach(function (val, i, points) {
      //Nothing to do on first RR Interval
      if (i === 0) return;
      var pointDiff = Math.abs(points[i] - points[i - 1]);
      if (pointDiff > diff) {
        nn += 1;
      }
    });
    return nn;
  },
  getPNN: function getPNN(points, diff) {
    var nn = this.getNN(points, diff);
    var pNN = nn / (points.length - 1) * 100;
    return pNN;
  },
  getMRR: function getMRR(points) {
    return jStat.mean(points);
  },
  getMHR: function getMHR(points) {
    var MRR = this.getMRR(points);
    var MHR = 60000 / MRR;
    return MHR;
  },
  getSDNN: function getSDNN(points) {
    return jStat.stdev(points);
  },
  getSDSD: function getSDSD(points) {
    var diffs = jStat.diff(points);
    return jStat.stdev(diffs);
  },
  getRMSSD: function getRMSSD(points) {
    var diffs = jStat.diff(points);
    var diffsSquared = jStat.pow(diffs, 2);
    var rmssd = Math.sqrt(jStat.mean(diffsSquared));
    return rmssd;
  },
  getLogRMSSD10x2: function getLogRMSSD10x2(points) {
    return 10 * 2 * Math.log(this.getRMSSD(points));
  }
};

module.exports = TimeMeasures;