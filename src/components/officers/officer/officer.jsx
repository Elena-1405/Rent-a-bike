/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendRequest } from '../../../requests';
import Error from '../../error/error';
import css from './officer.module.css';

export default function Officer(props) {
  const { officerId } = useParams();
  const {
    officers, setOfficers, token, user,
  } = props;
  const [officer, setOfficer] = useState({});
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const isAuthorized = !!user;

  useEffect(() => {
    if (token) {
      sendRequest(`api/officers/${officerId}`, 'get', undefined, (response) => {
        if (response.statusText === 'OK') {
          setOfficer(response.data.data);
        } else {
          setIsError(true);
        }
      }, token);
    }
  }, [officerId, token]);

  const handleUpdate = (event, officerId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendRequest(`api/officers/${officerId}`, 'put', {
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      // Если мы хотим сразу ставить approved or not,
      // ниже нужно добавить name checkboxa
      approved: formData.get(false),
    }, (response) => {
      if (response.data.status === 'OK') {
        setOfficers([...officers, response.data]);
        setOfficer({
          ...officer,
          password: formData.get('password'),
			    firstName: formData.get('firstName'),
			    lastName: formData.get('lastName'),
          approved: formData.get(false),
        });
        setIsUpdate(false);
      } else {
        setIsError(true);
      }
    }, token);
  };

  const handleCloseError = () => {
    setIsError(false);
  };

  return (
    <>
      {isAuthorized ? (
        <div>
          {isUpdate ? (
            <div>
              Form
              <form
                className={css.form}
                onSubmit={(event) => handleUpdate(event, officerId)}
              >
                <div>
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
                  <button className={`${css.comp} ${css.button}`} onClick={() => setIsUpdate(false)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              Officer ID:
              {' '}
              {officer._id}
              <br />
              Name:
              {' '}
              {officer.firstName}
              <br />
              LastName:
              {' '}
              {officer.lastName}
              <button type="button" onClick={() => setIsUpdate(true)}>
                Update
              </button>
            </div>
          )}

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
      ) : (
        <div>Please, sign up to go to the page.</div>
      )}
    </>
  );
}
