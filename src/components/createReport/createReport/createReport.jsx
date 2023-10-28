import CreateReportAuthorized from '../authorized/createReportAuthorized';
import CreateReportPublic from '../publicReport/createPublicReport';
import css from './createReport.module.css';

export default function CreateReport({ user }) {
  const isAuthorized = !!user;

  return (
    <div>
      {isAuthorized
        ? <CreateReportAuthorized />
        : <CreateReportPublic />}
    </div>
  );
}
