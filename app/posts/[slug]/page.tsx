import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/posts";
import styles from "./post.module.css";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <a href="/" className={styles.backLink}>
          back home
        </a>

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>
          ~ {new Date(post.date).toLocaleString()}
        </p>

        {/* Render Markdown as HTML */}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
