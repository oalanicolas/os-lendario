/**
 * Centralized style mappings for book categories and collections
 *
 * Used by:
 * - BooksCategoryTemplate
 * - BookCollectionTemplate
 * - AllCollectionsTemplate
 * - BooksLibraryTemplate
 */

import type { IconName } from '../../ui/icon';

export interface StyleConfig {
  icon: IconName;
  color: string;
}

export interface CategoryInfo {
  name: string;
  description: string;
}

/**
 * Category names and descriptions in Portuguese
 * Includes both Portuguese and English slugs for compatibility
 */
export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  // Portuguese slugs
  negocios: {
    name: 'Negócios',
    description:
      'Estratégias, liderança e insights para empreendedores e executivos que querem transformar ideias em resultados.',
  },
  psicologia: {
    name: 'Psicologia',
    description:
      'Compreenda a mente humana, comportamentos e emoções para viver com mais consciência e equilíbrio.',
  },
  filosofia: {
    name: 'Filosofia',
    description:
      'Questões fundamentais sobre existência, ética e conhecimento que moldaram o pensamento humano.',
  },
  tecnologia: {
    name: 'Tecnologia',
    description: 'Inovação, inteligência artificial e tendências que estão redefinindo o futuro.',
  },
  biografias: {
    name: 'Biografias',
    description: 'Histórias inspiradoras de pessoas que deixaram sua marca no mundo.',
  },
  autoajuda: {
    name: 'Autoajuda',
    description: 'Ferramentas práticas para desenvolvimento pessoal, produtividade e bem-estar.',
  },
  produtividade: {
    name: 'Produtividade',
    description: 'Técnicas e sistemas para fazer mais com menos esforço e alcançar seus objetivos.',
  },
  lideranca: {
    name: 'Liderança',
    description: 'Princípios e práticas para inspirar equipes e liderar com propósito.',
  },
  financas: {
    name: 'Finanças',
    description: 'Investimentos, independência financeira e mentalidade de abundância.',
  },
  criatividade: {
    name: 'Criatividade',
    description: 'Desbloqueie seu potencial criativo e aprenda a pensar de forma inovadora.',
  },
  comunicacao: {
    name: 'Comunicação',
    description: 'A arte de se expressar, persuadir e conectar com as pessoas.',
  },
  espiritualidade: {
    name: 'Espiritualidade',
    description: 'Reflexões sobre propósito, consciência e a busca por significado.',
  },
  // English slugs (mapped to Portuguese names)
  business: {
    name: 'Negócios',
    description:
      'Estratégias, liderança e insights para empreendedores e executivos que querem transformar ideias em resultados.',
  },
  psychology: {
    name: 'Psicologia',
    description:
      'Compreenda a mente humana, comportamentos e emoções para viver com mais consciência e equilíbrio.',
  },
  philosophy: {
    name: 'Filosofia',
    description:
      'Questões fundamentais sobre existência, ética e conhecimento que moldaram o pensamento humano.',
  },
  technology: {
    name: 'Tecnologia',
    description: 'Inovação, inteligência artificial e tendências que estão redefinindo o futuro.',
  },
  biographies: {
    name: 'Biografias',
    description: 'Histórias inspiradoras de pessoas que deixaram sua marca no mundo.',
  },
  biography: {
    name: 'Biografias',
    description: 'Histórias inspiradoras de pessoas que deixaram sua marca no mundo.',
  },
  'self-help': {
    name: 'Autoajuda',
    description: 'Ferramentas práticas para desenvolvimento pessoal, produtividade e bem-estar.',
  },
  self_help: {
    name: 'Autoajuda',
    description: 'Ferramentas práticas para desenvolvimento pessoal, produtividade e bem-estar.',
  },
  productivity: {
    name: 'Produtividade',
    description: 'Técnicas e sistemas para fazer mais com menos esforço e alcançar seus objetivos.',
  },
  leadership: {
    name: 'Liderança',
    description: 'Princípios e práticas para inspirar equipes e liderar com propósito.',
  },
  finance: {
    name: 'Finanças',
    description: 'Investimentos, independência financeira e mentalidade de abundância.',
  },
  finances: {
    name: 'Finanças',
    description: 'Investimentos, independência financeira e mentalidade de abundância.',
  },
  creativity: {
    name: 'Criatividade',
    description: 'Desbloqueie seu potencial criativo e aprenda a pensar de forma inovadora.',
  },
  communication: {
    name: 'Comunicação',
    description: 'A arte de se expressar, persuadir e conectar com as pessoas.',
  },
  spirituality: {
    name: 'Espiritualidade',
    description: 'Reflexões sobre propósito, consciência e a busca por significado.',
  },
  science: {
    name: 'Ciência',
    description: 'Descobertas científicas e avanços que expandem nossa compreensão do universo.',
  },
  history: {
    name: 'História',
    description: 'Lições do passado que iluminam o presente e guiam o futuro.',
  },
  economics: {
    name: 'Economia',
    description: 'Entenda as forças que moldam mercados, sociedades e decisões financeiras.',
  },
  marketing: {
    name: 'Marketing',
    description: 'Estratégias para construir marcas, conquistar clientes e crescer negócios.',
  },
  health: {
    name: 'Saúde',
    description: 'Bem-estar físico e mental para uma vida mais plena e equilibrada.',
  },
  relationships: {
    name: 'Relacionamentos',
    description: 'Construa conexões mais profundas e significativas em todas as áreas da vida.',
  },
  education: {
    name: 'Educação',
    description: 'Métodos e abordagens para aprender melhor e ensinar com impacto.',
  },
  entrepreneurship: {
    name: 'Empreendedorismo',
    description: 'Do zero ao sucesso: histórias e estratégias para construir seu próprio caminho.',
  },
};

/**
 * Get category name in Portuguese (falls back to capitalized slug)
 */
export const getCategoryName = (slug: string): string =>
  CATEGORY_INFO[slug]?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/_/g, ' ');

/**
 * Get category description in Portuguese
 */
export const getCategoryDescription = (slug: string): string | null =>
  CATEGORY_INFO[slug]?.description || null;

/**
 * Category visual styles mapped by slug
 * Includes both Portuguese and English slugs
 */
export const CATEGORY_STYLES: Record<string, StyleConfig> = {
  // Portuguese slugs
  negocios: { icon: 'trend-up', color: 'bg-emerald-500' },
  psicologia: { icon: 'brain', color: 'bg-purple-500' },
  filosofia: { icon: 'bulb', color: 'bg-amber-500' },
  tecnologia: { icon: 'code', color: 'bg-blue-500' },
  biografias: { icon: 'user', color: 'bg-rose-500' },
  autoajuda: { icon: 'heart', color: 'bg-pink-500' },
  produtividade: { icon: 'clock', color: 'bg-cyan-500' },
  lideranca: { icon: 'crown', color: 'bg-orange-500' },
  financas: { icon: 'coins', color: 'bg-green-500' },
  criatividade: { icon: 'sparkles', color: 'bg-fuchsia-500' },
  comunicacao: { icon: 'chat-bubble', color: 'bg-indigo-500' },
  espiritualidade: { icon: 'infinity', color: 'bg-violet-500' },
  // English slugs (same styles as Portuguese equivalents)
  business: { icon: 'trend-up', color: 'bg-emerald-500' },
  psychology: { icon: 'brain', color: 'bg-purple-500' },
  philosophy: { icon: 'bulb', color: 'bg-amber-500' },
  technology: { icon: 'code', color: 'bg-blue-500' },
  biographies: { icon: 'user', color: 'bg-rose-500' },
  biography: { icon: 'user', color: 'bg-rose-500' },
  'self-help': { icon: 'heart', color: 'bg-pink-500' },
  self_help: { icon: 'heart', color: 'bg-pink-500' },
  productivity: { icon: 'clock', color: 'bg-cyan-500' },
  leadership: { icon: 'crown', color: 'bg-orange-500' },
  finance: { icon: 'coins', color: 'bg-green-500' },
  finances: { icon: 'coins', color: 'bg-green-500' },
  creativity: { icon: 'sparkles', color: 'bg-fuchsia-500' },
  communication: { icon: 'chat-bubble', color: 'bg-indigo-500' },
  spirituality: { icon: 'infinity', color: 'bg-violet-500' },
  science: { icon: 'bulb', color: 'bg-teal-500' },
  history: { icon: 'clock', color: 'bg-amber-600' },
  economics: { icon: 'chart-line', color: 'bg-green-600' },
  marketing: { icon: 'megaphone', color: 'bg-orange-400' },
  health: { icon: 'heart', color: 'bg-red-500' },
  relationships: { icon: 'users', color: 'bg-pink-400' },
  education: { icon: 'graduation-cap', color: 'bg-blue-600' },
  entrepreneurship: { icon: 'rocket', color: 'bg-purple-600' },
  default: { icon: 'book', color: 'bg-brand-gold' },
};

/**
 * Collection names and descriptions in Portuguese
 */
export const COLLECTION_INFO: Record<string, CategoryInfo> = {
  mente_alta_performance: {
    name: 'Mente de Alta Performance',
    description:
      'Desenvolva foco, disciplina e mentalidade vencedora para alcançar resultados extraordinários.',
  },
  visoes_do_futuro: {
    name: 'Visões do Futuro',
    description: 'Explore tendências e previsões que moldarão os próximos anos.',
  },
  mentes_brilhantes: {
    name: 'Mentes Brilhantes',
    description: 'Aprenda com os maiores pensadores e inovadores da história.',
  },
  leituras_essenciais_ia_2026: {
    name: 'Leituras Essenciais de IA 2026',
    description: 'Os livros fundamentais para entender a revolução da inteligência artificial.',
  },
  estoicismo: {
    name: 'Estoicismo',
    description: 'Sabedoria antiga para enfrentar os desafios modernos com serenidade.',
  },
  classicos_negocios: {
    name: 'Clássicos de Negócios',
    description: 'Os livros atemporais que todo empreendedor deveria ler.',
  },
  startups_inovacao: {
    name: 'Startups & Inovação',
    description: 'Estratégias e histórias do ecossistema de startups e tecnologia.',
  },
};

/**
 * Get collection name in Portuguese (falls back to formatted slug)
 */
export const getCollectionName = (slug: string): string =>
  COLLECTION_INFO[slug]?.name ||
  slug
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/**
 * Get collection description in Portuguese
 */
export const getCollectionDescription = (slug: string): string | null =>
  COLLECTION_INFO[slug]?.description || null;

/**
 * Collection visual styles mapped by slug
 */
export const COLLECTION_STYLES: Record<string, StyleConfig> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  leituras_essenciais_ia_2026: { icon: 'book', color: 'bg-brand-gold' },
  estoicismo: { icon: 'scale', color: 'bg-stone-500' },
  classicos_negocios: { icon: 'briefcase', color: 'bg-emerald-500' },
  startups_inovacao: { icon: 'rocket', color: 'bg-pink-500' },
  default: { icon: 'book-stack', color: 'bg-brand-gold' },
};

/**
 * Get style config for a category by slug
 */
export const getCategoryStyle = (slug: string): StyleConfig =>
  CATEGORY_STYLES[slug] || CATEGORY_STYLES.default;

/**
 * Get style config for a collection by slug
 */
export const getCollectionStyle = (slug: string): StyleConfig =>
  COLLECTION_STYLES[slug] || COLLECTION_STYLES.default;
