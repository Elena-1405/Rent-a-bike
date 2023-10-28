import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendRequest } from '../../../requests';
import css from './cases.module.css';
import Error from '../../error/error';

export default function Cases(props) {
  const {
    cases, setCases, token, user,
  } = props;
  const [isError, setIsError] = useState(false);
  const isAuthorized = !!user;

  useEffect((event) => {
    if (token) {
      sendRequest('api/cases', 'get', undefined, (response) => {
        console.log("🚀 ~ file: cases.jsx:17 ~ sendRequest ~ response:", response)
        if (response.statusText === 'OK') {
          setCases(response.data.data);
        } else {
          setIsError(true);
        }
      }, token);
    }
  }, [token]);

  const handleDelete = (id) => {
    sendRequest(
      `api/cases/${id}`,
      'delete',
      undefined,
      (response) => {
        if (response.data.status === 'OK') {
          setCases(cases.filter((item) => item._id !== id));
        } else {
          setIsError(true);
        }
      },
      token,
    );
  };

  return (
    <>
      <div className={css.cases}>
        {isAuthorized
      && (
      <Link
        className={css.link}
        to="/cases"
      >
        Cases
      </Link>
      )}
        {cases?.map((item) => (
          <table>
            <tr key={item._id}>
              <td>
                <Link to={`/cases/${item._id}`}>
                  {item._id}
                </Link>
              </td>
              <td>
                {item.status}
              </td>
              <td>
                {item.licenseNumber}
              </td>
              <td>
                {item.type}
              </td>
              <td>
                {item.ownerFullName}
              </td>
              <td>
                {item.clientId}
              </td>
              <td>
                {item.createdAt}
              </td>
              <td>
                {item.updatedAt}
              </td>
              <td>
                {item.color}
              </td>
              <td>
                {item.date}
              </td>
              <td>
                {item.officer}
              </td>
              <td>
                {item.description}
              </td>
              <td>
                {item.resolution}
              </td>
              <td>
                <button
                  className={css.delete}
                  type="button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </table>
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
          <Link to="/create-report">Create report</Link>
          {' '}
        </button>
      </div>
    </>
  );
}
