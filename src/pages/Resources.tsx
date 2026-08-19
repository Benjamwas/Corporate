import React from 'react';
import { DownloadIcon, FileTextIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { useSiteData } from '../contexts/SiteDataContext';
import { images } from '../data/images';
import { personSchema, useSeo } from '../utils/seo';

export function Resources() {
  const { documents, registerDownload } = useSiteData();
  const published = documents.filter((doc) => doc.status === 'Published');

  useSeo({
    title: 'Resources & Documents — Dr. Kennedy Ndue Mutua',
    description:
    'Downloadable professional profile, consulting service overview, consulting agreement template and research resources.',
    path: '/resources',
    image: images.research,
    schema: personSchema
  });

  const handleDownload = (id: string, title: string, body: string) => {
    registerDownload(id);
    const blob = new Blob([`<!doctype html><meta charset="utf-8"><title>${title}</title>${body}`], {
      type: 'text/html'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${title.replace(/\s+/g, '-').toLowerCase()}.html`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        kicker="Resources"
        title={
        <>
            Resources &amp;
            <span className="block font-normal text-ink-muted">documents.</span>
          </>
        }
        lede="Approved documents published by Dr. Kennedy — professional profile, service overview, agreements and research resources. Only published documents appear here."
        crumbs={[{ label: 'Resources' }]} />
      

      <section className="px-5 py-14" aria-label="Downloadable documents">
        <div className="mx-auto grid max-w-content gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((doc, index) =>
          <Reveal key={doc.id} delay={index * 0.05} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <FileTextIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="rounded-full border border-line/70 px-2.5 py-1 text-[11px] text-ink-subtle">
                    {doc.type}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[16.5px] font-semibold leading-snug text-ink">
                  {doc.title}
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{doc.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-2 text-[12px] text-ink-subtle">
                  <div>
                    <dt className="sr-only">Version</dt>
                    <dd>Version {doc.version}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Updated</dt>
                    <dd>Updated {doc.updated}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">File size</dt>
                    <dd>{doc.fileSize}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Downloads</dt>
                    <dd>{doc.downloads} downloads</dd>
                  </div>
                </dl>
                <button
                type="button"
                onClick={() => handleDownload(doc.id, doc.title, doc.body)}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-contrast transition-[filter] duration-200 hover:brightness-110">
                
                  <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Download
                </button>
              </GlassCard>
            </Reveal>
          )}
        </div>
      </section>

      <ConsultationCta />
    </>);

}