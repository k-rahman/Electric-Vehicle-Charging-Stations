import React, { Component, createRef } from 'react';
import $ from 'jquery';
import { saveChargeInfo } from './../../services/historyService';
import { updateOutletStatus, getOutletById } from './../../services/outletService';
import { convertTime } from '../../utils/dateTimeUtils';
import { toast } from 'react-toastify';
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
    showFinalResult: false,
  }

  modalRef = createRef();

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  start = () => {
    this.chargeTimeDate = new Date();
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 1000);
    this.setState({isRunning: true});
  }

  update = () => {
    const delta = Date.now() - this.startTime;
    const timeElapsed = this.state.timeElapsed + delta;

    const timeUnits = convertTime(timeElapsed);

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

  terminate = async () => {
    try {
      const { data: success } = 
        await saveChargeInfo(this.DataToSave());
      if (success) {
        const { status } = await updateOutletStatus(this.props.outlet);
        if (status === 204) {
          this.setState({ showFinalResult: true });
          const {data: outlet} = await getOutletById(this.props.outlet.id);
          this.props.checkStatus(outlet);
          console.log('check status called')
        }
      }
    }
    catch (ex) {
      if (ex.response && (ex.response.status === 400 || ex.response.status === 500)) {
        this.setState({ showFinalResult: false });
        toast.dark('Something went wrong try again.');
      }
    }
  }

  claculateCost = (timeElapsed, energy) => {
    if (this.props.outlet.unit === 'kWh')
      return Math.floor((energy * this.props.outlet.payment) * 100) / 100;

    return Math.floor(this.props.outlet.payment * ((timeElapsed / 1000 / 60) % 60) * 100) / 100;
  }

  calculateEnergy = timeElapsed => {
    return Math.floor((this.props.outlet.power * (timeElapsed / (1000 * 60 * 60)) % 24) * 100) / 100;
  }

  addZero = (width, time) => {
    if (time.toString().length === width) {
      return time;
    }

    return '0' + time;
  }

  chargingControls = () => {
    const { isRunning } = this.state;
    let chargeButton = 
    <button 
      className='btn btn-danger' 
      onClick={this.toggle}>{isRunning}StopCharging</button>

    if (!isRunning) {
      chargeButton =
        <>
          <div>Are you sure you want to stop charging?</div>
          <button className='btn btn-success' onClick={this.toggle}>No</button>
          <button className='btn btn-danger' onClick={this.terminate}>Yes</button>
        </>
    }

    return chargeButton;
  }

  DataToSave = () => ({
    time: this.chargeTimeDate.toISOString().slice(0, 19).replace('T', ' '),
    duration: Math.floor(this.state.timeElapsed / 1000),
    energy: this.state.energy,
    cost: this.state.cost,
    user: localStorage.getItem('userId'),
    location: this.props.selectedLocation.id,
  });

  monitorState = () => {
    const { hrs, mins, secs, cost, energy } = this.state;

    if (!this.state.showFinalResult) {
      return (
        <>
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
        </>
      )
    }

    return (
      <>
        <div>Final cost {cost.toFixed(2)}</div>
        <button
          name='closeMonitor'
          onClick={this.handleMonitorClose}>Close</button>
      </>
    )
  }

  handleMonitorClose = () => {

    $(this.modalRef.current).modal('hide');
    this.props.onMonitorClose();
  }

  render() {
    return (
      <Modal
        ref={this.modalRef}
        title='Charging screen'
        label='monitorModal'
        name='monitor'
        showCloseButton={false}>
        {this.monitorState()}
      </Modal>
    );
  }
}

export default Monitor;