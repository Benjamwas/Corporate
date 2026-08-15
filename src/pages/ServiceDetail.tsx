import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, MessageCircleIcon } from 'lucide-react';
import { services } from '../data/services';
import { expertiseAreas } from '../data/expertise';
import { images } from '../data/images';
import { profile } from '../data/profile';
import { faqs } from '../data/faqs';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { ActionExternal, ActionLink } from '../components/ui/ActionButton';
import { ConsultationCta } from '../components/sections/ConsultationCta';
import { buildWhatsappLink } from '../utils/assistant';
import { faqSchema, professionalServiceSchema, useSeo } from '../utils/seo';
import { useUi } from '../contexts/UiContext';

const serviceImages: Record<string, string> = {
  'sustainability-strategy': images.carbon,
  'carbon-accounting': images.energy,
  'life-cycle-assessment': images.research,
  'sustainable-agriculture': images.agriculture
};

export function ServiceDetail() {
  const { slug } = useParams<{slug: string;}>();
  const service = services.find((item) => item.slug === slug && item.hasDetailPage);
  const { setInterestedService } = useUi();

  React.useEffect(() => {
    if (service) setInterestedService(service.title);
  }, [service, setInterestedService]);

  useSeo({
    title: service ?
    `${service.title} — Advisory by Dr. Kennedy Ndue Mutua` :
    'Services — Dr. Kennedy Ndue Mutua',
    description: service?.summary ?? 'Sustainability and climate advisory services.',
    path: `/services/${slug ?? ''}`,
    image: service ? serviceImages[service.slug] ?? images.carbon : images.carbon,
    schema: service ?
    professionalServiceSchema(service.title, service.summary) :
    undefined
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedFaqs = faqs.slice(0, 3);
  const relatedExpertise = expertiseAreas.filter((area) =>
  area.title.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())
  );

  return (
    <>
      <PageHeader
        kicker="Service"
        title={service.title}
        lede={service.summary}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}>
        
        <div className="flex flex-wrap gap-3">
          <ActionLink to="/booking" size="lg">
            Book a Consultation
            <ArrowRightIcon className="h-4 w-4" />
          </ActionLink>
          <ActionExternal
            size="lg"
            href={buildWhatsappLink(
              profile.whatsapp,
              `Hello Dr. Kennedy, I found your website and would like to discuss ${service.title.toLowerCase()}.`
            )}>
            
            <MessageCircleIcon className="h-4 w-4" />
            Continue on WhatsApp
          </ActionExternal>
        </div>
      </PageHeader>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-content gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <GlassCard strong className="overflow-hidden">
              <img
                src={serviceImages[service.slug] ?? images.carbon}
                alt=""
                aria-hidden="true"
                className="h-56 w-full object-cover sm:h-72" />
              
              <div className="p-8 sm:p-10">
                <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight tracking-tightest text-ink">
                  How the work is approached
                </h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">{service.detail}</p>
                <h3 className="mt-9 text-[11.5px] tracking-[0.16em] text-ink-subtle">
                  WHAT AN ENGAGEMENT TYPICALLY INCLUDES
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-muted">
                    
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {item}
                    </li>
                  )}
                </ul>
              </div>
            </GlassCard>
          </Reveal>

          <div className="space-y-4">
            {relatedExpertise.length > 0 &&
            <Reveal delay={0.06}>
                <GlassCard className="p-7">
                  <h3 className="text-[11.5px] tracking-[0.16em] text-ink-subtle">RELATED EXPERTISE</h3>
                  <ul className="mt-4 space-y-3">
                    {relatedExpertise.map((area) =>
                  <li key={area.slug}>
                        <p className="font-display text-[15px] font-medium text-ink">{area.title}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                          {area.description}
                        </p>
                      </li>
                  )}
                  </ul>
                </GlassCard>
              </Reveal>
            }

            <Reveal delay={0.1}>
              <GlassCard className="p-7">
                <h3 className="text-[11.5px] tracking-[0.16em] text-ink-subtle">FREQUENT QUESTIONS</h3>
                <dl className="mt-4 space-y-5">
                  {relatedFaqs.map((faq) =>
                  <div key={faq.question}>
                      <dt className="font-display text-[14.5px] font-medium leading-snug text-ink">
                        {faq.question}
                      </dt>
                      <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{faq.answer}</dd>
                    </div>
                  )}
                </dl>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationCta />
      <FaqStructuredData items={relatedFaqs} />
    </>);

}

function FaqStructuredData({ items }: {items: {question: string;answer: string;}[];}) {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'service-faq-schema';
    script.textContent = JSON.stringify(faqSchema(items));
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [items]);
  return null;
}