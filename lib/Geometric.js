'use strict';

var _ = require('lodash');
var jStat = require('jStat').jStat;
var hist = require('histogramjs');

var GeometricMeasures = {
  getAll: function getAll(points) {
    var stats = {
      TINN: this.getTINN(points),
      RRTri: this.getRRTri(points)
    };
    return stats;
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
    var h = hist({ data: points, bins: vecthist });
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
    var h = hist({ data: points, bins: vecthist });
    var area = points.length * interval;
    var histValues = h.map(function (hist) {
      return hist.y;
    });
    var maxhist = jStat.max(histValues);
    var TINN = area / maxhist;
    var RRTri = points.length / maxhist;
    return RRTri;
  }
};

module.exports = GeometricMeasures;