/**
 * Type definitions for Gu[IA] Ebook generator
 */

export interface EbookSection {
  id: string;
  title: string;
  content: string;
  pageNumber: string;
  insight: string;
  checklist: string[];
  script: string;
  ideas: string[];
  technicalSpec: { label: string; value: string }[];
}

export interface EbookChapter {
  number: string;
  title: string;
  sections: EbookSection[];
}

export interface EbookData {
  title: string;
  subtitle: string;
  footerText: string;
  summary: { chapter: string; page: string }[];
  chapters: EbookChapter[];
  conclusion: {
    title: string;
    content: string;
  };
  coverPrompt: string;
}
