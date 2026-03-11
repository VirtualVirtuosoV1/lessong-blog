import Link from "next/link";
import { formatPostDate } from "@/formatPostDate";
import { getAllPosts, getPostBySlug, type Post } from "@/posts";
import styles from "./page.module.css";

type LoadAllSearchParams = {
  lesson?: string | string[];
  tag?: string | string[];
};

type LoadAllPageProps = {
  searchParams: Promise<LoadAllSearchParams> | LoadAllSearchParams;
};

function toSingleValue(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0].trim();
  }

  return "";
}

function toValueArray(value: string | string[] | undefined): string[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? [value]
      : [];

  return Array.from(
    new Set(
      rawValues
        .map((rawTag) => rawTag.trim())
        .filter((rawTag) => rawTag.length > 0)
    )
  );
}

export default async function LoadAllPage({ searchParams }: LoadAllPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedLesson = toSingleValue(resolvedSearchParams.lesson);
  const selectedTags = toValueArray(resolvedSearchParams.tag);

  const lessonFilteredPosts = getAllPosts().filter((post) => {
    if (selectedLesson.length === 0) {
      return true;
    }

    const lessonLabel = post.lesson ?? post.lessonCode;
    return lessonLabel === selectedLesson;
  });

  const matchingPostMetas = lessonFilteredPosts
    .filter((post) => selectedTags.every((tag) => post.tags.includes(tag)))
    .sort((leftPost, rightPost) => {
      if (leftPost.date === rightPost.date) {
        return leftPost.slug.localeCompare(rightPost.slug);
      }

      return leftPost.date > rightPost.date ? 1 : -1;
    });

  const matchingPosts: Post[] = matchingPostMetas
    .map((postMeta) => getPostBySlug(postMeta.slug))
    .filter((post): post is Post => post !== null);

  const activeFilters = [
    selectedLesson.length > 0 ? `lesson: ${selectedLesson}` : null,
    ...selectedTags.map((tag) => `tag: ${tag}`),
  ].filter((filterValue): filterValue is string => filterValue !== null);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <div className={styles.topBar}>
          <Link href="/lessons" className={styles.backLink}>
            Back to lessons
          </Link>
          <p className={styles.metaInfo}>
            Showing {matchingPosts.length} posts (oldest to newest)
          </p>
        </div>

        <h1 className={styles.pageTitle}>Loaded posts</h1>

        {activeFilters.length > 0 ? (
          <p className={styles.activeFilters}>
            Filters: {activeFilters.join(" | ")}
          </p>
        ) : null}

        {matchingPosts.length > 0 ? (
          <div className={styles.postStack}>
            {matchingPosts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <h2 className={styles.postTitle}>{post.title}</h2>

                {post.lesson || post.lessonCode ? (
                  <p className={styles.lesson}>{post.lesson ?? post.lessonCode}</p>
                ) : null}

                {post.tags.length > 0 ? (
                  <ul className={styles.tagList} aria-label="Post tags">
                    {post.tags.map((tag) => (
                      <li key={`${post.slug}-${tag}`} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className={styles.date}>~ {formatPostDate(post.date)}</p>

                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>
            No posts match the currently selected lesson/tags.
          </p>
        )}
      </section>
    </main>
  );
}
