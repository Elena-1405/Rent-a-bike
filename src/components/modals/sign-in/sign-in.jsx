import { sendRequest } from '../../../requests';
import css from './sign-in.module.css';

export default function SignInModal({ setUser, setSignInOpen }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // отменить поведение по умолчанию (перезагрузка страницы)
    const formData = new FormData(event.target);
    sendRequest('api/auth/sign_in', 'post', {
      email: formData.get('email'),
      password: formData.get('password'),
    }, (response) => {
      if (response.data.status === 'OK') {
        setUser(response.data.data.user);
        window.localStorage.setItem('token', response.data.data.token);
      }
      setSignInOpen(false);
    });
  };
  const onClose = () => setSignInOpen(false);

  return (
    <div className={css.signin}>
      <div className={css.signin_content}>
        <h3 className={css.txt}>Sign In</h3>
        <form className={css.form} onSubmit={handleSubmit}>
          <div>
            <input className={css.comp} type="email" name="email" placeholder="Email" required />
            <input className={css.comp} type="password" name="password" placeholder="Password" required />
          </div>
          <div className={css.btns}>
            <button className={`${css.comp} ${css.button}`} type="submit">Sign In</button>
            <button className={`${css.comp} ${css.button}`} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
