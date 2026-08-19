import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArchiveIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ActionButton } from '../../components/ui/ActionButton';
import { useSiteData } from '../../contexts/SiteDataContext';
import type { ResourceStatus } from '../../types';
import { cn } from '../../utils/cn';
import { useSeo } from '../../utils/seo';

const statusStyles: Record<ResourceStatus, string> = {
  Published: 'bg-accent/15 text-accent',
  Review: 'bg-ocean-400/15 text-accent-ocean',
  Draft: 'bg-ink/8 text-ink-muted',
  Archived: 'bg-clay-400/15 text-accent-clay'
};

export function AdminDocuments() {
  const { documents, saveDocument, deleteDocument } = useSiteData();
  const navigate = useNavigate();

  useSeo({
    title: 'Documents — Owner portal',
    description: 'Create, review, publish and archive downloadable documents.',
    path: '/admin/documents'
  });

  const createDocument = () => {
    const id = `doc-${Date.now()}`;
    saveDocument({
      id,
      title: 'Untitled document',
      description: '',
      type: 'Report',
      version: 'v0.1',
      updated: new Date().toISOString().slice(0, 10),
      status: 'Draft',
      fileSize: '—',
      downloads: 0,
      body: '<h2>Untitled document</h2><p>Start writing…</p>'
    });
    navigate(`/admin/documents/${id}`);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold tracking-tightest text-ink">Documents</h1>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            Draft → Review → Publish. Only published documents appear on the public resources page.
          </p>
        </div>
        <ActionButton onClick={createDocument}>
          <PlusIcon className="h-4 w-4" />
          New document
        </ActionButton>
      </header>

      <GlassCard className="mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left">
            <thead>
              <tr className="border-b border-line/60 text-[11.5px] tracking-[0.1em] text-ink-subtle">
                <th scope="col" className="px-6 py-4 font-normal">TITLE</th>
                <th scope="col" className="px-6 py-4 font-normal">TYPE</th>
                <th scope="col" className="px-6 py-4 font-normal">VERSION</th>
                <th scope="col" className="px-6 py-4 font-normal">UPDATED</th>
                <th scope="col" className="px-6 py-4 font-normal">STATUS</th>
                <th scope="col" className="px-6 py-4 font-normal">DOWNLOADS</th>
                <th scope="col" className="px-6 py-4 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {documents.map((doc) =>
              <tr key={doc.id}>
                  <td className="px-6 py-4">
                    <Link
                    to={`/admin/documents/${doc.id}`}
                    className="font-display text-[14.5px] font-medium text-ink transition-colors duration-200 hover:text-accent">
                    
                      {doc.title}
                    </Link>
                    <p className="mt-1 max-w-sm text-[12.5px] leading-snug text-ink-subtle">
                      {doc.description || 'No description yet'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-ink-muted">{doc.type}</td>
                  <td className="px-6 py-4 text-[13px] tabular-nums text-ink-muted">{doc.version}</td>
                  <td className="px-6 py-4 text-[13px] tabular-nums text-ink-muted">{doc.updated}</td>
                  <td className="px-6 py-4">
                    <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[11.5px]',
                      statusStyles[doc.status]
                    )}>
                    
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] tabular-nums text-ink-muted">{doc.downloads}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                      to={`/admin/documents/${doc.id}`}
                      aria-label={`Edit ${doc.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent">
                      
                        <PencilIcon className="h-3.5 w-3.5" />
                      </Link>
                      <button
                      type="button"
                      onClick={() => saveDocument({ ...doc, status: 'Archived' })}
                      aria-label={`Archive ${doc.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent">
                      
                        <ArchiveIcon className="h-3.5 w-3.5" />
                      </button>
                      <button
                      type="button"
                      onClick={() => deleteDocument(doc.id)}
                      aria-label={`Delete ${doc.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent-clay">
                      
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>);

}