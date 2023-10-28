import css from './error.module.css';

export default function Error() {
  return (
    <div className={css.error}>
      <p>404 Ooops, something went wrong</p>
    </div>
  );
}
