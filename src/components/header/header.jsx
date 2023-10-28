import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignInModal from '../modals/sign-in/sign-in';
import SignUpModal from '../modals/sign-up/sign-up';
import css from './header.module.css';

export default function Header({ user, setUser }) {
  const isAuthorized = !!user; // сокращенный синтаксис для перевода в boolean тип
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const signIn = () => {
    setSignInOpen(true);
  };

  const signUp = () => setSignUpOpen(true);

  const signOut = () => {
    window.localStorage.removeItem('token');
    setUser(undefined);
  };

  return (
    <>
      <header className={css.header}>
        {user && <div className={css.email}>{user.email}</div>}
        <div className={isAuthorized ? `${css.head_auth}` : `${css.head}`}>
          <nav className={css.nav}>
            <Link className={css.link} to="/">Home</Link>
            <div className={css.nav_auth}>
              {isAuthorized && <Link className={css.link} to="/officers">Officers</Link>}
              {isAuthorized && <Link className={css.link} to="/cases">Cases</Link>}
            </div>
            <Link className={css.link} to="/create-report">Create report</Link>
          </nav>
          <div className={css.btns}>
            {isAuthorized ? (
              <button className={`${css.button} ${css.out}`} onClick={signOut}>Sign Out</button>
            ) : (
              <>
                <button className={css.button} onClick={signUp}>Sign Up</button>
                <button className={css.button} onClick={signIn}>Sign In</button>
              </>
            )}
          </div>
        </div>
      </header>
      {isSignInOpen && (
      <SignInModal setUser={setUser} setSignInOpen={setSignInOpen} />
      )}
      {isSignUpOpen && (
      <SignUpModal setUser={setUser} setSignUpOpen={setSignUpOpen} />
      )}
    </>
  );
}
