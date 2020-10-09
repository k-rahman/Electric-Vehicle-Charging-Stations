import React, { createRef } from 'react';
import Joi from 'joi';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { register } from '../services/userService';
import Modal from './common/Modal';
import Form from './common/Form';
import 'react-toastify/dist/ReactToastify.css';


class Register extends Form {
   state = {
      data: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      errors: {}
   };

  modalRef = createRef();

   schema = Joi.object({
      name: Joi
         .string()
         .required()
         .messages({
            'string.empty': `"Name" cannot be empty`,
            'any.required': `"Name" is required`
         })
         .label('Name'),
      email: Joi
         .string()
         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
         .required()
         .messages({
            'string.email': `"Email" must be valid. ex: 'name@domain.com.'`,
            'string.empty': `"Email" cannot be empty.`,
            'any.required': `"Email" is required.`
         })
         .label('Email'),
      password: Joi
         .string()
         .min(5)
         .required()
         .messages({
            'string.empty': `"Password" cannot be empty.`,
            'any.required': `"Password" is required.`
         })
         .label('Password'),
      confirmPassword: Joi
         .string()
         .valid(Joi.ref('password'))
         .messages({
            'string.empty': `"Password" cannot be empty.`,
            'any.only': `"Password" must match.`
         })
         .label('Confirm Password')
   });

   doSubmit = async () => {
      try {
         const res = await register(this.state.data);
         if (res) {
            $(this.modalRef.current).modal('hide');
            this.props.onModalClose();
            this.successNote();
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

   successNote = () => {
      toast.dark(('Successfully registered!')
      );
   };

   render() {
      return (
         <Modal
         ref={this.modalRef}
            title='Register'
            name='Register'
            label='RegisterModal'
            onModalClose={this.props.onModalClose}
            showCloseButton={true}
            >
            <form onSubmit={this.handlesubmit} noValidate>
               <div className="modal-body">
                  {this.renderInput('name', 'Name', 'name')}
                  {this.renderInput('email', 'Email', 'email')}
                  {this.renderInput('password', 'Password', 'password')}
                  {this.renderInput('confirmPassword', 'Renter Password', 'password')}
                  {this.renderButton('Register')}
               </div>
            </form>
         </Modal>
      );
   }
}

export default Register;
