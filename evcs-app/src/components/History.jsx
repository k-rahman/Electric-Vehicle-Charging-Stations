import React, {useRef} from 'react';
import {convertDateTime} from '../utils/dateTimeUtils';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import SearchBox from './common/SearchBox';

const History = (props) => {
  const userName = localStorage.getItem('name');
  const columns = [{
    path: 'date',
    label: 'Date',
    formateDate: item => convertDateTime(item)
  },
  {
    path: 'duration',
    label: 'Duration',
  },
  {
    path: 'cost',
    label: 'Cost',
    suffix: item => <span>{`€ ${item}`}</span>
  },
  {
    path: 'energy',
    label: 'Energy',
    prefix: item => <span>{`${item} kWh`}</span>
  },
  {
    path: 'name',
    label: 'Location'
  },
  ];

  const { 
      onModalClose,
     onValueChange, 
     searchQuery
  } = props;

  const modalRef = useRef();

  return (
    <Modal
      ref={modalRef}
      title={`${userName}'s History`}
      name='History'
      label='HistoryModal'
      onClose={onModalClose}
      showCloseButton={true}>
        <SearchBox
          value={searchQuery}
          onChange={onValueChange}
          placeholder='Search by location...' 
          className='sticky-top'
          />
      <Table
        columns={columns}
        data={props.data}
        className='table-hover text-center' />
    </Modal>
  );
}

export default History;