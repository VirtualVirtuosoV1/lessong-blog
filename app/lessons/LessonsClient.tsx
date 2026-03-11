"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { formatPostDate } from "@/formatPostDate";
import styles from "./lessons.module.css";

const MAX_VISIBLE_FILTER_TAGS = 50;
const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;

function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS_REGEX, "")
    .trim();
}

type LessonPost = {
  slug: string;
  title: string;
  date: string;
  lesson?: string;
  lessonCode?: string;
  tags: string[];
};

type LessonsClientProps = {
  posts: LessonPost[];
  allTags: string[];
  allLessons: string[];
};

export default function LessonsClient({
  posts,
  allTags,
  allLessons,
}: LessonsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const pickerId = useId();

  const normalizedQuery = normalizeSearchText(tagQuery);

  const lessonFilteredPosts = posts.filter((post) => {
    if (selectedLesson.length === 0) {
      return true;
    }

    const lessonLabel = post.lesson ?? post.lessonCode;
    return lessonLabel === selectedLesson;
  });

  const filteredPosts = lessonFilteredPosts.filter((post) =>
    selectedTags.every((tag) => post.tags.includes(tag))
  );

  const applicableTags = new Set(filteredPosts.flatMap((post) => post.tags));

  const matchingTags = allTags.filter((tag) => {
    if (selectedTags.includes(tag)) {
      return false;
    }

    if (!applicableTags.has(tag)) {
      return false;
    }

    if (normalizedQuery.length === 0) {
      return true;
    }

    return normalizeSearchText(tag).includes(normalizedQuery);
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

  const loadAllSearchParams = new URLSearchParams();
  if (selectedLesson.length > 0) {
    loadAllSearchParams.set("lesson", selectedLesson);
  }
  selectedTags.forEach((tag) => {
    loadAllSearchParams.append("tag", tag);
  });
  const loadAllQuery = loadAllSearchParams.toString();
  const loadAllHref =
    loadAllQuery.length > 0
      ? `/lessons/load-all?${loadAllQuery}`
      : "/lessons/load-all";

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

          {filteredPosts.length > 0 ? (
            <Link href={loadAllHref} className={styles.loadAllLink}>
              Load all ({filteredPosts.length})
            </Link>
          ) : null}

          {selectedLesson ? (
            <button
              type="button"
              className={`${styles.cardTag} ${styles.selectedLesson}`}
              onClick={() => setSelectedLesson("")}
            >
              <span>{selectedLesson}</span>
              <span className={styles.selectedTagDismiss}>x</span>
            </button>
          ) : null}

          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.cardTag} ${styles.selectedTag}`}
              onClick={() => toggleTag(tag)}
            >
              <span>{tag}</span>
              <span className={styles.selectedTagDismiss}>x</span>
            </button>
          ))}
        </div>

        {isPickerOpen ? (
          <div id={pickerId} className={styles.filterPanel}>
            {allLessons.length > 0 ? (
              <div className={styles.filterSection}>
                <h3 className={styles.filterSectionTitle}>Lesson</h3>
                <ul className={styles.lessonPickerList} aria-label="Filter by lesson">
                  {allLessons.map((lesson) => (
                    <li key={lesson}>
                      <button
                        type="button"
                        className={`${styles.cardTag} ${
                          selectedLesson === lesson ? styles.selectedLesson : ""
                        }`}
                        onClick={() =>
                          setSelectedLesson((currentLesson) =>
                            currentLesson === lesson ? "" : lesson
                          )
                        }
                      >
                        {lesson}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>Tags</h3>
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
                        className={styles.cardTag}
                        onClick={() => addTag(tag)}
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.filterEmpty}>
                  No more applicable tags match your search.
                </p>
              )}

              <div className={styles.filterPanelFooter}>
                <span className={styles.tagCount}>
                  {visibleMatchingTags.length}/{matchingTags.length}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <h2 className={styles.sectionTitle}>Posts</h2>

      {filteredPosts.length > 0 ? (
        <ul className={styles.postList}>
          {filteredPosts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                {post.title}
              </Link>

              {post.lesson || post.lessonCode ? (
                <p className={styles.lessonMeta}>
                  {post.lesson ?? post.lessonCode}
                </p>
              ) : null}

              {post.tags.length > 0 ? (
                <ul
                  className={`${styles.cardTagList} ${styles.singleLineCardTagList}`}
                  aria-label="Post tags"
                >
                  {post.tags.map((tag) => (
                    <li key={`${post.slug}-${tag}`}>
                      <button
                        type="button"
                        className={`${styles.cardTag} ${
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

              <div className={styles.postMeta}>
                ~ {formatPostDate(post.date)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>
          No posts match the selected lesson and tags.
        </p>
      )}
    </section>
  );
}
