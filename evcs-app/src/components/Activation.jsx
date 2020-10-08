import React from 'react';
import $ from 'jquery';
import Joi from 'joi';
import Form from './common/Form';

class Activation extends Form {
   state = {
      data: { code: ''},
      errors: {}
   };

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

   modal = React.createRef();

   componentDidMount() {
      $(this.modal.current).modal('show');
   };

   doSubmit = () => {
     console.log('activate');

   };

  render() {
  return ( 
         <div
            ref={this.modal}
            className="modal" tabIndex="-1"
            aria-labelledby="activateModal"
            aria-hidden="true"
            data-backdrop="static"
            data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Please enter outlet code to activate</h5>
                     <button
                        type="button"
                        className="close"
                        name='activate'
                        onClick={this.props.onModalClose}
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <form onSubmit={this.handlesubmit} noValidate>
                     <div className="modal-body">
                        {this.renderInput('code', 'Activation Code', 'code')}
                        {this.renderButton('Activate')}
                     </div>
                  </form>
               </div>
            </div>
         </div>
   );
  }
}
 
export default Activation;