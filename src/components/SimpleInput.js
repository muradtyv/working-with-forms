import { useState } from "react";
import useInput from "../hooks/use-Input";

const SimpleInput = (props) => {

  const validateHandler = (value) => {
    if(value.trim() !== "" && value.trim().length === 3){
      return value;
    }
  }

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetInputName,
  } = useInput(validateHandler);

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetInputName();

  };

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

    return (
      <form onSubmit={formSubmissionHandler}>
         <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
      </form>
    );
};

export default SimpleInput;
