import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import CreatorTopbar from '../CreatorTopbar';
import CourseBreadcrumb from './CourseBreadcrumb';
import { useCourse } from '../../../hooks/useCourse';

interface CourseResearchProps {
  setSection: (s: Section) => void;
}

const CourseResearch: React.FC<CourseResearchProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading } = useCourse(slug);

  if (loading || !course) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="mb-2 h-4 w-44 animate-pulse rounded bg-muted" />
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 animate-pulse rounded bg-muted" />
              <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="flex min-h-[40vh] flex-col items-center justify-center">
            <div className="mb-4 h-12 w-12 animate-pulse rounded-full bg-muted" />
            <div className="mb-2 h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted/60" />
            <div className="h-9 w-40 animate-pulse rounded bg-muted" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
        <CourseBreadcrumb
          items={[
            { label: 'Cursos', href: '/creator/cursos' },
            { label: course.name, href: `/creator/cursos/${slug}` },
            { label: 'Pesquisa de Mercado' },
          ]}
          title="Pesquisa de Mercado"
          actions={
            <Button variant="outline" onClick={() => navigate(`/creator/cursos/${slug}`)}>
              <Icon name="angle-left" className="mr-2 size-4" /> Voltar
            </Button>
          }
        />

        <div className="flex min-h-[40vh] animate-fade-in flex-col items-center justify-center text-center">
          <Icon name="search" className="mb-4 text-muted-foreground" size="size-12" />
          <h2 className="mb-2 text-2xl font-bold">Pesquisa de Mercado</h2>
          <p className="mb-4 text-muted-foreground">Em desenvolvimento</p>
          <Button onClick={() => navigate(`/creator/cursos/${slug}/curriculo`)}>
            Ir para Currículo <Icon name="arrow-right" className="ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CourseResearch;
