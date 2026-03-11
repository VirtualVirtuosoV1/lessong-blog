import styles from "./page.module.css";
import Link from "next/link";
import { getAllPosts  } from "@/posts";
import { formatPostDate } from "@/formatPostDate";
import { getDueAssignments } from "@/assignments";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const dueAssignments = getDueAssignments().slice(0, 6);

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

        <section className={styles.contentGrid}>
          <div>
            <h2 className={styles.sectionTitle}>Latest posts</h2>

            <ul className={styles.postList}>
              {posts.map((post) => (
                <li key={post.slug} className={styles.postItem}>
                  <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                    {post.title}
                  </Link>
                  <div className={styles.postMeta}>
                    ~ {formatPostDate(post.date)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.assignmentsPanel} aria-label="Due assignments">
            <h2 className={styles.assignmentsTitle}>Due assignments</h2>
            <ul className={styles.assignmentsList}>
              {dueAssignments.map((assignment) => (
                <li key={assignment.id} className={styles.assignmentItem}>
                  <p className={styles.assignmentCourse}>{assignment.course}</p>
                  <p className={styles.assignmentName}>{assignment.title}</p>
                  <p className={styles.assignmentDue}>
                    Due: {formatPostDate(assignment.dueDate)}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

      </div>
    </main>
  );
}
