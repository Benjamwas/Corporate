export const profile = {
  name: 'Dr. Kennedy Ndue Mutua',
  shortName: 'Kennedy Mutua',
  logo: 'KENNEDY MUTUA',
  subLabel: 'Climate • Sustainability • Research',
  titles: [
  'PhD-trained Agricultural Economist',
  'Sustainability Researcher',
  'Climate & Environmental Specialist'],

  positioning: 'Building Evidence for a More Sustainable Future.',
  brandLine: 'Evidence. Sustainability. Impact.',
  intro:
  'Dr. Kennedy Ndue Mutua is a PhD-trained Agricultural Economist and Sustainability Researcher specializing in climate adaptation, environmental assessment, carbon management, sustainable agriculture and evidence-based sustainability strategy.',
  email: 'consult@kennedymutua.com',
  whatsapp: '254700000000',
  whatsappDisplay: 'WhatsApp',
  linkedin: 'https://www.linkedin.com/',
  baseLocation: 'Oxford, United Kingdom',
  defaultWhatsappMessage:
  'Hello Dr. Kennedy, I found your website and would like to discuss a sustainability consultation.'
} as const;

export interface TrustStat {
  count?: number;
  suffix?: string;
  display?: string;
  label: string;
  note: string;
}

export const trustStats: TrustStat[] = [
{ count: 8, suffix: '+', label: 'Years Experience', note: 'Across research, policy and practice' },
{ display: 'PhD', label: 'Economics & Regional Science', note: 'Széchenyi István University, Hungary' },
{ count: 6, label: 'Peer-Reviewed Publications', note: 'Climate, agriculture, sustainability' },
{ display: 'EU / UK', label: 'International Research Experience', note: 'Kenya • Hungary • United Kingdom' }];


export const heroCards = [
{ label: '8+ Years Experience', detail: 'Research, policy & practice' },
{ label: 'PhD Economics & Regional Science', detail: 'Széchenyi István University' },
{ label: 'Climate & Sustainability', detail: 'Adaptation • Carbon • LCA' },
{ label: '6 Peer-Reviewed Publications', detail: 'Evidence for decisions' }] as
const;

export const philosophyFlow = [
{ step: 'Research', detail: 'Framing the question with rigour' },
{ step: 'Data', detail: 'Quantitative, qualitative, mixed-method' },
{ step: 'Environmental Assessment', detail: 'LCA, impact and carbon analysis' },
{ step: 'Policy & Strategy', detail: 'Evidence translated for decisions' },
{ step: 'Climate Action', detail: 'Implementation and measurable impact' }] as
const;

export const toolkit = [
{ name: 'SimaPro', note: 'Life cycle assessment' },
{ name: 'OpenLCA', note: 'Life cycle assessment' },
{ name: 'SPSS', note: 'Statistical analysis' },
{ name: 'NVivo', note: 'Qualitative analysis' },
{ name: 'GIS', note: 'Spatial analysis' },
{ name: 'Data Analysis', note: 'Modelling & evaluation' },
{ name: 'Database Management', note: 'Research data systems' },
{ name: 'MS Office', note: 'Reporting & documentation' }] as
const;

export const geographies = [
{
  flag: '🇰🇪',
  country: 'Kenya',
  note: 'Undergraduate study and early research experience',
  x: 58,
  y: 62
},
{
  flag: '🇭🇺',
  country: 'Hungary',
  note: 'MSc, PhD and scientific research roles',
  x: 53,
  y: 34
},
{
  flag: '🇬🇧',
  country: 'United Kingdom',
  note: 'Sustainability and environmental research roles',
  x: 45,
  y: 28
},
{
  flag: '🇪🇺',
  country: 'Europe',
  note: 'Horizon 2020 research across multiple countries',
  x: 51,
  y: 41
}] as
const;

export const geographyCards = [
'International Research',
'European Climate Policy',
'African Agricultural Context',
'Cross-sector Sustainability'] as
const;