import React from 'react';
import Joi from 'joi';
import Form from './common/Form';
import $ from 'jquery';
import 'bootstrap/js/dist/modal.js';

class LoginForm extends Form {
   constructor(props) {
      super(props);
      
      this.state = {
         data: { email: '', password: '' },
         errors: {}
      };

      this.schema = Joi.object({
         email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
               'string.email': `"Email" must be valid. ex: 'name@domain.com'`,
               'string.empty': `"Email" cannot be empty`,
               'any.required': `"Email" is required`
            })
            .label('Email'),
         password: Joi
            .string()
            .required()
            .messages({
               'string.empty': `"Password" cannot be empty`,
               'any.required': `"Password" is required`
            })
            .label('Password')
      });
   }


   modal = React.createRef();

   componentDidMount() {
      $(this.modal.current).modal('show');
   }

   handleModalClose = () => {
      this.props.history.push('/');
   }

   doSubmit = () => {
      console.log('Submitted');
   };

   render() {
      return (
            <div 
               ref={this.modal}
               className="modal" tabIndex="-1" 
               aria-labelledby="LoginModal" 
               aria-hidden="true"
               data-backdrop="static" 
               data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                  <h5 className="modal-title">Login</h5>
                  <button 
                     type="button" 
                     className="close" 
                     onClick={this.handleModalClose} 
                     data-dismiss="modal" 
                     aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                        <form onSubmit={this.handlesubmit} noValidate>
                  <div className="modal-body">
                           {this.renderInput('email', 'Email')}
                           {this.renderInput('password', 'Password', 'password')}
                           {this.renderButton('Login')}
                  </div>
                        </form>
               </div>
            </div>
            </div>
      )
   }
}

export default LoginForm;
