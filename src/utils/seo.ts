import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: Record<string, unknown>;
}

const SITE = 'https://kennedymutua.com';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Applies page-level SEO metadata, OpenGraph tags, canonical URL and JSON-LD. */
export function useSeo({ title, description, path, image, schema }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `${SITE}${path}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    }
    setLink('canonical', `${SITE}${path}`);

    const scriptId = 'page-structured-data';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    if (schema) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, schema]);
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. Kennedy Ndue Mutua',
  jobTitle: 'Agricultural Economist and Sustainability Researcher',
  description:
  'PhD-trained Agricultural Economist and Sustainability Researcher specializing in climate adaptation, environmental assessment, carbon management and sustainable agriculture.',
  url: SITE,
  alumniOf: [
  { '@type': 'CollegeOrUniversity', name: 'Széchenyi István University' },
  { '@type': 'CollegeOrUniversity', name: 'Hungarian University of Agriculture and Life Sciences' },
  { '@type': 'CollegeOrUniversity', name: 'University of Kabianga' }],

  knowsAbout: [
  'Life Cycle Assessment',
  'Climate Change Adaptation',
  'Agricultural Economics',
  'Carbon Accounting',
  'Environmental Impact Assessment',
  'ESG and Sustainability Strategy']

};

export function professionalServiceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    provider: { '@type': 'Person', name: 'Dr. Kennedy Ndue Mutua' },
    areaServed: ['United Kingdom', 'Europe', 'Kenya']
  };
}

export function faqSchema(items: {question: string;answer: string;}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };
}