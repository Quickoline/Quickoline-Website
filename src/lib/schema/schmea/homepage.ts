
import { z } from 'zod';

export const HeroSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  tagline: z.string(),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
  socialLinks: z.array(z.object({
    platform: z.string(),
    link: z.string(),
  })),
});

export const ServicesSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  services: z.array(z.string()),
});

export const ProcessSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  steps: z.array(z.string()),
});

export const UniqueSellingPointsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  points: z.array(z.string()),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const HomePageSchema = z.object({
  hero: HeroSectionSchema,
  services: ServicesSectionSchema,
  process: ProcessSectionSchema,
  uniqueSellingPoints: UniqueSellingPointsSchema,
});

export type HomePage = z.infer<typeof HomePageSchema>;