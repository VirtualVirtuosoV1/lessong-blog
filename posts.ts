import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  lesson?: string;
  lessonCode?: string;
  tags: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

function getPostFileNames(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
}

function normalizeTags(rawTags: unknown): string[] {
  const normalizedTags = Array.isArray(rawTags)
    ? rawTags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : typeof rawTags === "string"
      ? rawTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

  return Array.from(new Set(normalizedTags));
}

function normalizeOptionalText(rawValue: unknown): string | undefined {
  if (typeof rawValue !== "string") {
    return undefined;
  }

  const value = rawValue.trim();
  return value.length > 0 ? value : undefined;
}

const LESSON_CODE_TAG_PATTERN = /^[A-Z]{2,5}-\d{2}-\d{2}$/;

function splitLegacyLessonTag(tags: string[]): {
  lessonCode?: string;
  tags: string[];
} {
  if (tags.length === 0) {
    return { tags };
  }

  const [firstTag, ...otherTags] = tags;
  if (LESSON_CODE_TAG_PATTERN.test(firstTag)) {
    return {
      lessonCode: firstTag,
      tags: otherTags,
    };
  }

  return { tags };
}

// For the homepage list
export function getAllPosts(): PostMeta[] {
  const fileNames = getPostFileNames();

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const normalizedTags = normalizeTags(matterResult.data.tags);
    const { lessonCode: legacyLessonCode, tags } =
      splitLegacyLessonTag(normalizedTags);
    const lesson = normalizeOptionalText(matterResult.data.lesson);
    const lessonCode =
      normalizeOptionalText(matterResult.data.lessonCode) ?? legacyLessonCode;

    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      lesson,
      lessonCode,
      tags,
    };
  });

  // sort by date (newest first)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// For a single post page
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const normalizedTags = normalizeTags(matterResult.data.tags);
  const { lessonCode: legacyLessonCode, tags } =
    splitLegacyLessonTag(normalizedTags);
  const lesson = normalizeOptionalText(matterResult.data.lesson);
  const lessonCode =
    normalizeOptionalText(matterResult.data.lessonCode) ?? legacyLessonCode;

  const processedContent = remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    lesson,
    lessonCode,
    tags,
    contentHtml,
  };
}
