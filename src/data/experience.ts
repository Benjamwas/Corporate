import type { ExperienceRole } from '../types';
import { images } from './images';

export const experienceRoles: ExperienceRole[] = [
{
  id: 'csh-oxford',
  role: 'Sustainability Analyst',
  organisation: 'Centre for Sustainable Healthcare',
  location: 'Oxford, United Kingdom',
  period: '2025–2026',
  focus: 'Sustainable healthcare',
  highlights: [
  'Economic and environmental assessments',
  'NHS sustainability',
  'Carbon emissions analysis',
  'Resource use',
  'Sustainability initiatives',
  'Life cycle assessment training'],

  image: images.healthcare
},
{
  id: 'chester-crest',
  role: 'Researcher',
  organisation: 'University of Chester — CREST',
  location: 'Chester, United Kingdom',
  period: '2024–2025',
  focus: 'Environmental assessment & agrifood systems',
  highlights: [
  'Environmental impact assessment',
  'Poultry production life cycle assessment',
  'DEFRA-funded research',
  'UKRI climate-resilient agrifood systems',
  'Sustainability initiative evaluation'],

  image: images.research
},
{
  id: 'wrexham',
  role: 'Climate Change & Carbon Reduction Officer',
  organisation: 'Wrexham County Borough Council',
  location: 'Wrexham, Wales',
  period: '2024',
  focus: 'Local climate action & energy',
  highlights: [
  'Renewable energy assessment',
  'Local Energy Action Plan',
  'Housing stock emissions',
  'Energy reduction pathways',
  'Solar PV performance',
  'Behaviour-change campaigns'],

  image: images.energy
},
{
  id: 'hungary-aki',
  role: 'Scientific Researcher',
  organisation: 'Hungarian Research Institute of Agricultural Economics',
  location: 'Budapest, Hungary',
  period: '2019–2023',
  focus: 'Horizon 2020 research leadership',
  highlights: [
  'Horizon 2020 research',
  'International research team leadership',
  'Biomass feedstocks',
  'Climate and bioenergy policy',
  'Rural development',
  'Sustainable agriculture',
  'Mixed-method research'],

  image: images.biomass
},
{
  id: 'discovery-research',
  role: 'Research Assistant',
  organisation: 'Discovery Research Centre Limited',
  location: 'Kenya',
  period: '2017–2018',
  focus: 'Applied research foundations',
  highlights: [
  'Data collection',
  'Literature reviews',
  'Statistical analysis',
  'Research reports',
  'Grant proposals',
  'Fieldwork'],

  image: images.field
}];