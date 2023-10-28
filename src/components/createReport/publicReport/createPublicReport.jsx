
import { useState, useParams, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../../requests';
import css from './createPublicReport.module.css';

export default function CreateReportPublic(props) {
  const {
    cases, setCases, token, user,
  } = props;
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isAuthorized = !!user;

  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendRequest('api/public/report', 'post', {
      ownerFullName: formData.get('ownerFullName'),
      licenseNumber: formData.get('licenseNumber'),
      type: formData.get('type'),
      clientId: formData.get('clientId'),
    }, (response) => {
      if (response.data.status === 'OK') {
        // мутировать cases мы не можем, потому как доступа к этому разделу нет
        // лучше вывести модалку, в которой говорится об успешной обработке кейса
        // setCases([...cases, response.data]);
        navigateBack();
      } else {
        setIsError(true);
      }
    }, token);
  };

  return (
    <div>
      <Link
        className={css.link}
        to="/create-report/public"
      >
        Create Report
      </Link>
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
          <select size="0" name="type" placeholder="Type of bike">
            <option value="general">General</option>
            <option value="sport">sport</option>
          </select>
          <input
            className={css.comp}
            type="text"
            name="clientId"
            placeholder="Your Client Id"
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
            Oops, something went wrong
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

// 1. Отобразить форму для неавторизованного пользователя
// 2. Прописать логику отправления запроса
// 3. После отправления запроса отобразить сообщение об успехе или об ошибке при отправке
// 4. Добавить индикатор загрузки, пока запрос отправляется
