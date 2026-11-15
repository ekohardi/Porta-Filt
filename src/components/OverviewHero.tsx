import { ArrowRight, Play, Layers } from 'lucide-react';
import {
  FILTRATION_STAGES,
  PORTAFILT_IMAGES,
} from '../data/portaFiltData';
import { ResilientImage } from './ResilientImage';

interface OverviewHeroProps {
  onOpenExploded: () => void;
  onOpenComponents: () => void;
  onOpenVideo: () => void;
}

export function OverviewHero({
  onOpenExploded,
  onOpenComponents,
  onOpenVideo,
}: OverviewHeroProps) {
  return (
    <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs font-mono text-sky-700 tracking-wide">
            Portable Multi-Stage PVC Filtration Column
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.12]">
            PORTA-FILT modular water filtration hardware
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Engineered from heavy-duty schedule uPVC columns, quick-disconnect
            SDL & SDD threaded unions, wire mesh media retainers, porous bio-gravel,
            and a 50 cm activated carbon bed for field-ready water clarification.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenExploded}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Exploded View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenComponents}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Component Menu</span>
            </button>
            <button
              type="button"
              onClick={onOpenVideo}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 text-sky-600" />
              <span>Watch Video Tab</span>
            </button>
          </div>
        </div>

        {/* Hero Real Hardware Photography */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col">
            <div className="flex-1 min-h-[260px] overflow-hidden bg-slate-100">
              <ResilientImage
                src={PORTAFILT_IMAGES.assembledComparison}
                alt="Assembled PORTA-FILT unit bare and with corrugated intake hose secured by stainless steel clamps"
                className="w-full h-full object-cover"
                fallbackLabel="PORTA-FILT Assembled Unit"
              />
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-white">
              <div className="text-xs font-medium text-slate-900">
                Full Column & Hose Assembly
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Bare column (left) · Ribbed hose & clamps (right)
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col">
            <div className="flex-1 min-h-[260px] overflow-hidden bg-slate-100">
              <ResilientImage
                src={PORTAFILT_IMAGES.partsFlatlay}
                alt="Disassembled PORTA-FILT parts flat-lay with measuring tape and workshop labels"
                className="w-full h-full object-cover"
                fallbackLabel="PORTA-FILT Parts Inventory"
              />
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-white">
              <div className="text-xs font-medium text-slate-900">
                Disassembled Parts Inventory
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                50 cm · 15 cm · 10 cm columns & fittings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Metric Technical Specification Strip */}
      <section
        aria-label="Technical specifications"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-slate-200"
      >
        <div className="px-2">
          <div className="text-xs text-slate-500">Active Filtration Stack</div>
          <div className="mt-1 text-2xl sm:text-3xl font-semibold font-mono text-slate-900 tabular-nums">
            75 cm
          </div>
          <div className="mt-1 text-xs text-slate-500">
            15 cm + 50 cm + 10 cm chambers
          </div>
        </div>
        <div className="px-2">
          <div className="text-xs text-slate-500">Modular Parts Count</div>
          <div className="mt-1 text-2xl sm:text-3xl font-semibold font-mono text-slate-900 tabular-nums">
            9 Parts
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Click-to-explode individual components
          </div>
        </div>
        <div className="px-2">
          <div className="text-xs text-slate-500">Filtration Media Beds</div>
          <div className="mt-1 text-2xl sm:text-3xl font-semibold font-mono text-slate-900 tabular-nums">
            3 Stages
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Volcanic gravel & activated carbon
          </div>
        </div>
        <div className="px-2">
          <div className="text-xs text-slate-500">Field Servicing</div>
          <div className="mt-1 text-2xl sm:text-3xl font-semibold font-mono text-slate-900">
            Tool-Free
          </div>
          <div className="mt-1 text-xs text-slate-500">
            SDL & SDD threaded union disconnect
          </div>
        </div>
      </section>

      {/* 4-Stage Filtration Mechanism */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono text-sky-700 tracking-wide">
              How PORTA-FILT Works
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Four-step hydraulic & media filtration path
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenExploded}
            className="text-sm font-medium text-sky-700 hover:text-sky-800 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Simulate flow in Exploded View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FILTRATION_STAGES.map((stage) => (
            <article
              key={stage.step}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-sky-700 tabular-nums">
                  {stage.step}. Stage
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
              <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                {stage.parts}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Media & Workshop Evidence Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <ResilientImage
              src={PORTAFILT_IMAGES.column15Gravel}
              alt="15 cm column packed with porous volcanic stone and gravel"
              className="w-full h-full object-cover"
              fallbackLabel="15 cm Bio-Gravel Stage"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              15 cm Coarse Gravel Chamber
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Porous stone bed traps heavy suspended solids and spreads water evenly before carbon contact.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <ResilientImage
              src={PORTAFILT_IMAGES.column50AndCarbon}
              alt="50 cm main column filled with fine black activated carbon granules"
              className="w-full h-full object-cover"
              fallbackLabel="50 cm Activated Carbon Stage"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              50 cm Activated Carbon Core
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Dense black carbon bed removes chlorine, organic odors, and dissolved discoloration.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <ResilientImage
              src={PORTAFILT_IMAGES.column10AndCap}
              alt="10 cm polishing column and perforated PVC end cap lined with Kasa Ayam mesh"
              className="w-full h-full object-cover"
              fallbackLabel="10 cm Polish & End Cap"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              10 cm Polish & Mesh-Lined Cap
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Perforated end cap lined with Kasa Ayam wire mesh prevents carbon loss during discharge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
