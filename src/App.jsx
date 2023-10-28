import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import Officers from './components/officers/officers/officers';
import Officer from './components/officers/officer/officer';
import { sendRequest } from './requests';
import CreateOfficer from './components/officers/create-officer/create-officer';
import Error from './components/error/error';
import Cases from './components/cases/cases/cases';
import Case from './components/cases/case/case';
import CreateReportPublic from './components/createReport/publicReport/createPublicReport';
import CreateReportAuthorized from './components/createReport/authorized/createReportAuthorized';
import CreateReport from './components/createReport/createReport/createReport';

function App() {
  const [user, setUser] = useState(undefined);
  const [officers, setOfficers] = useState([]);
  const [cases, setCases] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // проверяем токен на валидность
      sendRequest('api/auth', 'get', undefined, (response) => {
        if (response.data.status === 'OK') {
          // Если токен валидный, заполняем объект юзера
          setUser(response.data.data.user);
        } else {
          // Если токен старый, удаляем его
          window.localStorage.removeItem('token');
        }
      }, token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      sendRequest('api/cases', 'get', [], (response) => {
        if (response.data.status === 'OK') {
          setCases(response.data.data.case);
        } else {
          window.localStorage.removeItem('token');
        }
      }, token);
    }
  }, [token]);

  const props = {
    token,
    officers,
    setOfficers,
    user,
  };

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route
          path="/officers"
          element={
            <Officers {...props} />
          }
        />
        <Route
          path="/officers/:officerId"
          element={
            <Officer {...props} />
          }
        />
        <Route
          path="/officers/create"
          element={
            <CreateOfficer {...props} />
        }
        />
        <Route
          path="/cases"
          element={
            <Cases
              cases={cases}
              setCases={setCases}
              token={token}
              user={user}
            />
          }
        />
        <Route
          path="/cases/:caseId"
          element={
            <Case
              cases={cases}
              setCases={setCases}
              token={token}
              user={user}
            />
}
        />
        <Route
          path="/create-report"
          element={<CreateReport user={user} />}
        />
        <Route
          path="/create-report/public"
          element={<CreateReportPublic
            cases={cases}
            setCases={setCases}
            token={token}
            user={user}
          />}
        />
        <Route
          path="/create-report/authorized"
          element={<CreateReportAuthorized
            cases={cases}
            setCases={setCases}
            {...props}
          />}
        />
        <Route
          path="*"
          element={<Error />}
        />
        {' '}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
