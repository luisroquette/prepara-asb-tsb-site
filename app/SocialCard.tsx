import styles from "./SocialCard.module.css";

export function SocialCard() {
  return (
    <div className={styles.card} aria-label="Redes sociais do professor Diego Thiers">
      <div className={styles.background} aria-hidden="true" />
      <span className={styles.logo}>Redes</span>
      <a className={`${styles.box} ${styles.box1}`} href="https://www.instagram.com/profdiegoth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram do professor Diego Thiers">
        <span className={styles.icon}>
          <svg viewBox="0 0 30 30" aria-hidden="true"><path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" /></svg>
        </span>
      </a>
      <a className={`${styles.box} ${styles.box2}`} href="https://www.youtube.com/@ProfDiegoThiers" target="_blank" rel="noopener noreferrer" aria-label="YouTube do professor Diego Thiers">
        <span className={styles.icon}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>
        </span>
      </a>
      <span className={`${styles.box} ${styles.box4}`} aria-hidden="true" />
    </div>
  );
}
