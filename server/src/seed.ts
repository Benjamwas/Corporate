import 'dotenv/config';
import { supabase } from './config/supabase.js';
import { config } from './config/env.js';

async function seed() {
  console.log('Seeding database...');

  const adminUsers = [
    { email: 'kennedy@ecotenable.com', password: 'PopePaul2060!' },
    { email: 'benjamin@ecotenable.com', password: 'PopePaul2060!' },
  ];

  for (const admin of adminUsers) {
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: admin.email,
      password: admin.password,
      email_confirm: true,
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`Admin user ${admin.email} already exists.`);
      } else {
        console.error(`Auth seed error for ${admin.email}:`, authError.message);
      }
    } else {
      console.log(`Created admin user: ${authUser.user.email}`);
    }
  }

  const documents = [
    {
      id: 'doc-profile',
      title: 'Professional Profile',
      description: 'Two-page professional profile covering qualifications, expertise areas and research experience.',
      type: 'Professional profile',
      version: 'v2.1',
      updated: '2026-06-02',
      status: 'Published',
      file_size: '412 KB',
      downloads: 148,
      body: '<h2>Professional Profile</h2><p>Dr. Kennedy Ndue Mutua is a PhD-trained Agricultural Economist and Sustainability Researcher with over eight years of experience across climate adaptation, environmental assessment, carbon management and sustainable agriculture.</p><h3>Expertise</h3><ul><li>Life cycle assessment (SimaPro, OpenLCA)</li><li>Carbon accounting and reduction pathways</li><li>Agricultural economics and rural development</li><li>Research design, evaluation and data analysis</li></ul>',
    },
    {
      id: 'doc-services',
      title: 'Consulting Services Overview',
      description: 'Summary of advisory areas, how engagements are typically structured and what evidence is produced.',
      type: 'Service document',
      version: 'v1.4',
      updated: '2026-05-18',
      status: 'Published',
      file_size: '286 KB',
      downloads: 96,
      body: '<h2>Consulting Services Overview</h2><p>Advisory work is grounded in assessment. Each engagement begins by establishing what evidence already exists and what decision the evidence needs to support.</p><h3>Areas</h3><ul><li>Sustainability strategy</li><li>Carbon and climate advisory</li><li>Life cycle assessment</li><li>Research and evaluation</li></ul>',
    },
    {
      id: 'doc-agreement',
      title: 'Consulting Agreement Template',
      description: 'Standard consulting agreement used for advisory engagements, including scope and confidentiality terms.',
      type: 'Consulting agreement',
      version: 'v1.2',
      updated: '2026-04-27',
      status: 'Published',
      file_size: '198 KB',
      downloads: 41,
      body: '<h2>Consulting Agreement</h2><p>This template sets out the standard terms for advisory engagements, including scope of work, deliverables, timelines, confidentiality and intellectual property.</p>',
    },
    {
      id: 'doc-lca-primer',
      title: 'Life Cycle Assessment Primer',
      description: 'Short introduction to LCA scope, system boundaries and how results should be interpreted.',
      type: 'Research resource',
      version: 'v1.0',
      updated: '2026-03-11',
      status: 'Published',
      file_size: '524 KB',
      downloads: 213,
      body: '<h2>Life Cycle Assessment Primer</h2><p>An LCA quantifies environmental impacts across the life of a product, process or service. The system boundary determines what is counted, and therefore shapes the conclusion.</p><h3>Stages</h3><ol><li>Goal and scope definition</li><li>Inventory analysis</li><li>Impact assessment</li><li>Interpretation</li></ol>',
    },
    {
      id: 'doc-carbon-checklist',
      title: 'Carbon Reduction Planning Checklist',
      description: 'Working checklist for organizations preparing an emissions baseline and reduction pathway.',
      type: 'Report',
      version: 'v0.9',
      updated: '2026-07-04',
      status: 'Review',
      file_size: '164 KB',
      downloads: 0,
      body: '<h2>Carbon Reduction Planning Checklist</h2><p>Draft checklist covering boundary setting, data collection, baseline calculation and pathway definition.</p>',
    },
    {
      id: 'doc-agri-brief',
      title: 'Climate-Resilient Agrifood Systems Brief',
      description: 'Draft briefing note on adaptation options within agrifood value chains.',
      type: 'Report',
      version: 'v0.4',
      updated: '2026-07-22',
      status: 'Draft',
      file_size: '132 KB',
      downloads: 0,
      body: '<h2>Climate-Resilient Agrifood Systems</h2><p>Draft note on adaptation options and the evidence required to prioritise between them.</p>',
    },
  ];

  const { error: docError } = await supabase.from('documents').upsert(documents, { onConflict: 'id' });
  if (docError) console.error('Document seed error:', docError.message);
  else console.log(`Seeded ${documents.length} documents.`);

  const leads = [
    {
      id: 'lead-1', name: 'Amara Okonjo', organisation: 'Rift Valley Agri Cooperative',
      topic: 'Environmental impact assessment', source: 'Ask Kennedy', date: '2026-08-12',
      stage: 'New', email: 'amara@rvagri.co.ke', phone: '+254 712 000 111',
      message: 'We need help assessing the environmental impact of a 400-hectare irrigation expansion.',
      transcript: 'Visitor: I need help assessing the environmental impact of our agricultural project.\nAssistant: Environmental impact assessment and Life Cycle Assessment are among Kennedy\'s areas of expertise...',
    },
    {
      id: 'lead-2', name: 'Tom Bradshaw', organisation: 'NHS Trust — Estates',
      topic: 'Healthcare carbon accounting', source: 'Contact form', date: '2026-08-10',
      stage: 'Contacted', email: 't.bradshaw@example.nhs.uk', phone: null,
      message: 'Looking for support with a departmental carbon footprint baseline.', transcript: null,
    },
    {
      id: 'lead-3', name: 'Sofia Almasi', organisation: 'Danube Bioenergy',
      topic: 'Biomass feedstock policy', source: 'Ask Kennedy', date: '2026-08-06',
      stage: 'Qualified', email: 'sofia@danube-bio.hu', phone: '+36 30 000 0000',
      message: 'Interested in advisory support on low-ILUC feedstock certification.', transcript: null,
    },
    {
      id: 'lead-4', name: 'Grace Wanjiru', organisation: 'Kenyatta University',
      topic: 'Research collaboration', source: 'Booking', date: '2026-07-29',
      stage: 'Converted', email: 'g.wanjiru@example.ac.ke', phone: null,
      message: 'Proposing a joint paper on adaptation economics.', transcript: null,
    },
    {
      id: 'lead-5', name: 'Lars Jensen', organisation: 'Nordic Food Group',
      topic: 'Product LCA', source: 'WhatsApp', date: '2026-07-14',
      stage: 'Closed', email: 'lars@example.dk', phone: null,
      message: 'Timeline did not align this year, revisiting in Q1.', transcript: null,
    },
  ];

  const { error: leadError } = await supabase.from('leads').upsert(leads, { onConflict: 'id' });
  if (leadError) console.error('Lead seed error:', leadError.message);
  else console.log(`Seeded ${leads.length} leads.`);

  const bookings = [
    {
      id: 'bk-1', name: 'Amara Okonjo', email: 'amara@rvagri.co.ke',
      organisation: 'Rift Valley Agri Cooperative', consultation_type: 'Agricultural Sustainability Discussion',
      date: '2026-08-18', time: '10:30', status: 'Confirmed',
      notes: 'Irrigation expansion — environmental impact scope.',
    },
    {
      id: 'bk-2', name: 'Tom Bradshaw', email: 't.bradshaw@example.nhs.uk',
      organisation: 'NHS Trust — Estates', consultation_type: 'Climate & Carbon Advisory',
      date: '2026-08-19', time: '14:00', status: 'Confirmed', notes: null,
    },
    {
      id: 'bk-3', name: 'Sofia Almasi', email: 'sofia@danube-bio.hu',
      organisation: 'Danube Bioenergy', consultation_type: 'LCA Discussion',
      date: '2026-08-21', time: '09:00', status: 'Pending', notes: null,
    },
    {
      id: 'bk-4', name: 'Helen Marsh', email: 'helen@example.org',
      organisation: 'Wrexham Housing Partnership', consultation_type: 'Sustainability Consultation',
      date: '2026-08-25', time: '11:30', status: 'Pending', notes: null,
    },
  ];

  const { error: bookingError } = await supabase.from('bookings').upsert(bookings, { onConflict: 'id' });
  if (bookingError) console.error('Booking seed error:', bookingError.message);
  else console.log(`Seeded ${bookings.length} bookings.`);

  const settings = [
    { key: 'notification_email', value: config.adminEmail },
    { key: 'whatsapp_number', value: '+44 7700 000000' },
  ];

  const { error: settingError } = await supabase.from('settings').upsert(settings, { onConflict: 'key' });
  if (settingError) console.error('Settings seed error:', settingError.message);
  else console.log(`Seeded ${settings.length} settings.`);

  console.log('Seed complete.');
}

seed();
