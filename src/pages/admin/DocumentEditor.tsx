import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArchiveIcon,
  BoldIcon,
  CheckIcon,
  EyeIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  SaveIcon,
  SendIcon,
  TableIcon } from
'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ActionButton } from '../../components/ui/ActionButton';
import { useSiteData } from '../../contexts/SiteDataContext';
import type { ResourceStatus } from '../../types';
import { cn } from '../../utils/cn';
import { useSeo } from '../../utils/seo';

const workflow: ResourceStatus[] = ['Draft', 'Review', 'Published', 'Archived'];

export function DocumentEditor() {
  const { id } = useParams<{id: string;}>();
  const { documents, saveDocument } = useSiteData();
  const navigate = useNavigate();
  const doc = documents.find((item) => item.id === id);
  const editorRef = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState(() => ({
    title: doc?.title ?? '',
    description: doc?.description ?? '',
    type: doc?.type ?? 'Report',
    version: doc?.version ?? 'v0.1'
  }));
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useSeo({
    title: `${meta.title || 'Document'} — Editor`,
    description: 'Rich text document editor for public resources.',
    path: `/admin/documents/${id ?? ''}`
  });

  useEffect(() => {
    if (doc && editorRef.current && !preview) {
      editorRef.current.innerHTML = doc.body;
    }
  }, [doc?.id, preview]);

  if (!doc) return <Navigate to="/admin/documents" replace />;

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const persist = (status: ResourceStatus) => {
    saveDocument({
      ...doc,
      ...meta,
      status,
      body: editorRef.current?.innerHTML ?? doc.body,
      updated: new Date().toISOString().slice(0, 10)
    });
    setSaved(status === 'Draft' ? 'Draft saved' : `Moved to ${status}`);
    window.setTimeout(() => setSaved(null), 2400);
  };

  const insertTable = () => {
    exec(
      'insertHTML',
      '<table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>—</td><td>—</td></tr></tbody></table>'
    );
  };

  const insertLink = () => {
    const url = window.prompt('Link URL');
    if (url) exec('createLink', url);
  };

  const toolbar = [
  { label: 'Bold', icon: BoldIcon, action: () => exec('bold') },
  { label: 'Italic', icon: ItalicIcon, action: () => exec('italic') },
  { label: 'Heading 2', icon: Heading2Icon, action: () => exec('formatBlock', '<h2>') },
  { label: 'Heading 3', icon: Heading3Icon, action: () => exec('formatBlock', '<h3>') },
  { label: 'Bulleted list', icon: ListIcon, action: () => exec('insertUnorderedList') },
  { label: 'Numbered list', icon: ListOrderedIcon, action: () => exec('insertOrderedList') },
  { label: 'Link', icon: LinkIcon, action: insertLink },
  { label: 'Table', icon: TableIcon, action: insertTable }];


  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/documents')}
            className="text-[13px] text-ink-subtle transition-colors duration-200 hover:text-accent">
            
            ← All documents
          </button>
          <h1 className="mt-3 font-display text-[26px] font-semibold tracking-tightest text-ink">
            Document editor
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {saved &&
          <span className="flex items-center gap-1.5 text-[13px] text-accent">
              <CheckIcon className="h-3.5 w-3.5" /> {saved}
            </span>
          }
          <ActionButton variant="glass" size="sm" onClick={() => setPreview((prev) => !prev)}>
            <EyeIcon className="h-3.5 w-3.5" />
            {preview ? 'Edit' : 'Preview'}
          </ActionButton>
          <ActionButton variant="glass" size="sm" onClick={() => persist('Draft')}>
            <SaveIcon className="h-3.5 w-3.5" />
            Save draft
          </ActionButton>
          <ActionButton variant="glass" size="sm" onClick={() => persist('Review')}>
            <SendIcon className="h-3.5 w-3.5" />
            Send to review
          </ActionButton>
          <ActionButton size="sm" onClick={() => persist('Published')}>
            Publish
          </ActionButton>
          <ActionButton variant="quiet" size="sm" onClick={() => persist('Archived')}>
            <ArchiveIcon className="h-3.5 w-3.5" />
            Archive
          </ActionButton>
        </div>
      </header>

      <ol className="mt-7 flex flex-wrap items-center gap-2">
        {workflow.map((stage, index) =>
        <li key={stage} className="flex items-center gap-2">
            <span
            className={cn(
              'rounded-full px-3 py-1.5 text-[12.5px]',
              doc.status === stage ? 'bg-accent text-accent-contrast' : 'text-ink-subtle'
            )}>
            
              {stage}
            </span>
            {index < workflow.length - 1 && <span aria-hidden="true" className="h-px w-5 bg-line" />}
          </li>
        )}
      </ol>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.55fr_0.45fr]">
        <GlassCard strong className="p-6">
          {!preview ?
          <>
              <div className="flex flex-wrap gap-1.5 border-b border-line/60 pb-4">
                {toolbar.map((item) =>
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line/70 text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
                
                    <item.icon className="h-4 w-4" />
                  </button>
              )}
              </div>
              <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-multiline="true"
              aria-label="Document body"
              className="prose-editor mt-5 min-h-[24rem] text-[15px] leading-relaxed text-ink focus:outline-none" />
            
            </> :

          <div
            className="prose-editor min-h-[24rem] text-[15px] leading-relaxed text-ink"
            dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML ?? doc.body }} />

          }
        </GlassCard>

        <GlassCard className="h-fit p-6">
          <h2 className="text-[11.5px] tracking-[0.14em] text-ink-subtle">DOCUMENT DETAILS</h2>
          <div className="mt-5 space-y-3">
            <MetaField
              label="Title"
              value={meta.title}
              onChange={(value) => setMeta((prev) => ({ ...prev, title: value }))} />
            
            <MetaField
              label="Description"
              value={meta.description}
              onChange={(value) => setMeta((prev) => ({ ...prev, description: value }))} />
            
            <MetaField
              label="Type"
              value={meta.type}
              onChange={(value) => setMeta((prev) => ({ ...prev, type: value }))} />
            
            <MetaField
              label="Version"
              value={meta.version}
              onChange={(value) => setMeta((prev) => ({ ...prev, version: value }))} />
            
          </div>
          <p className="mt-5 text-[12.5px] leading-relaxed text-ink-subtle">
            Published documents appear on the public resources page with version and updated date.
          </p>
        </GlassCard>
      </div>
    </div>);

}

function MetaField({
  label,
  value,
  onChange




}: {label: string;value: string;onChange: (value: string) => void;}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] text-ink-muted">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-3.5 py-2.5 text-[13.5px] text-ink focus:border-accent/60 focus:outline-none" />
      
    </label>);

}