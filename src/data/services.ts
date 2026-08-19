import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
{
  slug: 'sustainability-strategy',
  title: 'Sustainability Strategy',
  summary:
  'Help organizations understand sustainability challenges and develop evidence-informed strategies.',
  detail:
  'Sustainability strategy work begins with understanding what an organization actually does, where its environmental pressures sit and what evidence already exists. From there the aim is a clear, defensible direction rather than a broad statement of intent.',
  icon: 'Compass',
  deliverables: [
  'Review of existing sustainability evidence and reporting',
  'Priority mapping of environmental pressures',
  'Evidence-informed strategy direction',
  'Recommendations framed for internal decision-making'],

  hasDetailPage: true,
  active: true
},
{
  slug: 'carbon-accounting',
  title: 'Carbon & Climate Advisory',
  summary: 'Support carbon accounting, reduction planning and climate-related initiatives.',
  detail:
  'Carbon work draws on experience in carbon accounting, emissions assessment and reduction pathway analysis across housing stock, agricultural systems and healthcare settings.',
  icon: 'Footprints',
  deliverables: [
  'Emissions and resource-use assessment',
  'Reduction pathway analysis',
  'Carbon reduction planning support',
  'Evidence for climate-related decisions'],

  hasDetailPage: true,
  active: true
},
{
  slug: 'life-cycle-assessment',
  title: 'Life Cycle Assessment',
  summary: 'Assess environmental impacts across products, systems and processes.',
  detail:
  'Life cycle assessment carried out with established tools such as SimaPro and OpenLCA, applied to production systems, products and service pathways.',
  icon: 'Recycle',
  deliverables: [
  'Goal, scope and system boundary definition',
  'Inventory development and data review',
  'Impact assessment in SimaPro or OpenLCA',
  'Interpretation, reporting and training support'],

  hasDetailPage: true,
  active: true
},
{
  slug: 'sustainable-agriculture',
  title: 'Sustainable Agriculture',
  summary:
  'Advisory around agricultural sustainability, climate resilience and rural development.',
  detail:
  'Advisory grounded in agricultural economics, climate-resilient agrifood systems research and rural development work across European and African contexts.',
  icon: 'Sprout',
  deliverables: [
  'Assessment of agricultural sustainability performance',
  'Climate resilience and adaptation review',
  'Rural development and value-chain perspective',
  'Evidence for programme and policy design'],

  hasDetailPage: true,
  active: true
},
{
  slug: 'renewable-energy-assessment',
  title: 'Renewable Energy Assessment',
  summary: 'Evaluate renewable energy opportunities and energy reduction pathways.',
  detail:
  'Renewable energy assessment experience includes local energy action planning, housing stock emissions analysis and solar PV performance review.',
  icon: 'Sun',
  deliverables: [
  'Renewable energy options review',
  'Energy reduction pathway analysis',
  'Performance review of installed generation',
  'Input to local energy planning'],

  hasDetailPage: false,
  active: true
},
{
  slug: 'environmental-assessment',
  title: 'Environmental & Sustainability Assessment',
  summary: 'Support environmental impact and sustainability assessments.',
  detail:
  'Assessment support for organizations that need to understand the environmental implications of a project, service or production system before committing to it.',
  icon: 'ClipboardCheck',
  deliverables: [
  'Environmental impact assessment support',
  'Sustainability initiative evaluation',
  'Resource use analysis',
  'Structured findings and recommendations'],

  hasDetailPage: false,
  active: true
},
{
  slug: 'research-evaluation',
  title: 'Research & Evaluation',
  summary: 'Research design, data analysis, evaluation and evidence development.',
  detail:
  'Research support across quantitative, qualitative and mixed-method approaches, including evaluation design, statistical analysis and reporting.',
  icon: 'BarChart3',
  deliverables: [
  'Research and evaluation design',
  'Quantitative and qualitative analysis',
  'Literature review and synthesis',
  'Research reporting and dissemination'],

  hasDetailPage: false,
  active: true
},
{
  slug: 'policy-stakeholder-advisory',
  title: 'Policy & Stakeholder Advisory',
  summary:
  'Translate research into useful evidence for policy and stakeholder decision-making.',
  detail:
  'Policy advisory built on Horizon 2020 research leadership, climate and bioenergy policy analysis and stakeholder engagement across multiple European countries.',
  icon: 'Landmark',
  deliverables: [
  'Policy analysis and briefing',
  'Stakeholder engagement design',
  'Evidence translation for non-technical audiences',
  'Support for consultation responses'],

  hasDetailPage: false,
  active: true
}];


export const consultationTypes = [
{ id: 'sustainability', label: 'Sustainability Consultation', duration: '45 min', active: true },
{ id: 'research', label: 'Research Consultation', duration: '45 min', active: true },
{ id: 'lca', label: 'LCA Discussion', duration: '30 min', active: true },
{ id: 'carbon', label: 'Climate & Carbon Advisory', duration: '45 min', active: true },
{ id: 'agriculture', label: 'Agricultural Sustainability Discussion', duration: '30 min', active: true },
{ id: 'general', label: 'General Consultation', duration: '20 min', active: true }];