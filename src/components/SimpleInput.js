import { useState } from "react";
import useInput from "../hooks/use-Input";

const SimpleInput = (props) => {
  // const validateHandler = (value) => {
  //   if (value.trim() !== "" && value.trim().length === 3) {
  //     return value;
  //   }
  // };

  // const {
  //   value: enteredName,
  //   isValid: enteredNameIsValid,
  //   hasError: nameInputHasError,
  //   valueChangeHandler: nameChangeHandler,
  //   inputBlurHandler: nameBlurHandler,
  //   reset: resetInputName,
  // } = useInput(validateHandler);

  const {
    value: enteredName,
    isValid: enteredNameIsvalid,
    error: nameInputHasError,
    changeHandler: nameChangeHandler,
    blurHAndler: nameBlurHandler,
    resetInput: resetInputName,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 0 );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    error: emailInputHasError,
    changeHandler: emailChangeHandler,
    blurHAndler: emialBlurHandler,
    resetInput: resetInputEmail,
  } = useInput((value) => value.trim().includes("@"));

  let formIsValid = false;

  if (enteredNameIsvalid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsvalid && !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetInputName();
    resetInputEmail();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

    const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emialBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
