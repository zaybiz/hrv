module.exports = {
  onInhale(){
    if(this.props.onInhale){
      this.props.onInhale()
    }
    this._doInhale()
  },
  onInhaleHold(){
    if(this.props.onInhaleHold){
      this.props.onInhaleHold()
    }
    this._doInhaleHold()
  },
  onExhale(){
    if(this.props.onExhale){
      this.props.onExhale()
    }
    this._doExhale()
  },
  onExhaleHold(){
    if(this.props.onExhaleHold){
      this.props.onExhaleHold()
    }
    this._doExhaleHold()
  },
  getDefaultProps() {
    return {
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1,
    };
  },

};