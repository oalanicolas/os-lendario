import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Section } from '../../types';

// Lazy load all course views for code splitting (~352KB -> ~20KB initial)
const CoursesTemplate = lazy(() =>
  import('./courses').then((m) => ({ default: m.CoursesTemplate }))
);
const CourseOverview = lazy(() =>
  import('./course-overview').then((m) => ({ default: m.CourseOverview }))
);
const CourseBrief = lazy(() => import('./views/CourseBrief'));
const CourseResearch = lazy(() => import('./views/CourseResearch'));
const CourseCurriculum = lazy(() =>
  import('./course-curriculum').then((m) => ({ default: m.default }))
);
const CourseLessons = lazy(() => import('./views/CourseLessons'));
const CourseLesson = lazy(() =>
  import('./views/course-lesson').then((m) => ({ default: m.default }))
);
const CourseValidation = lazy(() => import('./views/CourseValidation'));
const CourseNew = lazy(() => import('./views/CourseNew'));

// Loading fallback component - minimal spinner without external deps
const RouteLoader = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

interface CoursesRouterProps {
  setSection: (s: Section) => void;
}

const CoursesRouter: React.FC<CoursesRouterProps> = ({ setSection }) => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* List all courses */}
        <Route path="/" element={<CoursesTemplate setSection={setSection} />} />

        {/* Create new course */}
        <Route path="/novo" element={<CourseNew setSection={setSection} />} />

        {/* Course detail routes */}
        <Route path="/:slug" element={<CourseOverview setSection={setSection} />} />
        <Route path="/:slug/brief" element={<CourseBrief setSection={setSection} />} />
        <Route path="/:slug/research" element={<CourseResearch setSection={setSection} />} />
        <Route path="/:slug/curriculo" element={<CourseCurriculum setSection={setSection} />} />
        {/* CourseLessons mantido para busca flat - útil em cursos grandes */}
        <Route path="/:slug/licoes" element={<CourseLessons setSection={setSection} />} />
        <Route path="/:slug/licoes/:lessonId" element={<CourseLesson setSection={setSection} />} />
        <Route path="/:slug/validacao" element={<CourseValidation setSection={setSection} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/creator/cursos" replace />} />
      </Routes>
    </Suspense>
  );
};

export default CoursesRouter;
