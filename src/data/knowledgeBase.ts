export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  answer: string;
  consultationIntent?: boolean;
  topic: string;
}

export const suggestedPrompts = [
'What does Kennedy specialize in?',
'Can he help with Life Cycle Assessment?',
'Tell me about his climate research.',
'What experience does he have in carbon reduction?',
'Has he worked with healthcare sustainability?',
'Can I book a consultation?',
'Tell me about his Horizon 2020 research.'];


/**
 * Approved knowledge base derived from the CV. The assistant only answers from
 * these entries and never speculates beyond them.
 */
export const knowledgeBase: KnowledgeEntry[] = [
{
  id: 'specialisation',
  topic: 'Areas of expertise',
  keywords: ['specialize', 'specialise', 'expertise', 'what does he do', 'areas', 'skills', 'focus'],
  answer:
  'Kennedy is a PhD-trained Agricultural Economist and Sustainability Researcher. His core areas are life cycle assessment, climate change and adaptation, agricultural economics, carbon accounting and carbon farming, environmental impact assessment, ESG and sustainability strategy, renewable energy assessment, carbon markets and policy, and research and data analytics.'
},
{
  id: 'lca',
  topic: 'Life cycle assessment',
  keywords: ['lca', 'life cycle', 'lifecycle', 'simapro', 'openlca', 'environmental impact of a product'],
  answer:
  'Yes — life cycle assessment is one of his core competencies, carried out with tools such as SimaPro and OpenLCA. He has applied LCA to poultry production while at the University of Chester (CREST) and delivered LCA training at the Centre for Sustainable Healthcare in Oxford.',
  consultationIntent: true
},
{
  id: 'climate-research',
  topic: 'Climate research',
  keywords: ['climate', 'adaptation', 'resilience', 'climate research', 'climate change'],
  answer:
  'His climate work spans research and practice: climate adaptation and resilience research, UKRI-funded work on climate-resilient agrifood systems at the University of Chester, and climate and bioenergy policy analysis during four years as a Scientific Researcher at the Hungarian Research Institute of Agricultural Economics. He also served as Climate Change and Carbon Reduction Officer at Wrexham County Borough Council.'
},
{
  id: 'carbon',
  topic: 'Carbon reduction',
  keywords: ['carbon', 'emissions', 'net zero', 'footprint', 'reduction', 'carbon farming', 'carbon market'],
  answer:
  'As Climate Change and Carbon Reduction Officer at Wrexham County Borough Council he worked on renewable energy assessment, a Local Energy Action Plan, housing stock emissions, energy reduction pathways, solar PV performance and behaviour-change campaigns. At the Centre for Sustainable Healthcare he works on carbon emissions and resource use assessment. Carbon accounting, carbon farming and carbon markets and policy are listed core competencies.',
  consultationIntent: true
},
{
  id: 'healthcare',
  topic: 'Healthcare sustainability',
  keywords: ['healthcare', 'health', 'nhs', 'hospital', 'clinical'],
  answer:
  'Yes. Since 2025 he has been a Sustainability Analyst at the Centre for Sustainable Healthcare in Oxford, working on economic and environmental assessments, NHS sustainability, carbon emissions, resource use, sustainability initiatives and life cycle assessment training.',
  consultationIntent: true
},
{
  id: 'horizon',
  topic: 'Horizon 2020',
  keywords: ['horizon', 'h2020', 'eu project', 'biomass', 'bioenergy', 'feedstock', 'iluc'],
  answer:
  'During his time at the Hungarian Research Institute of Agricultural Economics (2019–2023) he led an international research team on a Horizon 2020 project on low-indirect land use change biomass feedstocks, working across multiple European countries. The work combined research, policy analysis and stakeholder engagement feeding into climate and bioenergy policy.'
},
{
  id: 'agriculture',
  topic: 'Agriculture',
  keywords: ['agriculture', 'agricultural', 'farm', 'farming', 'rural', 'agrifood', 'crop', 'poultry'],
  answer:
  'Agricultural economics is the foundation of his work: an MSc in Agribusiness and Rural Development, a BSc in Agroforestry and Rural Development, and research on sustainable agriculture, rural development and climate-resilient agrifood systems in Hungary and the United Kingdom.',
  consultationIntent: true
},
{
  id: 'education',
  topic: 'Education',
  keywords: ['phd', 'education', 'degree', 'qualification', 'study', 'university', 'msc', 'bsc'],
  answer:
  'He holds a PhD in Economics and Regional Science from Széchenyi István University, Hungary (2019–2024), an MSc in Agribusiness and Rural Development from the Hungarian University of Agriculture and Life Sciences (2016–2018) and a BSc in Agroforestry and Rural Development from the University of Kabianga, Kenya (2011–2015).'
},
{
  id: 'publications',
  topic: 'Publications',
  keywords: ['publication', 'paper', 'journal', 'published', 'research output', 'doi'],
  answer:
  'He has six peer-reviewed publications covering climate change adaptation, agricultural sustainability, environmental assessment and corporate sustainability. Individual titles and links are being added to the publications page.'
},
{
  id: 'experience',
  topic: 'Experience',
  keywords: ['experience', 'years', 'career', 'worked', 'roles', 'background', 'cv'],
  answer:
  'He has over eight years of experience across climate adaptation, environmental sustainability, carbon accounting, life cycle assessment, renewable energy, agricultural policy and sustainability research — in roles at the Centre for Sustainable Healthcare (Oxford), University of Chester CREST, Wrexham County Borough Council, the Hungarian Research Institute of Agricultural Economics and Discovery Research Centre Limited.'
},
{
  id: 'international',
  topic: 'International',
  keywords: ['international', 'where', 'located', 'country', 'kenya', 'hungary', 'uk', 'europe', 'remote'],
  answer:
  'His experience spans Kenya, Hungary and the United Kingdom, including Horizon 2020 research across multiple European countries. He is currently based in the United Kingdom and consultations are normally held remotely.'
},
{
  id: 'tools',
  topic: 'Tools',
  keywords: ['tools', 'software', 'spss', 'nvivo', 'gis', 'data analysis', 'technical'],
  answer:
  'His technical toolkit includes SimaPro, OpenLCA, SPSS, NVivo, GIS, data analysis, database management and MS Office.'
},
{
  id: 'booking',
  topic: 'Booking',
  keywords: ['book', 'booking', 'consultation', 'appointment', 'meeting', 'call', 'schedule', 'available', 'hire', 'engage'],
  answer:
  'Yes — consultations can be booked directly. You choose a consultation type, pick a date and time and share a short description of the challenge. Options include sustainability consultation, research consultation, LCA discussion, climate and carbon advisory, agricultural sustainability discussion and general consultation.',
  consultationIntent: true
},
{
  id: 'services',
  topic: 'Services',
  keywords: ['service', 'consulting', 'advisory', 'help', 'support', 'work with', 'engagement'],
  answer:
  'Advisory areas include sustainability strategy, carbon and climate advisory, life cycle assessment, sustainable agriculture, renewable energy assessment, environmental and sustainability assessment, research and evaluation, and policy and stakeholder advisory.',
  consultationIntent: true
},
{
  id: 'esg',
  topic: 'ESG',
  keywords: ['esg', 'reporting', 'corporate sustainability', 'strategy', 'organisation', 'organization'],
  answer:
  'ESG and sustainability strategy is a listed core competency, approached through evidence-based methods for organizational sustainability. His peer-reviewed work includes corporate sustainability.',
  consultationIntent: true
},
{
  id: 'energy',
  topic: 'Renewable energy',
  keywords: ['energy', 'solar', 'renewable', 'pv', 'electricity', 'heat'],
  answer:
  'Renewable energy assessment is a core competency. At Wrexham County Borough Council he assessed renewable energy options, contributed to a Local Energy Action Plan, analysed housing stock emissions and energy reduction pathways, and reviewed solar PV performance.',
  consultationIntent: true
}];


export const fallbackAnswer =
'I answer from Kennedy\'s approved professional information — his expertise, research, roles, publications and advisory areas. I do not have that detail on record. Ask me about life cycle assessment, climate and carbon work, agricultural sustainability, his Horizon 2020 research or booking a consultation, or send the question straight to Kennedy.';