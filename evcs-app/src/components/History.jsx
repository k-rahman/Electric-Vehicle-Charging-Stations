import React, { useRef } from 'react';
import { convertDateTime } from '../utils/dateTimeUtils';
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
    data,
    searchQuery
  } = props;

  const modalRef = useRef();

  return (
    <Modal
      ref={modalRef}
      title={`${userName}'s History`}
      name='History'
      label='HistoryModal'
      width='700px'
      position='modal-dialog-centered'
      onModalClose={onModalClose}
      showCloseButton={true}>
      {!data.length
        ? <div className="text-center">You have no history yet!</div>
        : <>
          <SearchBox
            value={searchQuery}
            onChange={onValueChange}
            placeholder='Search by location...'
            className='sticky-top'
          />
          <Table
            columns={columns}
            data={data}
            className='table-hover text-center table-striped' />
        </>}
    </Modal>
  );
}

export default History;