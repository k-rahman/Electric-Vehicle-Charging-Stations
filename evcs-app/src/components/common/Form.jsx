import React, { Component } from 'react';
import Input from './Input';
import styles from '../../assets/css/form.module.css';

class Form extends Component {

  validate = () => {
    // Joi validation;
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.data, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  handlesubmit = e => {
    e.preventDefault();

    // check for valid inputs;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  renderButton(label) {
    return (
      <button
        type="submit" className={`${styles['submit-btn']} btn form-control`}>{label}</button>
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange} />
    );
  }
};
export default Form;
