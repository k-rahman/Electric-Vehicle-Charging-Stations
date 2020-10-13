import React, { Component, createRef } from 'react';
import $ from 'jquery';
import { saveChargeInfo } from '../services/historyService';
import { updateOutletStatus } from '../services/outletService';
import { convertTime } from '../utils/dateTimeUtils';
import { toast } from 'react-toastify';
import Modal from './common/Modal';
import ChargingStates from './monitorUI/ChargingStates';
import FinalCost from './monitorUI/FinalCost';
import Processing from './common/Processing';
import styles from '../assets/css/monitor.module.css';
import StopChargingBtn from './monitorUI/StopChargingBtn';
import Confirmation from './monitorUI/Confirmation';

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
    this.timeout = setTimeout(() => this.start(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.update);
    clearTimeout(this.timeout);
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
    const cost = this.calculateCost(timeElapsed, energy);

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

  DataToSave = () => ({
    time: this.chargeTimeDate.toISOString().slice(0, 19).replace('T', ' '),
    duration: Math.floor(this.state.timeElapsed / 1000),
    energy: this.state.energy,
    cost: this.state.cost,
    user: localStorage.getItem('userId'),
    location: this.props.selectedLocation.id,
  });

  calculateCost = (timeElapsed, energy) => {
    if (this.props.outlet.unit === 'kWh')
      return Math.floor((energy * this.props.outlet.payment) * 100) / 100;

    return Math.floor(this.props.outlet.payment * ((timeElapsed / 1000 / 60)) * 100) / 100;
  }

  calculateEnergy = timeElapsed => {
    return Math.floor((this.props.outlet.power * (timeElapsed / (1000 * 60 * 60))) * 100) / 100;
  }

  handleMonitorClose = () => {
    $(this.modalRef.current).modal('hide');
    this.props.onMonitorClose();
  }

  chargingControls = () => {
    const { isRunning } = this.state;

    let stopChargingBtn =
      <StopChargingBtn
        isRunning={isRunning}
        onStopClick={this.toggle} />

    if (!isRunning) {
      stopChargingBtn =
        <Confirmation
          onYesClick={this.terminate}
          onNoClick={this.toggle} />
    }

    return stopChargingBtn;
  }

  monitorState = () => {
    const { hrs, mins, secs, cost, energy } = this.state;

    if (!this.state.showFinalResult) {
      return (
        <>
          <ChargingStates
            time={{ hrs, mins, secs }}
            cost={cost}
            energy={energy} />
          {this.chargingControls()}
        </>
      )
    }

    return (
      <FinalCost
        cost={cost}
        onMonitorClose={this.handleMonitorClose} />
    )
  }

  monitorHeader = () => {
    const { showFinalResult, isRunning, timeElapsed } = this.state;
    if (!showFinalResult && isRunning && timeElapsed > 0)
      return <span className={styles.charging}>Charging</span>;

    return 'Charging screen';
  }

  render() {
    const { timeElapsed } = this.state;
    return (
      <Modal
        ref={this.modalRef}
        title={this.monitorHeader()}
        label='monitorModal'
        name='monitor'
        showCloseButton={false}
        width='750px'
      >
        {(timeElapsed > 0) && this.monitorState()}
        {(timeElapsed === 0) && <Processing />}
      </Modal>
    );
  }
}

export default Monitor;