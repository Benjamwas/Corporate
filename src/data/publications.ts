import type { EducationRecord, PublicationRecord } from '../types';

/**
 * The CV confirms six peer-reviewed publications but does not provide individual
 * titles. Records below describe topic areas only — titles, journals and DOIs are
 * left to be supplied by the owner, and the UI supports external links once added.
 */
export const publications: PublicationRecord[] = [
{
  id: 'pub-1',
  topic: 'Climate change adaptation',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution on climate change adaptation and resilience in agricultural and environmental systems.'
},
{
  id: 'pub-2',
  topic: 'Climate change adaptation',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution examining adaptation responses and their implications for policy.'
},
{
  id: 'pub-3',
  topic: 'Agricultural sustainability',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution on agricultural sustainability, rural development and sustainable production systems.'
},
{
  id: 'pub-4',
  topic: 'Agricultural sustainability',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution on sustainable agriculture and agricultural economics.'
},
{
  id: 'pub-5',
  topic: 'Environmental assessment',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution on environmental assessment and the evaluation of environmental impacts.'
},
{
  id: 'pub-6',
  topic: 'Corporate sustainability',
  year: 'Peer-reviewed',
  journalStatus: 'Journal details to be confirmed',
  description:
  'Peer-reviewed contribution on corporate sustainability and organizational sustainability performance.'
}];


export const publicationTopics = [
'Climate change adaptation',
'Agricultural sustainability',
'Environmental assessment',
'Corporate sustainability'];


export const education: EducationRecord[] = [
{
  degree: 'PhD',
  field: 'Economics & Regional Science',
  institution: 'Széchenyi István University',
  location: 'Hungary',
  period: '2019–2024'
},
{
  degree: 'MSc',
  field: 'Agribusiness & Rural Development',
  institution: 'Hungarian University of Agriculture and Life Sciences',
  location: 'Hungary',
  period: '2016–2018'
},
{
  degree: 'BSc',
  field: 'Agroforestry & Rural Development',
  institution: 'University of Kabianga',
  location: 'Kenya',
  period: '2011–2015'
}];


export const researchThemes = [
{
  title: 'Climate adaptation',
  description: 'Resilience and adaptation in agricultural and environmental systems.'
},
{
  title: 'Agricultural sustainability',
  description: 'Sustainable production systems, rural development and agricultural economics.'
},
{
  title: 'Environmental assessment',
  description: 'Life cycle assessment and environmental impact evaluation.'
},
{
  title: 'Corporate sustainability',
  description: 'Organizational sustainability performance and evidence-based strategy.'
},
{
  title: 'Carbon and bioenergy',
  description: 'Carbon accounting, biomass feedstocks and bioenergy policy.'
},
{
  title: 'Sustainable transitions',
  description: 'How evidence supports transitions across sectors and regions.'
}];