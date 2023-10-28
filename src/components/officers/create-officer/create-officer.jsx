/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-tabs */
import { useState, useParams, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../../requests';
import Error from '../../error/error';
import css from './create-officer.module.css';

export default function CreateOfficer(props) {
  const {
    officers, setOfficers, token, user,
  } = props;
  const [isError, setIsError] = useState(false);
  const isAuthorized = !!user;

  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendRequest('api/officers', 'post', {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      // Если мы хотим сразу ставить approved or not,
      // ниже нужно добавить name checkboxa
      approved: formData.get(false),
    }, (response) => {
      if (response.data.status === 'OK') {
        setOfficers([...officers, response.data]);
        navigateBack();
      } else {
        setIsError(true);
      }
    }, token);
  };

  return (
    <div>
      {isAuthorized
      && (
      <Link
        className={css.link}
        to="/officers"
      >
        Officers
      </Link>
      )}
      <form
        className={css.form}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div>
          <input
            className={css.comp}
            type="email"
            name="email"
            placeholder="Email*"
            required
          />
          <input
            className={css.comp}
            type="password"
            name="password"
            placeholder="Password*"
            required
          />
          <input
            className={css.comp}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            className={css.comp}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            className={css.comp}
            type="checkbox"
            name="approved"
            required
            id="approved"
          />
          <label
            htmlFor="approved"
          >
            Approved

          </label>
        </div>
        <p>* - required</p>
        <div className={css.btns}>
          <button
            className={`${css.comp} ${css.button}`}
            type="submit"
          >
            Save
          </button>
          <button
            className={`${css.comp} ${css.button}`}
            onClick={navigateBack}
          >
            Cancel

          </button>
          {isError && (
          <div>
            <Error />
            <button
              type="button"
              onClick={() => setIsError(false)}
            >
              Close
            </button>
          </div>
          )}
        </div>
      </form>
    </div>
  );
}
