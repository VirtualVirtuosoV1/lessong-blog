import Link from "next/link";
import styles from "../page.module.css"; // reuse the homepage styles
import { getAllPosts } from "@/posts";

export default function BlogsPage() {
  const posts = getAllPosts(); // all posts, already sorted by date desc

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

          <h1 className={styles.title}>All lesson posts</h1>

          <p className={styles.introText}>
            This is the full archive. Every questionable lesson&apos;s notes that I&apos;ve decided to publish lives here.
          </p>
        </header>

        <section>
          <h2 className={styles.sectionTitle}>Posts</h2>

          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link
                  href={`/posts/${post.slug}`}
                  className={styles.postLink}
                >
                  {post.title}
                </Link>
                {post.tags.length > 0 ? (
                  <ul className={styles.cardTagList} aria-label="Post tags">
                    {post.tags.map((tag) => (
                      <li key={`${post.slug}-${tag}`} className={styles.cardTag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
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
