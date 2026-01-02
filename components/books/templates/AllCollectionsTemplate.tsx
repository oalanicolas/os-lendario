import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon, type IconName } from '../../ui/icon';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBookCollections } from '../../../hooks/useBookCollections';
import { usePageTitle } from '../../../hooks/usePageTitle';
import SectionHeader from '../ui/SectionHeader';

interface AllCollectionsProps {
  setSection: (s: Section) => void;
}

// Map collection slugs to icons and colors
const COLLECTION_STYLES: Record<string, { icon: IconName; color: string }> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  leituras_essenciais_ia_2026: { icon: 'book', color: 'bg-brand-gold' },
  estoicismo: { icon: 'scale', color: 'bg-stone-500' },
  negocios: { icon: 'briefcase', color: 'bg-emerald-500' },
  psicologia: { icon: 'user', color: 'bg-pink-500' },
  produtividade: { icon: 'clock', color: 'bg-cyan-500' },
  default: { icon: 'book-stack', color: 'bg-brand-gold' },
};

const getCollectionStyle = (slug: string) => {
  return COLLECTION_STYLES[slug] || COLLECTION_STYLES.default;
};

const AllCollectionsTemplate: React.FC<AllCollectionsProps> = ({ setSection: _setSection }) => {
  const navigate = useNavigate();
  const { collections, loading, error } = useBookCollections();

  usePageTitle('Todas as Coleções');

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Erro ao carregar coleções</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/books')}
          >
            <Icon name="arrow-left" size="size-4" /> Voltar à Biblioteca
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Coleções
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Coleções curadas de livros organizados por tema, autor ou objetivo de aprendizado.
          </p>
          {!loading && (
            <p className="mt-2 text-sm text-muted-foreground">
              {collections.length} coleções disponíveis
            </p>
          )}
        </div>

        {/* Collections Grid */}
        <div className="space-y-8">
          <SectionHeader title="Todas as Coleções" />

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 rounded-xl border border-border/50 bg-card p-6"
                >
                  <Skeleton className="h-24 w-20 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : collections.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => {
                const style = getCollectionStyle(collection.slug);
                return (
                  <div
                    key={collection.id}
                    className="group flex cursor-pointer items-center gap-6 rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-brand-gold/30 hover:bg-muted/10 hover:shadow-lg"
                    onClick={() => navigate(`/books/collections/${collection.slug}`)}
                  >
                    {/* Stack Effect */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute right-0 top-0 h-24 w-20 translate-x-2 rotate-6 rounded border border-border bg-card shadow-sm"></div>
                      <div className="absolute right-0 top-0 h-24 w-20 translate-x-1 -rotate-3 rounded border border-border bg-card shadow-sm"></div>
                      <div
                        className={cn(
                          'relative flex h-24 w-20 items-center justify-center rounded text-black shadow-lg transition-transform group-hover:scale-105',
                          style.color
                        )}
                      >
                        <Icon name={style.icon} size="size-8" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-lg font-bold leading-tight transition-colors group-hover:text-brand-gold">
                        {collection.name}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {collection.bookCount} livros
                      </p>
                      {collection.description && (
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground/70">
                          {collection.description}
                        </p>
                      )}
                    </div>

                    <Icon
                      name="chevron-right"
                      className="flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-gold"
                      size="size-5"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Icon
                name="book-stack"
                className="mx-auto mb-4 text-muted-foreground"
                size="size-12"
              />
              <h3 className="text-lg font-bold">Nenhuma coleção disponível</h3>
              <p className="text-muted-foreground">Em breve adicionaremos coleções curadas.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCollectionsTemplate;
