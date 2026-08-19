import type { InsightArticle } from '../types';
import { images } from './images';

export const insights: InsightArticle[] = [
{
  slug: 'evidence-before-targets',
  title: 'Evidence before targets: why assessment should come first',
  excerpt:
  'Organizations often commit to sustainability targets before understanding where their environmental pressures actually sit. Assessment first makes the target defensible.',
  category: 'Sustainability strategy',
  readTime: '6 min read',
  status: 'In preparation',
  image: images.carbon
},
{
  slug: 'what-lca-can-and-cannot-tell-you',
  title: 'What a life cycle assessment can — and cannot — tell you',
  excerpt:
  'System boundaries decide the answer long before the impact results appear. A short guide to reading an LCA critically.',
  category: 'Life cycle assessment',
  readTime: '8 min read',
  status: 'In preparation',
  image: images.research
},
{
  slug: 'climate-resilient-agrifood',
  title: 'Climate-resilient agrifood systems: adaptation as an economic question',
  excerpt:
  'Adaptation decisions in agriculture are rarely only technical. They are allocation decisions under uncertainty.',
  category: 'Sustainable agriculture',
  readTime: '7 min read',
  status: 'In preparation',
  image: images.agriculture
},
{
  slug: 'carbon-markets-signals',
  title: 'Carbon markets and the signals they send to land managers',
  excerpt:
  'Carbon farming and carbon markets change incentives at field level. Understanding that pathway matters for policy design.',
  category: 'Carbon markets',
  readTime: '6 min read',
  status: 'In preparation',
  image: images.biomass
},
{
  slug: 'renewable-energy-local-plans',
  title: 'Local energy action plans: turning assessment into delivery',
  excerpt:
  'Housing stock emissions, solar PV performance and behaviour change sit in the same plan. They rarely sit in the same conversation.',
  category: 'Renewable energy',
  readTime: '5 min read',
  status: 'In preparation',
  image: images.energy
},
{
  slug: 'sustainable-healthcare-footprint',
  title: 'Sustainable healthcare: measuring the footprint of care',
  excerpt:
  'Health systems are large environmental actors. Economic and environmental assessment gives clinical teams something to act on.',
  category: 'Sustainable healthcare',
  readTime: '7 min read',
  status: 'In preparation',
  image: images.healthcare
}];


export const insightCategories = [
'All',
'Sustainability strategy',
'Life cycle assessment',
'Sustainable agriculture',
'Carbon markets',
'Renewable energy',
'Sustainable healthcare'];