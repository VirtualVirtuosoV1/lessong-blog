import Link from "next/link";
import styles from "../page.module.css"; // reuse the homepage styles

export default function BlogsPage() {

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <h1 className={styles.title}>Contact</h1>

          <p className={styles.introText}>
            Harry Potter <br></br>
            4 Privet Drive <br></br>
            +1-555-012-3456 <br></br>
            albusdumbledore@hogwarts.owl <br></br>
          </p>
        </header>

        
      </div>
    </main>
  );
}
