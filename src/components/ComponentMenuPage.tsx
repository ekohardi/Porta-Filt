import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import {
  ComponentCategory,
  PORTAFILT_COMPONENTS,
} from '../data/portaFiltData';
import { ResilientImage } from './ResilientImage';

interface ComponentMenuPageProps {
  onInspectInExploded: (partId: string) => void;
}

const CATEGORIES: { id: ComponentCategory; label: string }[] = [
  { id: 'all', label: 'All Components' },
  { id: 'columns', label: 'Pipe Columns' },
  { id: 'fittings', label: 'Fittings & Seals' },
  { id: 'media', label: 'Media & Mesh' },
];

export function ComponentMenuPage({
  onInspectInExploded,
}: ComponentMenuPageProps) {
  const [category, setCategory] = useState<ComponentCategory>('all');
  const [query, setQuery] = useState('');

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTAFILT_COMPONENTS.filter((item) => {
      const matchesCat = category === 'all' || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.workshopLabel.toLowerCase().includes(q) ||
        item.primaryFunction.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  return (
    <section className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-mono text-sky-700 tracking-wide">
            Hardware Catalog · 9 Modular Assemblies
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            PORTA-FILT Component Menu
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Browse every pipe column, coupling, hose clamp, wire mesh retainer, and
            filtration medium inside PORTA-FILT. Select any component to jump directly
            into its exploded assembly view.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search part or Indonesian label..."
            aria-label="Search PORTA-FILT components"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Segmented Filter Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-slate-500 tabular-nums">
          Showing {filteredComponents.length} of {PORTAFILT_COMPONENTS.length} components
        </div>
      </div>

      {/* Component Cards Grid */}
      {filteredComponents.length === 0 ? (
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-sm font-medium text-slate-900">
            No components match "{query}"
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try searching for "Klem", "Carbon", "15 cm", "Elbow", or clear the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((part) => (
            <article
              key={part.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300"
            >
              <div>
                {/* Real Hardware Thumbnail */}
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <ResilientImage
                    src={part.image}
                    alt={part.imageCaption}
                    className={`w-full h-full object-cover ${part.imageFocusClass || 'object-center'}`}
                    fallbackLabel={part.name}
                  />
                </div>

                {/* Metadata & Title */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-sky-700 tabular-nums">
                      {part.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{part.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{part.dimensions}</span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug">
                    {part.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-mono text-slate-500">
                    {part.workshopLabel}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {part.primaryFunction}
                  </p>
                </div>
              </div>

              {/* Footer Action */}
              <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 truncate">
                  {part.quantity} · {part.material}
                </span>
                <button
                  type="button"
                  onClick={() => onInspectInExploded(part.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explode Part</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
