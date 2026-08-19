import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-subtle">
        <li>
          <Link to="/" className="transition-colors duration-200 hover:text-accent">
            Home
          </Link>
        </li>
        {items.map((item) =>
        <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {item.to ?
          <Link to={item.to} className="transition-colors duration-200 hover:text-accent">
                {item.label}
              </Link> :

          <span className="text-ink-muted">{item.label}</span>
          }
          </li>
        )}
      </ol>
    </nav>);

}