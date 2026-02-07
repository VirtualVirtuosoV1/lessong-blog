import styles from "./page.module.css";
import Link from "next/link";
import { getAllPosts  } from "@/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

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

          <h1 className={styles.title}>
            Welcome to my amazing (not really) blog!  
          </h1>

          <p className={styles.introText}>
            I've no clue as to what are you doing here, unless you are lurking that is? <br></br>
            Anyhow. This is not meant to be an actual blog, but some sort of a practice ground for me to test out my extraordinary programming skills. If you've read this far, I suppose you aren't the brightest person out there...<br></br>
            I'll be blunt then.<br></br>
            Please leave.
          </p>

        </header>

        <section>
          <h2 className={styles.sectionTitle}>Newest posts</h2>

          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                  {post.title}
                </Link>
                <div className={styles.postMeta}>
                  ~ {new Date(post.date).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}
