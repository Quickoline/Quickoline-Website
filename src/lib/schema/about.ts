import { z } from 'zod';

export const StatSchema = z.object({
  icon: z.string(),
  label: z.string(),
  value: z.string(),
  description: z.string()
});

export const ValueSchema = z.object({
  title: z.string(),
  description: z.string()
});

export const TimelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string()
});

export const AboutPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    description: z.string(),
  }),
  stats: z.array(StatSchema),
  mission: z.object({
    title: z.string(),
    description: z.string(),
    keyPoints: z.array(z.string()),
  }),
  vision: z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
  }),
  values: z.array(ValueSchema),
  timeline: z.array(TimelineItemSchema),
  cta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type AboutPage = z.infer<typeof AboutPageSchema>; 