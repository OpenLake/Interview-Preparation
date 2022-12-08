import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import './Login.css';
import { signupUser, loginUser } from '../../utils/apiRequests';

const Login = () => {
  const [login, isLoggedIn] = useState(true);

  const location = useLocation();
  const { pathname } = location;

  /**
   * This function triggers when a form is submitted
   * @param {*} e: synthetic event
   */

  const submitHandler = (e) => {
    let data;
    e.preventDefault();
    if (login) {
      data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      loginUser(data);
    } else {
      data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordConfirm: e.target.passwordConfirm.value,
      };
      signupUser(data);
    }
  };

  useEffect(() => {
    isLoggedIn(() => (pathname === '/login' ? true : false));
  }, [pathname]);

  return (
    <div className={'form__main'}>
      <div className={'main__button'}>
        <Link to="/login" className={clsx('button', login ? 'button__active' : '')}>
          Login
        </Link>
        <Link to="/signup" className={clsx('button', login ? '' : 'button__active')}>
          SignUp
        </Link>
      </div>
      <form
        className={'main__form'}
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        {!login && (
          <input
            id="name"
            className={clsx('main__form_password', 'main__form_input')}
            type="text"
            placeholder={'Name'}
          />
        )}
        <input id="email" className={clsx('main__form_email', 'main__form_input')} type="email" placeholder={'Email'} />
        <input
          id="password"
          className={clsx('main__form_password', 'main__form_input')}
          type="password"
          placeholder={'Password'}
        />
        {!login && (
          <input
            id="passwordConfirm"
            className={clsx('main__form_password', 'main__form_input')}
            type="password"
            placeholder={'Confirm your Password'}
          />
        )}
        <button type="submit" className={'main__form_submit button'}>
          {login ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};
export default Login;
