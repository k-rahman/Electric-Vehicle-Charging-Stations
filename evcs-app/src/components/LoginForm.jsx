import React from 'react';
import $ from 'jquery';
import Joi from 'joi';
import 'bootstrap/js/dist/modal.js';
import { login } from '../services/authService';
import Form from './common/Form';

class LoginForm extends Form {

   state = {
      data: { email: '', password: '' },
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
         .required()
         .messages({
            'string.empty': `"Password" cannot be empty`,
            'any.required': `"Password" is required`
         })
         .label('Password')
   });


   modal = React.createRef();

   componentDidMount() {
      $(this.modal.current).modal('show');
   }

   doSubmit = async() => {
      try {
      const { data } = this.state;
      const {data: user} = await login(data.email, data.password);
      localStorage.setItem('name', user[0].name);
      window.location.reload();
       if (user) {
         $(this.modal.current).modal('hide');
         this.props.onModalClose();
         }
       }
       catch (ex) {
          if (ex.response && ex.response.status === 400) {
             const errors = {...this.state.errors};
             errors.email = ex.response.data;
             this.setState({errors});
          }
       }
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
                        name='Login'
                        onClick={this.props.onModalClose}
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
