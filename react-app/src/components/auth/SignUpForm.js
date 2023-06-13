import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const userData = { username, first_name: firstName, last_name: lastName, email, password }
      const data = await dispatch(signUp(userData));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <h2 className='modal-title'>Sign up</h2>
      <form onSubmit={onSignUp}>
        <div className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <input
          type='text'
          name='username'
          placeholder='User Name'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>


        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          onChange={updateFirstName}
          value={firstName}
          required={true}
        ></input>


        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          onChange={updateLastName}
          value={lastName}
          required={true}
        ></input>

        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>

        <input
          type='password'
          name='repeat_password'
          placeholder='Repeat Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>

        <button className='submit' type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
