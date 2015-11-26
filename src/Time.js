var _ = require('lodash');
var jStat = require('jStat').jStat;
var hist = require('histogramjs')

var TimeMeasures = {
  getAll: function(points){
    var stats = {
      MHR: this.getMHR(points),
      NN50: this.getNN(points,50),
      pNN50: this.getPNN(points,50),
      NN20: this.getNN(points,20),
      pNN20: this.getPNN(points,20),
      MRR: this.getMRR(points),
      SDNN: this.getSDNN(points),
      SDSD: this.getSDSD(points),
      RMSSD: this.getRMSSD(points),
      LogRMSSD10x2: this.getLogRMSSD10x2(points),
      IRRR: this.getIRRR(points),
      MADRR: this.getMADRR(points),
    }
    return stats;
  },
  getIRRR: function(points){
    let diffs = jStat.diff(points)
    let quartiles = jStat.quartiles(diffs)
    return quartiles[2] - quartiles[0]
  },
  getMADRR: function(points){
    let diffs = jStat.diff(points)
    return jStat.median(jStat.abs(diffs))
  },
  getNN: function(points,diff){
    var nn = 0;
    points.forEach(function(val,i,points){
      //Nothing to do on first RR Interval
      if(i === 0) return;
      var pointDiff = Math.abs(points[i]-points[i-1]);
      if(pointDiff > diff){
        nn += 1;
      }
    })
    return nn;
  },
  getPNN: function(points,diff){
    var nn = this.getNN(points,diff);
    var pNN = (nn/(points.length -1)) * 100;
    return pNN;
  },
  getMRR: function(points){
    return jStat.mean(points)
  },
  getMHR: function(points){
    var MRR = this.getMRR(points);
    var MHR = (60000/MRR) ;
    return MHR;
  },
  getSDNN: function(points){
    return jStat.stdev(points)
  },
  getSDSD: function(points){
    let diffs = jStat.diff(points)
    return jStat.stdev(diffs)
  },
  getRMSSD: function(points){
    let diffs = jStat.diff(points)
    let diffsSquared = jStat.pow(diffs,2)
    let rmssd = Math.sqrt(jStat.mean(diffsSquared))
    return rmssd;
  },
  getLogRMSSD10x2: function(points){
    return 10*2*Math.log(this.getRMSSD(points));
  },
}

module.exports = TimeMeasures;
