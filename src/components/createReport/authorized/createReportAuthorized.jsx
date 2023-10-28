import { useState, useParams, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../../requests';
import Error from '../../error/error';
import css from './createReportAuthorized.jsx.module.css';

export default function CreateReportAuthorized(props) {
  const {
    cases, setCases, token, user, officers, setOfficers,
  } = props;
  const [isError, setIsError] = useState(false);
  const isAuthorized = !!user;
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  // useEffect((event) => {
  //   if (token) {
  //     sendRequest('api/officers', 'get', undefined, (response) => {
  //       if (response.statusText === 'OK') {
  //         setOfficers(response.data.officers);
	// 		  } else {
  //         setIsError(true);
	// 		  }
  //     }, token);
	// 	  }
  // }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendRequest('api/cases/', 'post', {
      ownerFullName: formData.get('ownerFullName'),
      licenseNumber: formData.get('licenseNumber'),
      type: formData.get('type'),
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
        navigateBack();
      } else {
        setIsError(true);
      }
    }, token);
  };

  return (
    <div>
      {isAuthorized && (
      <Link
        className={css.link}
        to="/create-report/authorized"
      >
        Create Report
      </Link>
      )}
      <form
        className={css.form}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div>
          <input
            className={css.comp}
            type="text"
            name="ownerFullName"
            placeholder="Your full name*"
            required
          />
          <input
            className={css.comp}
            type="text"
            name="licenseNumber"
            placeholder="License Number*"
            required
          />
          <select size="0" name="type">
            <option value="general">General</option>
            <option value="sport">sport</option>
          </select>
          <input
            className={css.comp}
            type="text"
            name="officerId"
            placeholder="Your Id"
          />
          <input
            className={css.comp}
            type="datetime"
            name="createdAt"
            placeholder="Created at"
          />
          <input
            className={css.comp}
            type="datetime"
            name="updatedAt"
            placeholder="Updated at"
          />
          <input
            className={css.comp}
            type="text"
            name="color"
            placeholder="Color"
          />
          <input
            className={css.comp}
            type="date"
            name="date"
            placeholder="Time"
          />
          <input
            className={css.comp}
            type="text"
            name="officer"
            placeholder="Officer"
          />
          <input
            className={css.comp}
            type="text"
            name="color"
            placeholder="Color"
          />
          <input
            className={css.comp}
            type="date"
            name="date"
            placeholder="Time"
          />
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
          {isSuccess && (
          <div>
            Your report is successfully sent.
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
            >
              Close
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
      </form>
    </div>
  );
}

// 1. Внутри хука useEffect запросить с бэкенда список officers
// для отображения в списке сотрудников
// 2. Отобразить форму для неавторизованного пользователя
// 3. Прописать логику отправления запроса
// 4. После отправления запроса отобразить сообщение об успехе или об ошибке при отправке
// 4. Добавить индикатор загрузки, пока запрос отправляется
