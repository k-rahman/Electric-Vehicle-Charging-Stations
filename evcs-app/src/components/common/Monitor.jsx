import React, { Component, createRef } from 'react';
import $ from 'jquery';
import { saveChargeInfo } from './../../services/historyService';
import { updateOutletStatus } from './../../services/outletService';
import { convertTime } from '../../utils/dateTimeUtils';
import { toast } from 'react-toastify';
import Modal from './Modal';
import styles from '../../assets/css/monitor.module.css';

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
    this.setState({ isRunning: true });
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

    let stopChargingBtn =
      <div className={`${styles.stop} row ml-2`}>
        <div className="col-9">
          <span >You can cancel the charging sequence by pressing the stop button.</span>
        </div>
        <div className="col">
          <button
            className={`${styles['stop-btn']} btn`}
            onClick={this.toggle}>{isRunning}Stop charging</button>
        </div>
      </div>

    if (!isRunning) {
      stopChargingBtn =
        <>
          <div className={`${styles.confirm} row ml-2`}>
            <div className="col-12">Are you sure you want to stop charging?</div>
          </div>
          <div className="row text-left ml-2">
            <div className='col-3'>
              <button className={`${styles['yes-btn']} btn`} onClick={this.terminate}>Yes</button>
            </div>
            <div className='col-3'>
              <button className={`${styles['no-btn']} btn`} onClick={this.toggle}>No</button>
            </div>
          </div>
        </>
    }

    return stopChargingBtn;
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
          <div className="row mt-3">
            <div className='row col-6 pl-4'>
              <div className={`${styles['time-title']} col-12`}>Time elapsed (hh:mm:ss)</div>
              <div className='w-100'></div>
              <div className={`${styles.time} col-12`}>
                <span>{this.addZero(2, hrs)} : </span>
                <span>{this.addZero(2, mins)} : </span>
                <span>{this.addZero(2, secs)}</span>
              </div>
            </div>
            <div className='row col-3 text-center'>
              <div className={`${styles.titles} col-12`}>Energy (kWh)</div>
              <div className="w-100"></div>
              <div className={`${styles.numbers} col-12`}>
                {energy.toFixed(2)}
              </div>
            </div>
            <div className='row col-4 text-right'>
              <div className={`${styles.titles} col-6`}>Cost</div>
              <div className="w-100"></div>
              <div className={`${styles.numbers} col-12`}>
                {cost.toFixed(2)} €
              </div>
            </div>
          </div>
          {this.chargingControls()}
        </>
      )
    }

    return (
      <>
        <div className='row text-center'>
          <div className={`${styles.titles} col-12`}>Your charging session cost</div>
          <div className="w-100"></div>
          <div className={`${styles.numbers} col-12`}>
            {cost.toFixed(2)} €
              </div>
        </div>
        <div className="row text-center mt-4">
          <div className='col-12'>
            <button
              name='closeMonitor'
              className={`${styles['close-btn']} btn`}
              onClick={this.handleMonitorClose}>Close</button>
          </div>
        </div>
        <div className="row text-center mt-1">
          <small className="col-12">Thank you for using our service. Remember to stay green!</small>
        </div>
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
        showCloseButton={false}
        width='750px'
      >
        {this.monitorState()}
      </Modal>
    );
  }
}

export default Monitor;