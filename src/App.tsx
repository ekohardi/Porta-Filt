import { useState } from 'react';
import { ExplodedAssembly } from './components/ExplodedAssembly';
import { OverviewHero } from './components/OverviewHero';
import { ComponentMenuPage } from './components/ComponentMenuPage';
import { VideoTab } from './components/VideoTab';
import { PORTAFILT_COMPONENTS } from './data/portaFiltData';

type ActiveTab = 'overview' | 'exploded' | 'components' | 'video';

const NAV_TABS: { id: ActiveTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'exploded', label: 'Exploded View' },
  { id: 'components', label: 'Components' },
  { id: 'video', label: 'Video' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedPartId, setSelectedPartId] = useState<string>(
    PORTAFILT_COMPONENTS[0].id
  );
  const [explosionPct, setExplosionPct] = useState<number>(0);
  const [showFlow, setShowFlow] = useState<boolean>(true);
  const [showCutaway, setShowCutaway] = useState<boolean>(true);

  const jumpToExplodedPart = (partId?: string) => {
    if (partId) {
      setSelectedPartId(partId);
    }
    setExplosionPct(100);
    setActiveTab('exploded');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single clean wordmark */}
          <button
            type="button"
            onClick={() => handleTabChange('overview')}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            PORTA-FILT
          </button>

          {/* Zone 2: Concise single-line navigation tabs */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-sky-600 text-slate-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => jumpToExplodedPart()}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explode Tool
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Strip (non-sticky to stay well within sticky height budget) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto"
      >
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-sky-50 text-sky-800 ring-1 ring-sky-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <>
            <OverviewHero
              onOpenExploded={() => jumpToExplodedPart()}
              onOpenComponents={() => handleTabChange('components')}
              onOpenVideo={() => handleTabChange('video')}
            />
            <div className="border-t border-slate-200 bg-slate-50">
              <ExplodedAssembly
                selectedId={selectedPartId}
                onSelectPart={setSelectedPartId}
                explosionPct={explosionPct}
                onChangeExplosion={setExplosionPct}
                showFlow={showFlow}
                onToggleFlow={() => setShowFlow((v) => !v)}
                showCutaway={showCutaway}
                onToggleCutaway={() => setShowCutaway((v) => !v)}
              />
            </div>
          </>
        )}

        {activeTab === 'exploded' && (
          <ExplodedAssembly
            selectedId={selectedPartId}
            onSelectPart={setSelectedPartId}
            explosionPct={explosionPct}
            onChangeExplosion={setExplosionPct}
            showFlow={showFlow}
            onToggleFlow={() => setShowFlow((v) => !v)}
            showCutaway={showCutaway}
            onToggleCutaway={() => setShowCutaway((v) => !v)}
          />
        )}

        {activeTab === 'components' && (
          <ComponentMenuPage onInspectInExploded={jumpToExplodedPart} />
        )}

        {activeTab === 'video' && <VideoTab />}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">PORTA-FILT</span>
            <span aria-hidden="true">·</span>
            <span>Portable Multi-Stage Filtration Tool Documentation</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
