import Link from "next/link";
import styles from "../page.module.css"; // reuse the homepage styles
import { getAllPosts } from "@/posts";
import LessonsClient from "./LessonsClient";

export default function BlogsPage() {
  const posts = getAllPosts(); // all posts, already sorted by date desc
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort(
    (left, right) => left.localeCompare(right)
  );

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

        <LessonsClient posts={posts} allTags={allTags} />
      </div>
    </main>
  );
}
