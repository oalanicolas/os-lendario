import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '../../ui/skeleton';
import { Card, CardContent, CardHeader } from '../../ui/card';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';

interface MindProfileSkeletonProps {
  setSection: (s: Section) => void;
}

/**
 * Skeleton for Mind Profile page - mirrors the actual layout structure
 */
export const MindProfileSkeleton: React.FC<MindProfileSkeletonProps> = ({ setSection }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />

      {/* Hero Section Skeleton */}
      <div className="relative bg-[#0F0F13] border-b border-border p-6 md:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar skeleton */}
            <Skeleton className="w-32 h-32 rounded-xl shrink-0" />

            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
      <main className="p-6 flex-1 max-w-[1400px] mx-auto w-full space-y-8">
        {/* Tabs skeleton */}
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-md" />
          ))}
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
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
              <CardContent className="pt-6 space-y-3">
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
          <div className="lg:col-span-5 space-y-8">
            {/* Proficiencies Card */}
            <Card className="rounded-xl border-border">
              <CardHeader className="border-b border-border pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
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
                <div className="flex gap-2 flex-wrap">
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
                <div className="flex flex-wrap gap-4 justify-center">
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
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <MindsTopbar currentSection={Section.APP_MINDS_GALLERY} setSection={setSection} />

      <main className="p-6 space-y-8 flex-1 max-w-[1400px] mx-auto w-full">
        {/* Filters Bar Skeleton */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-[#0A0A0C] border border-white/5 p-2 rounded-xl">
          <Skeleton className="h-10 w-full xl:w-96 rounded-lg" />
          <div className="flex flex-wrap gap-2 w-full xl:w-auto items-center p-1">
            <Skeleton className="h-9 w-[160px] rounded-md" />
            <Skeleton className="h-9 w-48 rounded-lg" />
            <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>

        {/* Content Header */}
        <div className="flex justify-between items-end mb-6">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    <div className="rounded-xl border border-white/5 bg-[#0A0A0C] p-6 space-y-4">
      {/* Header with avatar and name */}
      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-full shrink-0" />
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
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default { MindProfileSkeleton, MindsGallerySkeleton, MindCardSkeleton };
