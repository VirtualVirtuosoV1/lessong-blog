import Link from "next/link";
import styles from "../page.module.css"; // reuse the homepage styles

export default function BlogsPage() {

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/lessons">Lessons</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <h1 className={styles.title}>About</h1>

          <p className={styles.introText}>
            Here I say a few things about myself. Blah blah blah.
            
          </p>
        </header>

        
      </div>
    </main>
  );
}
