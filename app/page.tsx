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
            <Link href="/lessons">Lessons</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <h1 className={styles.title}>
            Uni blog
          </h1>

          <p className={styles.introText}>
            This is a blog page for some courses of the Computer Science department of the Aristotle University of Thessaloniki, Greece. 
          </p>

        </header>

        <section>
          <h2 className={styles.sectionTitle}>Latest posts</h2>

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
