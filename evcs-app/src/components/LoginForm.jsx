import React, {createRef} from 'react';
import $ from 'jquery';
import Joi from 'joi';
import { login } from '../services/authService';
import Modal from './common/Modal';
import Form from './common/Form';
import 'bootstrap/js/dist/modal.js';

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

   modalRef = createRef();

   doSubmit = async () => {
      try {
         const { data } = this.state;
         const { data: user } = await login(data.email, data.password);
         localStorage.setItem('name', user[0].name);
         localStorage.setItem('userId', user[0].id);
         window.location.reload();
         if (user) {
            $(this.modalRef.current).modal('hide');
            this.props.onModalClose();
         }
      }
      catch (ex) {
         if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.email = ex.response.data;
            this.setState({ errors });
         }
      }
   };

   render() {
      return (
         <Modal
            ref={this.modalRef}
            title='Login'
            name='Login'
            label='LoginModal'
            position='modal-dialog-centered'
            onModalClose={this.props.onModalClose}
            showCloseButton={true}>
            <form onSubmit={this.handlesubmit} noValidate>
               {this.renderInput('email', 'Email')}
               {this.renderInput('password', 'Password', 'password')}
               {this.renderButton('Login')}
            </form>
         </Modal>
      )
   }
}

export default LoginForm;
