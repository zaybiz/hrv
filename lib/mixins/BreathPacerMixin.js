"use strict";

module.exports = {
  onInhale: function onInhale() {
    if (this.props.onInhale) {
      this.props.onInhale();
    }
    this._doInhale();
  },
  onInhaleHold: function onInhaleHold() {
    if (this.props.onInhaleHold) {
      this.props.onInhaleHold();
    }
    this._doInhaleHold();
  },
  onExhale: function onExhale() {
    if (this.props.onExhale) {
      this.props.onExhale();
    }
    this._doExhale();
  },
  onExhaleHold: function onExhaleHold() {
    if (this.props.onExhaleHold) {
      this.props.onExhaleHold();
    }
    this._doExhaleHold();
  },
  getDefaultProps: function getDefaultProps() {
    return {
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1
    };
  }

};