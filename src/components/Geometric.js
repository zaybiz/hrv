var _ = require('lodash');
var jStat = require('jStat');
var hist = require('histogramjs')

var GeometricMeasures = {
  getAll: function(points){
    var stats = {
      TINN: this.getTINN(points),
      RRTri: this.getRRTri(points),
    }
    return stats;
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

    let h=hist({data:points,bins:vecthist})
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
}

module.exports = GeometricMeasures;
