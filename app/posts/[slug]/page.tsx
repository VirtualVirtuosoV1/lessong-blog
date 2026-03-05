import { notFound } from "next/navigation";
import { formatPostDate } from "@/formatPostDate";
import { getPostBySlug, getAllPosts } from "@/posts";
import styles from "./post.module.css";
import PostBackLink from "./PostBackLink";

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
        <PostBackLink className={styles.backLink} />

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>
          ~ {formatPostDate(post.date)}
        </p>

        {post.tags.length > 0 ? (
          <ul className={styles.tagList} aria-label="Post tags">
            {post.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
