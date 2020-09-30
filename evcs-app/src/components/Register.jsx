import React from 'react';
import Joi from 'joi';
import Form from './common/Form';
import $ from 'jquery';

class Register extends Form {
  state = {
    data: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {}
  };

  schema = Joi.object({
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
      .min(5)
      .required()
      .messages({
         'string.empty': `"Password" cannot be empty`,
         'any.required': `"Password" is required`
      })
      .label('Password'),
    confirmPassword: Joi
      .string()
      .valid(Joi.ref('password'))
      .messages({
         'string.empty': `"Password" cannot be empty`,
         'any.only': `"Password" must match`
         })
      .label('Confirm Password')
  });

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
               aria-labelledby="RegisterModal" 
               aria-hidden="true"
               data-backdrop="static" 
               data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                  <h5 className="modal-title">Register</h5>
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
                     {this.renderInput('email', 'Email', 'email')}
                     {this.renderInput('password', 'Password', 'password')}
                     {this.renderInput('confirmPassword', 'Renter Password', 'password')}
                     {this.renderButton('Register')}
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
  }
}

export default Register;
