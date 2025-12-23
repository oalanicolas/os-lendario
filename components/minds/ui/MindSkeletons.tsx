import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '../../ui/skeleton';
import { Card, CardContent, CardHeader } from '../../ui/card';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { HERO_SECTION_CLASSES } from '../studio-tokens';

interface MindProfileSkeletonProps {
  setSection: (s: Section) => void;
}

/**
 * Skeleton for Mind Profile page - mirrors the actual layout structure
 */
export const MindProfileSkeleton: React.FC<MindProfileSkeletonProps> = ({ setSection }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />

      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden border-b border-border bg-studio-bg p-6 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          {/* Breadcrumb skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Avatar skeleton */}
            <Skeleton className="h-32 w-32 shrink-0 rounded-xl" />

            <div className="w-full flex-1 space-y-4">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-64" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-32 rounded-md" />
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="flex flex-wrap gap-6 border-t border-white/10 pt-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-8 p-6">
        {/* Tabs skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-md" />
          ))}
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-7">
            {/* Bio Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="pt-6">
                <SkeletonText lines={3} />
              </CardContent>
            </Card>

            {/* Values Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-36" />
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8 lg:col-span-5">
            {/* Proficiencies Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Communication Style Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-44" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-md" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Obsessions Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <SkeletonCircle key={i} size="lg" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

interface MindsGallerySkeletonProps {
  setSection: (s: Section) => void;
}

/**
 * Skeleton for Minds Gallery page - mirrors the actual layout structure
 */
export const MindsGallerySkeleton: React.FC<MindsGallerySkeletonProps> = ({ setSection }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_GALLERY} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-8 p-6">
        {/* Filters Bar Skeleton */}
        <div className="bg-studio-card flex flex-col items-start justify-between gap-4 rounded-xl border border-white/5 p-2 xl:flex-row xl:items-center">
          <Skeleton className="h-10 w-full rounded-lg xl:w-96" />
          <div className="flex w-full flex-wrap items-center gap-2 p-1 xl:w-auto">
            <Skeleton className="h-9 w-[160px] rounded-md" />
            <Skeleton className="h-9 w-48 rounded-lg" />
            <div className="mx-2 hidden h-6 w-px bg-white/10 md:block"></div>
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>

        {/* Content Header */}
        <div className="mb-6 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <MindCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

/**
 * Skeleton for individual Mind Card
 */
export const MindCardSkeleton: React.FC = () => {
  return (
    <div className="bg-studio-card space-y-4 rounded-xl border border-white/5 p-6">
      {/* Header with avatar and name */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* Signature skill */}
      <Skeleton className="h-4 w-40" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default { MindProfileSkeleton, MindsGallerySkeleton, MindCardSkeleton };
