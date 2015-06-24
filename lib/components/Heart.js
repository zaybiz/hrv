'use strict';

var _ = require('lodash');
var jStat = require('jStat').jStat;
var hist = require('histogramjs');
var Statistics = {
  maximum: function maximum(points) {
    return jStat.max(points);
  },
  minimum: function minimum(points) {
    return jStat.min(points);
  }
};
var HrvUtils = {
  getStats: function getStats(points) {
    var stats = {
      MHR: this.getMHR(points).toFixed(2),
      NN50: this.getNN(points, 50).toFixed(2),
      pNN50: this.getPNN(points, 50).toFixed(2),
      NN20: this.getNN(points, 20).toFixed(2),
      pNN20: this.getPNN(points, 20).toFixed(2),
      MRR: this.getMRR(points).toFixed(2),
      SDNN: this.getSDNN(points).toFixed(2),
      RMSSD: this.getRMSSD(points).toFixed(2),
      TINN: this.getTINN(points),
      RRTri: this.getRRTri(points),
      IRRR: this.getIRRR(points),
      MADRR: this.getMADRR(points)
    };
    return stats;
  },
  getIRRR: function getIRRR(points) {
    var diffs = jStat.diff(points);
    var quantiles = jStat.quartiles(diffs);
    console.log(diffs);
    return quantiles[2] - quantiles[0];
  },
  getMADRR: function getMADRR(points) {
    var diffs = jStat.diff(points);
    return jStat.median(jStat.abs(diffs));
  },
  getTINN: function getTINN(points) {
    var interval = 7.8125;
    var minRR = jStat.min(points);
    var maxRR = jStat.max(points);
    var medRR = (minRR + maxRR) / 2;
    var lowhist = medRR - interval * Math.ceil((medRR - minRR) / interval);
    var longhist = parseInt(Math.ceil((maxRR - lowhist) / interval) + 1);
    var vecthist = _.range(longhist).map(function (i) {
      return lowhist + interval * i;
    });
    // let h=np.histogram(points,vecthist)
    var h = hist({ data: points, bins: vecthist });
    // let area = float(len(points)) * interval
    var area = points.length * interval;
    var histValues = h.map(function (hist) {
      return hist.y;
    });
    var maxhist = jStat.max(histValues);
    var TINN = area / maxhist;
    var RRTri = points.length / maxhist;

    return TINN;
  },
  getRRTri: function getRRTri(points) {
    var interval = 7.8125;
    var minRR = jStat.min(points);
    var maxRR = jStat.max(points);
    var medRR = (minRR + maxRR) / 2;
    var lowhist = medRR - interval * Math.ceil((medRR - minRR) / interval);
    var longhist = parseInt(Math.ceil((maxRR - lowhist) / interval) + 1);
    var vecthist = _.range(longhist).map(function (i) {
      return lowhist + interval * i;
    });
    // let h=np.histogram(points,vecthist)
    var h = hist({ data: points, bins: vecthist });
    // let area = float(len(points)) * interval
    var area = points.length * interval;
    var histValues = h.map(function (hist) {
      return hist.y;
    });
    var maxhist = jStat.max(histValues);
    var TINN = area / maxhist;
    var RRTri = points.length / maxhist;

    return RRTri;
  },
  getInstantHeartRate: function getInstantHeartRate(intervalDuration) {
    return 60 / (intervalDuration / 1024);
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
    var rrTotal = 0;

    for (var i = 1; i < points.length; i++) {
      rrTotal += points[i];
    }

    var mrr = rrTotal / (points.length - 1);
    return mrr;
  },

  getMHR: function getMHR(points) {
    var MRR = this.getMRR(points);
    var MHR = 60000 / MRR;
    return MHR;
  },

  getSDNN: function getSDNN(points) {
    var sdnnTotal = 0;
    var MRR = this.getMRR(points);
    for (var i = 1; i < points.length; i++) {
      sdnnTotal += Math.pow(points[i] - MRR, 2);
    }

    var SDNN = Math.sqrt(sdnnTotal / (points.length - 1));
    return SDNN;
  },

  getRMSSD: function getRMSSD(points) {
    var RMSSDTotal = 0;
    for (var i = 1; i < points.length - 1; i++) {
      RMSSDTotal += Math.pow(points[i + 1] - points[i], 2);
    }

    var RMSSD = Math.sqrt(RMSSDTotal / (points.length - 1));
    return RMSSD;
  }
};

module.exports = HrvUtils;