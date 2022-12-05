import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import './Login.css';

const Login = () => {
  const [login, isLoggedIn] = useState(true);

  /**
   * This function triggers when a form is submitted
   * @param {*} e: synthetic event
   */

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name: pathname === '/signup' && e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
  };

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    isLoggedIn((login) => (pathname === '/login' ? true : false));
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
        <button type="submit" className={'main__form_submit button'}>
          {login ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};
export default Login;
