import { sendRequest } from '../../../requests';
import css from './sign-up.module.css';

export default function SignUpModal({ setUser, setSignUpOpen }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // отменить поведение по умолчанию (перезагрузка страницы)
    const formData = new FormData(event.target);
    sendRequest('api/auth/sign_up', 'post', {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      clientId: formData.get('clientId'),
      approved: formData.get(false),
    }, (response) => {
      if (response.data.status === 'OK') {
        setUser(response.data.data.user);
        window.localStorage.setItem('token', response.data.data.token);
      }
      setSignUpOpen(false);
    });
  };
  const onClose = () => setSignUpOpen(false);

  return (
    <div className={css.signup}>
      <div className={css.signup_content}>
        <h3 className={css.txt}>Sign Up</h3>
        <form className={css.form} onSubmit={handleSubmit}>
          <div>
            <input className={css.comp} type="email" name="email" placeholder="Email*" required />
            <input className={css.comp} type="password" name="password" placeholder="Password*" required />
            <input className={css.comp} type="text" name="username" placeholder="First Name" />
            <input className={css.comp} type="text" name="username" placeholder="Last Name" />
            <input className={css.comp} type="text" name="id" placeholder="Client ID*" required />
          </div>
          <p>* - required</p>
          <div className={css.btns}>
            <button className={`${css.comp} ${css.button}`} type="submit">Sign Up</button>
            <button className={`${css.comp} ${css.button}`} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
