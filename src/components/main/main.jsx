import css from './main.module.css';
import img from '../shared/img.jpg';

export default function Main() {
  return (
    <main className={css.main}>
      <div className={css.txt}>
        <h3>
          Rent a bike
          <br />
          {' '}
          in your city!
        </h3>
      </div>
      <div className={css.mainImg}>
        <img className={css.img} src={img} alt="bike" />
      </div>

    </main>

  );
}
