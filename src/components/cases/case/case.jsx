import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sendRequest } from '../../../requests';
import css from './case.module.css';
// import { Select } from '../../../select/select';
import Error from '../../error/error';

export default function Case(props) {
  const { caseId } = useParams();
  const {
    cases, setCases, token, user,
  } = props;
  const [caseItem, setCase] = useState({});
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const isAuthorized = !!user;

  useEffect(() => {
    if (token) {
      sendRequest(`api/cases/${caseId}`, 'get', undefined, (response) => {
        if (response.statusText === 'OK') {
          setCase(response.data.data); // Fix: Corrected function name
        } else {
          setIsError(true);
        }
      }, token);
    }
  }, [caseId, token]);

  const handleUpdate = (event, caseId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendRequest(`api/cases/${caseId}`, 'put', {
      _id: formData.get('_id'),
      status: formData.get('status'),
      licenseNumber: formData.get('licenseNumber'),
      type: formData.get('type'),
      ownerFullName: formData.get('ownerFullName'),
      clientId: formData.get('clientId'),
      createdAt: formData.get('createdAt'),
      updatedAt: formData.get('updatedAt'),
      color: formData.get('color'),
      date: formData.get('date'),
      officer: formData.get('officer'),
      description: formData.get('description'),
      resolution: formData.get('resolution'),
    }, (response) => {
      if (response.data.status === 'OK') {
        setCases([...cases, response.data]);
        setCase({
          ...caseItem,
          _id: formData.get('_id'),
          status: formData.get('status'),
          licenseNumber: formData.get('licenseNumber'),
          type: formData.get('type'),
          ownerFullName: formData.get('ownerFullName'),
          clientId: formData.get('clientId'),
          createdAt: formData.get('createdAt'),
          updatedAt: formData.get('updatedAt'),
          color: formData.get('color'),
          date: formData.get('date'),
          officer: formData.get('officer'),
          description: formData.get('description'),
          resolution: formData.get('resolution'),
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
              <form onSubmit={(event) => handleUpdate(event, caseId)}>
                <table>
                  <tbody>
                    <tr key={caseItem._id}>
                      <td>
                        <Link to={`/cases/${caseItem._id}`}>
                          {caseItem._id}
                        </Link>
                      </td>
                      <td>
                        <select defaultValue={caseItem.status} name="status">
                          <option value="new">New</option>
                          <option value="in progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </td>
                      <td>
                        {caseItem.licenseNumber}
                      </td>
                      <td>
                        <select defaultValue={caseItem.type} name="type">
                          <option value="general">General</option>
                          <option value="sport">Sport</option>
                        </select>
                      </td>
                      <td>
                        {caseItem.ownerFullName}
                      </td>
                      <td>
                        {caseItem.clientId}
                      </td>
                      <td>
                        {caseItem.createdAt}
                      </td>
                      <td>
                        {caseItem.updatedAt}
                      </td>
                      <td>
                        {caseItem.color}
                      </td>
                      <td>
                        {caseItem.date}
                      </td>
                      <td>
                        {caseItem.officer}
                      </td>
                      <td>
                        {caseItem.description}
                      </td>
                      <td>
                        {caseItem.resolution}
                      </td>
                      <td>
                        <div className={css.btns}>
                          <button className={`${css.comp} ${css.button}`} type="submit">
                            Save
                          </button>
                          <button
                            type="button"
                            className={`${css.comp} ${css.button}`}
                            onClick={() => setIsUpdate(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          ) : (
            <div>
              Case ID:
              {' '}
              {caseItem._id}
              <br />
              Status:
              {' '}
              {caseItem.status}
              <br />
              License Number:
              {' '}
              {caseItem.licenseNumber}
              Type:
              {' '}
              {caseItem.type}
              <br />
              Owner Full Name:
              {' '}
              {caseItem.ownerFullName}
              <br />
              Client ID:
              {' '}
              {caseItem.clientId}
              Created At:
              {' '}
              {caseItem.createdAt}
              <br />
              Updated At:
              {' '}
              {caseItem.updatedAt}
              <br />
              Color:
              {' '}
              {caseItem.color}
              Date:
              {' '}
              {caseItem.date}
              <br />
              Officer:
              {' '}
              {caseItem.officer}
              <br />
              Description:
              {' '}
              {caseItem.description}
              Resolution:
              {' '}
              {caseItem.resolution}
              <button type="button" onClick={() => setIsUpdate(true)}>
                Update
              </button>
            </div>
          )}

          {isError && (
            <div>
              <Error />
              <button type="button" onClick={() => setIsError(false)}>
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
