import React, {createRef} from 'react';
import {activate} from '../services/activateService';
import $ from 'jquery';
import Joi from 'joi';
import Form from './common/Form';
import Modal from './common/Modal';

class Activation extends Form {
   state = {
      data: { code: '' },
      errors: {}
   };

   modalRef = createRef();

   schema = Joi.object({
      code: Joi
         .string()
         .required()
         .min(4)
         .max(4)
         .messages({
            'string.empty': `Please enter outlet code.`,
            'string.min': `Activation code has to be 4 characters long.`,
            'string.max': `Activation code has to be 4 characters long.`,
            'any.required': `Please enter outlet code to start charging.`
         })
         .label('Activation Code'),
   });

   doSubmit = async () => {
      const { code } = this.state.data;
      const { id: locationId } = this.props.selectedLocation;
      try {
         const {data: outlet} = await activate(code, locationId);
         if (outlet)
         {
            $(this.modalRef.current).modal('hide');
            this.props.onStartCharging(outlet[0]);
            this.props.onModalClose();
         }
      }catch(ex){
         if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.code = ex.response.data;
            this.setState({errors});
         }
      }
   };

   render() {
      return (
         <Modal
            ref={this.modalRef}
            title='Please enter outlet code to activate'
            label='activateModal'
            name='activate'
            onModalClose={this.props.onModalClose}
            showCloseButton={true}
            >
            <form onSubmit={this.handlesubmit} noValidate>
               {this.renderInput('code', 'Activation Code', 'code')}
               {this.renderButton('Activate')}
            </form>
         </Modal>
      );
   }
}

export default Activation;