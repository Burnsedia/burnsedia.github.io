import type { CollectionEntry } from 'astro:content';
import { getEntrySlug } from './content';

type CourseEntry = CollectionEntry<'courses'>;

export interface CourseLesson {
  entry: CourseEntry;
  courseSlug: string;
  lessonSlug: string;
  lessonOrder: number;
}

export interface CourseGroup {
  slug: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

const DEFAULT_COURSE_SLUG = 'django-saas-foundations';

const COURSE_METADATA: Record<string, { title: string; description: string }> = {
  'django-saas-foundations': {
    title: 'Django SaaS Foundations',
    description:
      'A practical course path for building and shipping production-ready Django and DRF apps step by step.',
  },
};

const LESSON_NUMBER_PATTERN = /lesson-(\d+)/i;

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function inferCourseAndLesson(entryId: string): { courseSlug: string; lessonSlug: string } {
  const normalized = getEntrySlug(entryId);

  if (normalized.includes('/')) {
    const [courseSlug, ...rest] = normalized.split('/');
    return {
      courseSlug,
      lessonSlug: rest.join('/'),
    };
  }

  return {
    courseSlug: DEFAULT_COURSE_SLUG,
    lessonSlug: normalized,
  };
}

function getLessonOrder(entry: CourseEntry, lessonSlug: string): number {
  if (typeof entry.data.lesson === 'number') {
    return entry.data.lesson;
  }

  const match = lessonSlug.match(LESSON_NUMBER_PATTERN);
  if (match) {
    return Number(match[1]);
  }

  return Number.MAX_SAFE_INTEGER;
}

export function normalizeCourseLesson(entry: CourseEntry): CourseLesson {
  const { courseSlug, lessonSlug } = inferCourseAndLesson(entry.id);
  const lessonOrder = getLessonOrder(entry, lessonSlug);

  return {
    entry,
    courseSlug,
    lessonSlug,
    lessonOrder,
  };
}

export function groupCourseLessons(entries: CourseEntry[]): CourseGroup[] {
  const grouped = new Map<string, CourseLesson[]>();

  for (const entry of entries) {
    const lesson = normalizeCourseLesson(entry);
    const current = grouped.get(lesson.courseSlug) ?? [];
    current.push(lesson);
    grouped.set(lesson.courseSlug, current);
  }

  return Array.from(grouped.entries())
    .map(([slug, lessons]) => {
      const sortedLessons = [...lessons].sort((a, b) => {
        if (a.lessonOrder !== b.lessonOrder) {
          return a.lessonOrder - b.lessonOrder;
        }

        if (a.entry.data.pubDate.getTime() !== b.entry.data.pubDate.getTime()) {
          return a.entry.data.pubDate.getTime() - b.entry.data.pubDate.getTime();
        }

        return a.entry.data.title.localeCompare(b.entry.data.title);
      });

      const metadata = COURSE_METADATA[slug];

      return {
        slug,
        title: metadata?.title ?? titleFromSlug(slug),
        description: metadata?.description ?? sortedLessons[0]?.entry.data.description ?? 'Course lessons',
        lessons: sortedLessons,
      } satisfies CourseGroup;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getCourseGroupBySlug(entries: CourseEntry[], courseSlug: string): CourseGroup | undefined {
  return groupCourseLessons(entries).find((course) => course.slug === courseSlug);
}
