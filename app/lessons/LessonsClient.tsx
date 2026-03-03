"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { formatPostDate } from "@/formatPostDate";
import sharedStyles from "../page.module.css";
import styles from "./lessons.module.css";

const MAX_VISIBLE_FILTER_TAGS = 50;

type LessonPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

type LessonsClientProps = {
  posts: LessonPost[];
  allTags: string[];
};

export default function LessonsClient({
  posts,
  allTags,
}: LessonsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const pickerId = useId();

  const normalizedQuery = tagQuery.trim().toLowerCase();

  const filteredPosts =
    selectedTags.length === 0
      ? posts
      : posts.filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag))
        );

  const matchingTags = allTags.filter((tag) => {
    if (selectedTags.includes(tag)) {
      return false;
    }

    if (normalizedQuery.length === 0) {
      return true;
    }

    return tag.toLowerCase().includes(normalizedQuery);
  });
  const visibleMatchingTags = matchingTags.slice(0, MAX_VISIBLE_FILTER_TAGS);

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag]
    );
  }

  function addTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag) ? currentTags : [...currentTags, tag]
    );
    setTagQuery("");
  }

  return (
    <section>
      <div className={styles.filterWrap}>
        <div className={styles.filterBar}>
          <button
            type="button"
            className={`${styles.filterTrigger} ${
              isPickerOpen ? styles.filterTriggerActive : ""
            }`}
            aria-expanded={isPickerOpen}
            aria-controls={pickerId}
            onClick={() => setIsPickerOpen((open) => !open)}
          >
            Filter tags
          </button>

          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${sharedStyles.cardTag} ${styles.selectedTag}`}
              onClick={() => toggleTag(tag)}
            >
              <span>{tag}</span>
              <span className={styles.selectedTagDismiss}>x</span>
            </button>
          ))}
        </div>

        {isPickerOpen ? (
          <div id={pickerId} className={styles.filterPanel}>
            <input
              type="search"
              value={tagQuery}
              onChange={(event) => setTagQuery(event.target.value)}
              className={styles.searchInput}
              placeholder="Search tags"
              aria-label="Search tags"
            />

            {matchingTags.length > 0 ? (
              <ul className={styles.tagPickerList}>
                {visibleMatchingTags.map((tag) => (
                  <li key={tag}>
                    <button
                      type="button"
                      className={sharedStyles.cardTag}
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.filterEmpty}>
                No more tags match your search.
              </p>
            )}

            <div className={styles.filterPanelFooter}>
              <span className={styles.tagCount}>
                {visibleMatchingTags.length}/{matchingTags.length}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <h2 className={sharedStyles.sectionTitle}>Posts</h2>

      {filteredPosts.length > 0 ? (
        <ul className={sharedStyles.postList}>
          {filteredPosts.map((post) => (
            <li key={post.slug} className={sharedStyles.postItem}>
              <Link href={`/posts/${post.slug}`} className={sharedStyles.postLink}>
                {post.title}
              </Link>

              {post.tags.length > 0 ? (
                <ul
                  className={`${sharedStyles.cardTagList} ${styles.singleLineCardTagList}`}
                  aria-label="Post tags"
                >
                  {post.tags.map((tag) => (
                    <li key={`${post.slug}-${tag}`}>
                      <button
                        type="button"
                        className={`${sharedStyles.cardTag} ${
                          selectedTags.includes(tag) ? styles.selectedTag : ""
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className={sharedStyles.postMeta}>
                ~ {formatPostDate(post.date)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>
          No posts match the tags you have selected.
        </p>
      )}
    </section>
  );
}
