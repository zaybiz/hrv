var _ = require('lodash');
// require('imports?this=>window')
var jStat = require('jStat');
var hist = require('histogramjs')

var HrvUtils = {
  getStats: function(points){
    var stats = {
      MHR: this.getMHR(points),
      NN50: this.getNN(points,50),
      pNN50: this.getPNN(points,50),
      NN20: this.getNN(points,20),
      pNN20: this.getPNN(points,20),
      MRR: this.getMRR(points),
      SDNN: this.getSDNN(points),
      RMSSD: this.getRMSSD(points),
      TINN: this.getTINN(points),
      RRTri: this.getRRTri(points),
      IRRR: this.getIRRR(points),
      MADRR: this.getMADRR(points),
    }
    return stats;
  },
  getIRRR: function(points){
    let diffs = jStat.diff(points)
    let quantiles = jStat.quartiles(diffs)
    return quantiles[2] - quantiles[0]
  },
  getMADRR: function(points){
    let diffs = jStat.diff(points)
    return jStat.median(jStat.abs(diffs))
  },
  getTINN: function(points){
    let interval = 7.8125;
    let minRR = jStat.min(points)
    let maxRR = jStat.max(points)
    let medRR = (minRR+maxRR)/2
    let lowhist = medRR - interval * Math.ceil((medRR - minRR)/interval)
    let longhist = parseInt(Math.ceil((maxRR - lowhist)/interval) + 1)
    let vecthist = _.range(longhist).map((i)=>{
      return lowhist+interval*i
    })
    // let h=np.histogram(points,vecthist)
    let h=hist({data:points,bins:vecthist})
    // let area = float(len(points)) * interval
    let area = points.length * interval
    let histValues = h.map((hist)=>{
      return hist.y;
    })
    let maxhist = jStat.max(histValues)
    let TINN = area/maxhist
    let RRTri = points.length/maxhist

    return TINN
  },
  getRRTri: function(points){
    let interval = 7.8125;
    let minRR = jStat.min(points)
    let maxRR = jStat.max(points)
    let medRR = (minRR+maxRR)/2
    let lowhist = medRR - interval * Math.ceil((medRR - minRR)/interval)
    let longhist = parseInt(Math.ceil((maxRR - lowhist)/interval) + 1)
    let vecthist = _.range(longhist).map((i)=>{
      return lowhist+interval*i
    })
    // let h=np.histogram(points,vecthist)
    let h=hist({data:points,bins:vecthist})
    // let area = float(len(points)) * interval
    let area = points.length * interval
    let histValues = h.map((hist)=>{
      return hist.y;
    })
    let maxhist = jStat.max(histValues)
    let TINN = area/maxhist
    let RRTri = points.length/maxhist

    return RRTri
  },
  getInstantHeartRate: function(intervalDuration){
    return 60/(intervalDuration/1024);
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
    var rrTotal=0;

    for (var i=1;i<points.length; i++) {
      rrTotal+=points[i];
    }

    var mrr = rrTotal/(points.length-1);
    return mrr;
  },

  getMHR: function(points){
    var MRR = this.getMRR(points);
    var MHR = (60000/MRR) ;
    return MHR;
  },

  getSDNN: function(points){
    var sdnnTotal=0;
    var MRR = this.getMRR(points);
    for (var i=1;i<points.length; i++) {
      sdnnTotal+=Math.pow(points[i] - MRR,2);
    }

    var SDNN = Math.sqrt(sdnnTotal/(points.length-1));
    return SDNN;
  },

  getRMSSD: function(points){
    var RMSSDTotal=0;
    for (var i=1;i<(points.length-1); i++) {
      RMSSDTotal+=Math.pow(points[i+1] - points[i],2);
    }

    var RMSSD = Math.sqrt(RMSSDTotal/(points.length-1));
    return RMSSD;
  },
}

module.exports = HrvUtils;
