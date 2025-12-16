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
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="w-full mx-auto p-6 md:p-12 max-w-[1400px]">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="h-4 w-44 bg-muted rounded animate-pulse mb-2" />
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="h-9 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="h-12 w-12 rounded-full bg-muted animate-pulse mb-4" />
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-muted/60 rounded animate-pulse mb-4" />
            <div className="h-9 w-40 bg-muted rounded animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="w-full mx-auto p-6 md:p-12 max-w-[1400px]">
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

        <div className="flex flex-col items-center justify-center min-h-[40vh] animate-fade-in text-center">
          <Icon name="search" className="text-muted-foreground mb-4" size="size-12" />
          <h2 className="text-2xl font-bold mb-2">Pesquisa de Mercado</h2>
          <p className="text-muted-foreground mb-4">Em desenvolvimento</p>
          <Button onClick={() => navigate(`/creator/cursos/${slug}/curriculo`)}>
            Ir para Currículo <Icon name="arrow-right" className="ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CourseResearch;
