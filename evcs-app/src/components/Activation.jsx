import React, {createRef} from 'react';
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

   doSubmit = () => {
      console.log('activate');
   };

   render() {
      return (
         <Modal
            ref={this.modalRef}
            title='Please enter outlet code to activate'
            label='activateModal'
            name='activate'
            onModalClose={this.props.onModalClose}>
            <form onSubmit={this.handlesubmit} noValidate>
               {this.renderInput('code', 'Activation Code', 'code')}
               {this.renderButton('Activate')}
            </form>
         </Modal>
      );
   }
}

export default Activation;