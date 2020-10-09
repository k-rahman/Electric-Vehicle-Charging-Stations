import React, { Component, createRef } from 'react';
import Modal from './Modal';

class Monitor extends Component {
  state = {
    isRunning: false,
    timeElapsed: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
    cost: 0,
    energy: 0,
  }

  modalRef = createRef();

  componentWillUnmount() {
    clearInterval(this.update);
  }

  start = () => {
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 1000);
  }

  update = () => {
    const delta = Date.now() - this.startTime;
    const timeElapsed = this.state.timeElapsed + delta;

    const timeUnits = this.convertTime(timeElapsed);

    const energy = this.calculateEnergy(timeElapsed);
    const cost = this.claculateCost(timeElapsed, energy);

    this.setState({
      timeElapsed,
      hrs: timeUnits.hrs,
      mins: timeUnits.mins,
      secs: timeUnits.secs,
      energy,
      cost
    });

    this.startTime = Date.now();
  }

  toggle = () => {
    this.setState({ isRunning: !this.state.isRunning },
      () => {
        this.state.isRunning ? this.start() : clearInterval(this.timer)
      });
  }

  terminate = () => {

  }

  claculateCost = (timeElapsed, energy) => {
    if (this.props.outlet.unit === 'kWh')
      return Math.floor((energy * this.props.outlet.payment) * 100) / 100;

    return Math.floor(this.props.outlet.payment * ((timeElapsed / 1000 / 60) % 60) * 100) / 100;
  }

  calculateEnergy = timeElapsed => {
    return Math.floor((this.props.outlet.power * (timeElapsed / (1000 * 60 * 60)) % 24) * 100) / 100;
  }

  convertTime = timeElapsed => ({
     hrs: Math.floor((timeElapsed / (1000 * 60 * 60)) % 24),
     mins: Math.floor((timeElapsed / 1000 / 60) % 60),
     secs: Math.floor((timeElapsed / 1000) % 60),
   })

  addZero = (width, time) => {
    if (time.toString().length === width) {
      return time;
    }

    return '0' + time;
  }

  chargingControls = () => {
    const { isRunning, secs } = this.state;
    let text = !isRunning ? 'Start Charging' : 'Stop Charging';
    let chargeButton = <button className='btn btn-danger' onClick={this.toggle}>{text}</button>

    if (!isRunning && secs > 0) {
      chargeButton =
        <>
          <div>Are you sure you want to stop charging?</div>
          <button className='btn btn-success' onClick={this.toggle}>No</button>
          <button className='btn btn-danger' onClick={this.terminate}>Yes</button>
        </>
    }

    return chargeButton;
  }

  render() {
    const { hrs, mins, secs, cost, energy } = this.state;
    return (
      <Modal
        ref={this.modalRef}
        title='Info'
        label='monitorModal'
        name='monitor'
        onModalClose={this.props.onModalClose}
        showCloseButton={false}>
        <div>
          <span>{this.addZero(2, hrs)} : </span>
          <span>{this.addZero(2, mins)} : </span>
          <span>{this.addZero(2, secs)}</span>
        </div>
        <div>
          <span>cost {cost.toFixed(2)}</span>
        </div>
        <div>
          <span>energy {energy.toFixed(2)}</span>
        </div>
        {this.chargingControls()}
      </Modal>
    );
  }
}

export default Monitor;