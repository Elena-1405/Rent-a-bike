import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendRequest } from '../../../requests';
import Error from '../../error/error';
import css from './officers.module.css';

export default function Officers(props) {
  const {
    officers, setOfficers, token, user,
  } = props;
  const [isError, setIsError] = useState(false);
  const isAuthorized = !!user;

  useEffect((event) => {
    if (token) {
      sendRequest('api/officers', 'get', undefined, (response) => {
        if (response.statusText === 'OK') {
          setOfficers(response.data.officers);
        } else {
          setIsError(true);
        }
      }, token);
    }
  }, [token]);

  const handleDelete = (id) => {
    sendRequest(
      `api/officers/${id}`,
      'delete',
      undefined,
      (response) => {
        if (response.data.status === 'OK') {
          setOfficers(officers.filter((item) => item._id !== id));
        } else {
          setIsError(true);
        }
      },
      token,
    );
  };

  return (
    <div className={css.officers}>
      {isAuthorized
      && (
      <Link
        className={css.link}
        to="/officers"
      >
        Officers
      </Link>
      )}
      {officers?.map((officer) => (
        <tr key={officer._id}>
          <td>{officer.approved ? 'Approved' : 'Not Approved'}</td>
          <td>
            <Link to={`/officers/${officer._id}`}>
              {officer._id}
            </Link>
          </td>
          <td>
            <Link to={`/officers/${officer._id}`}>
              {officer.email}
            </Link>
          </td>
          <td>
            <Link to={`/officers/${officer._id}`}>
              {officer.firstName}
            </Link>
          </td>
          <td>
            <Link to={`/officers/${officer._id}`}>
              {officer.lastName}
            </Link>
          </td>
          <td>
            <button
              className={css.delete}
              type="button"
              onClick={() => handleDelete(officer._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
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
      <button className={css.create} type="button">
        <Link to="/officers/create">Create officer</Link>
        {' '}
      </button>
    </div>
  );
}
