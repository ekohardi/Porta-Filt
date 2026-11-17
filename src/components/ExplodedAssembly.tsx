import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Eye,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';
import { PORTAFILT_COMPONENTS, PortaFiltComponent } from '../data/portaFiltData';
import { ResilientImage } from './ResilientImage';

interface ExplodedAssemblyProps {
  selectedId: string;
  onSelectPart: (id: string) => void;
  explosionPct: number;
  onChangeExplosion: (pct: number) => void;
  showFlow: boolean;
  onToggleFlow: () => void;
  showCutaway: boolean;
  onToggleCutaway: () => void;
}

export function ExplodedAssembly({
  selectedId,
  onSelectPart,
  explosionPct,
  onChangeExplosion,
  showFlow,
  onToggleFlow,
  showCutaway,
  onToggleCutaway,
}: ExplodedAssemblyProps) {
  const isExploded = explosionPct > 25;
  const factor = explosionPct / 100;

  const selectedIndex = useMemo(
    () => Math.max(0, PORTAFILT_COMPONENTS.findIndex((c) => c.id === selectedId)),
    [selectedId]
  );
  const activePart: PortaFiltComponent = PORTAFILT_COMPONENTS[selectedIndex];

  const handleDiagramPartClick = (partId: string) => {
    if (explosionPct < 60) {
      onChangeExplosion(100);
    }
    onSelectPart(partId);
  };

  const handleStep = (direction: -1 | 1) => {
    const nextIndex =
      (selectedIndex + direction + PORTAFILT_COMPONENTS.length) %
      PORTAFILT_COMPONENTS.length;
    if (explosionPct < 60) {
      onChangeExplosion(100);
    }
    onSelectPart(PORTAFILT_COMPONENTS[nextIndex].id);
  };

  const partOpacity = (id: string) => {
    if (!isExploded) return 1;
    return selectedId === id ? 1 : 0.72;
  };

  const partStroke = (id: string) => {
    return selectedId === id ? '#0284C7' : '#334155';
  };

  const partStrokeWidth = (id: string) => {
    return selectedId === id ? 2.4 : 1.25;
  };

  // Smooth explosion offsets (in SVG coordinate units)
  const hoseX = -96 * factor;
  const hoseY = -44 * factor;
  const klemX = -52 * factor;
  const klemY = -44 * factor;
  const elbowY = -44 * factor;
  const sdlY = -20 * factor;
  const col15Y = 12 * factor;
  const shockUpperY = 44 * factor;
  const meshY = 66 * factor;
  const pipa50Y = 104 * factor;
  const col10CapY = 158 * factor;

  return (
    <section className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header & Controls Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-mono text-sky-700 tracking-wide">
            01. Interactive Hardware Explorer · 9 Modular Components
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Click any PORTA-FILT part to explode & inspect its function
          </h2>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onChangeExplosion(isExploded ? 0 : 100)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isExploded
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            {isExploded ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span>Assemble Unit</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Explode Assembly</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleFlow}
            aria-pressed={showFlow}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showFlow
                ? 'bg-sky-50 border-sky-300 text-sky-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Water Flow: {showFlow ? 'On' : 'Off'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleCutaway}
            aria-pressed={showCutaway}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showCutaway
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Media Cutaway: {showCutaway ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>

      {/* Three-Zone Workbench Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Zone 1: Component Menu (Left) */}
        <aside
          aria-label="Component Menu"
          className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-semibold text-slate-900">Component Menu</h3>
            </div>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              {PORTAFILT_COMPONENTS.length} Parts
            </span>
          </div>

          <nav className="space-y-1">
            {PORTAFILT_COMPONENTS.map((part) => {
              const isSelected = part.id === selectedId;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => handleDiagramPartClick(part.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 text-sky-950 ring-1 ring-sky-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`font-mono text-xs pt-0.5 tabular-nums shrink-0 ${
                      isSelected ? 'text-sky-700 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {part.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-snug truncate">
                      {part.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {part.workshopLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Explosion Slider inside control deck */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="explosion-slider" className="font-medium text-slate-700">
                Separation Distance
              </label>
              <span className="font-mono text-slate-600 tabular-nums">
                {explosionPct}%
              </span>
            </div>
            <input
              id="explosion-slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={explosionPct}
              onChange={(e) => onChangeExplosion(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Assembled</span>
              <span>Exploded</span>
            </div>
          </div>
        </aside>

        {/* Zone 2: Interactive Exploded Schematic Canvas (Center) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="font-medium text-slate-800">
                {isExploded ? 'Exploded View' : 'Assembled View'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Click any element on the tool</span>
            </div>

            {explosionPct > 0 && (
              <button
                type="button"
                onClick={() => onChangeExplosion(0)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Schematic Canvas */}
          <div
            className="relative mt-3 w-full rounded-lg border border-slate-100 bg-slate-50/70 overflow-hidden select-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(148,163,184,0.28) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <svg
              viewBox="0 0 560 760"
              className="w-full h-auto max-h-[680px] mx-auto block"
              role="img"
              aria-label="Interactive exploded schematic diagram of PORTA-FILT water filtration tool"
            >
              <defs>
                {/* PVC Pipe Cylindrical Gradients */}
                <linearGradient id="pvcBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="28%" stopColor="#64748B" />
                  <stop offset="55%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="pvcFitting" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#526071" />
                  <stop offset="32%" stopColor="#7C8B9E" />
                  <stop offset="68%" stopColor="#526071" />
                  <stop offset="100%" stopColor="#3B4758" />
                </linearGradient>
                <linearGradient id="hoseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#64748B" />
                  <stop offset="40%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <linearGradient id="steelClamp" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="45%" stopColor="#F8FAFC" />
                  <stop offset="70%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <pattern id="gravelPattern" width="14" height="14" patternUnits="userSpaceOnUse">
                  <rect width="14" height="14" fill="#453A30" />
                  <circle cx="4" cy="4" r="3" fill="#927556" />
                  <circle cx="10" cy="5" r="2.5" fill="#785E44" />
                  <circle cx="6" cy="11" r="2.8" fill="#A68868" />
                  <circle cx="12" cy="11" r="2" fill="#5C4938" />
                </pattern>
                <pattern id="carbonPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#0F172A" />
                  <circle cx="2.5" cy="2.5" r="1.4" fill="#334155" />
                  <circle cx="7.5" cy="3" r="1.2" fill="#1E293B" />
                  <circle cx="5" cy="7.5" r="1.5" fill="#334155" />
                  <circle cx="8.5" cy="8.5" r="1" fill="#475569" />
                </pattern>
                <pattern id="wireMeshPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                  <path
                    d="M 6 0 L 0 6 M 0 0 L 6 6"
                    stroke="#334155"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                </pattern>
              </defs>

              {/* Axis Centerline Guidelines (Visible when exploding) */}
              {factor > 0.05 && (
                <g opacity={factor * 0.65}>
                  <line
                    x1="120"
                    y1={122 + elbowY}
                    x2="340"
                    y2={122 + elbowY}
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                  />
                  <line
                    x1="340"
                    y1={115 + elbowY}
                    x2="340"
                    y2={585 + col10CapY}
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                  />
                </g>
              )}

              {/* 01. FLEXIBLE RIBBED HOSE */}
              <motion.g
                animate={{ x: hoseX, y: hoseY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('hose')}
                className="cursor-pointer"
                opacity={partOpacity('hose')}
              >
                <rect
                  x="130"
                  y="98"
                  width="156"
                  height="48"
                  rx="4"
                  fill="url(#hoseGrad)"
                  stroke={partStroke('hose')}
                  strokeWidth={partStrokeWidth('hose')}
                />
                {/* Ribbed corrugations */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <rect
                    key={i}
                    x={136 + i * 10.5}
                    y="95"
                    width="5.5"
                    height="54"
                    rx="2.5"
                    fill="#94A3B8"
                    stroke="#334155"
                    strokeWidth="0.9"
                  />
                ))}
                {isExploded && (
                  <g>
                    <line x1="190" y1="92" x2="190" y2="66" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="132"
                      y="58"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      01 · Ribbed Hose
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 02. DUAL HOSE CLAMPS (KLEM) */}
              <motion.g
                animate={{ x: klemX, y: klemY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('klem')}
                className="cursor-pointer"
                opacity={partOpacity('klem')}
              >
                {/* Clamp 1 */}
                <rect
                  x="275"
                  y="94"
                  width="9"
                  height="56"
                  rx="2"
                  fill="url(#steelClamp)"
                  stroke={partStroke('klem')}
                  strokeWidth={partStrokeWidth('klem')}
                />
                <rect
                  x="273"
                  y="88"
                  width="13"
                  height="8"
                  rx="1.5"
                  fill="#CBD5E1"
                  stroke="#334155"
                  strokeWidth="1"
                />
                {/* Clamp 2 */}
                <rect
                  x="291"
                  y="94"
                  width="9"
                  height="56"
                  rx="2"
                  fill="url(#steelClamp)"
                  stroke={partStroke('klem')}
                  strokeWidth={partStrokeWidth('klem')}
                />
                <rect
                  x="289"
                  y="88"
                  width="13"
                  height="8"
                  rx="1.5"
                  fill="#CBD5E1"
                  stroke="#334155"
                  strokeWidth="1"
                />
                {isExploded && (
                  <g>
                    <line x1="288" y1="86" x2="288" y2="56" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="252"
                      y="48"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      02 · Dual Klem
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 03. 90° PVC ELBOW */}
              <motion.g
                animate={{ y: elbowY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('elbow')}
                className="cursor-pointer"
                opacity={partOpacity('elbow')}
              >
                {/* Horizontal inlet collar */}
                <rect
                  x="296"
                  y="95"
                  width="36"
                  height="54"
                  rx="3"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('elbow')}
                  strokeWidth={partStrokeWidth('elbow')}
                />
                {/* Curved corner elbow body */}
                <path
                  d="M 326 95 Q 368 95 368 137 L 368 166 L 312 166 L 312 149 Q 312 136 326 136 Z"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('elbow')}
                  strokeWidth={partStrokeWidth('elbow')}
                />
                {/* Vertical outlet collar */}
                <rect
                  x="310"
                  y="152"
                  width="60"
                  height="26"
                  rx="3"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('elbow')}
                  strokeWidth={partStrokeWidth('elbow')}
                />
                {isExploded && (
                  <g>
                    <line x1="372" y1="126" x2="404" y2="126" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="130"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      03 · 90° Elbow
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 04. THREADED UNION PAIR (SDL & SDD) */}
              <motion.g
                animate={{ y: sdlY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('sdl-sdd')}
                className="cursor-pointer"
                opacity={partOpacity('sdl-sdd')}
              >
                {/* SDD Female Collar */}
                <rect
                  x="308"
                  y="179"
                  width="64"
                  height="28"
                  rx="3"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('sdl-sdd')}
                  strokeWidth={partStrokeWidth('sdl-sdd')}
                />
                {/* Grip ribs on SDD */}
                {[318, 329, 340, 351, 362].map((rx) => (
                  <line
                    key={rx}
                    x1={rx}
                    y1="181"
                    x2={rx}
                    y2="205"
                    stroke="#334155"
                    strokeWidth="1.2"
                  />
                ))}
                {/* Thread gap */}
                <rect
                  x="320"
                  y="207"
                  width="40"
                  height="7"
                  fill="#1E293B"
                />
                {/* SDL Male Hex Shoulder */}
                <rect
                  x="311"
                  y="214"
                  width="58"
                  height="22"
                  rx="2"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('sdl-sdd')}
                  strokeWidth={partStrokeWidth('sdl-sdd')}
                />
                {isExploded && (
                  <g>
                    <line x1="374" y1="204" x2="404" y2="204" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="208"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      04 · SDL & SDD
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 05. UPPER FILTRATION COLUMN (15 cm) */}
              <motion.g
                animate={{ y: col15Y }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('kolom-15')}
                className="cursor-pointer"
                opacity={partOpacity('kolom-15')}
              >
                <rect
                  x="316"
                  y="237"
                  width="48"
                  height="76"
                  rx="2"
                  fill="url(#pvcBody)"
                  stroke={partStroke('kolom-15')}
                  strokeWidth={partStrokeWidth('kolom-15')}
                />
                {showCutaway && (
                  <rect
                    x="323"
                    y="244"
                    width="34"
                    height="62"
                    rx="2"
                    fill="url(#gravelPattern)"
                    stroke="#94A3B8"
                    strokeWidth="0.9"
                  />
                )}
                {!showCutaway && (
                  <text
                    x="340"
                    y="280"
                    textAnchor="middle"
                    className="fill-red-400 text-[10px] font-mono font-semibold"
                  >
                    15 cm
                  </text>
                )}
                {isExploded && (
                  <g>
                    <line x1="366" y1="275" x2="404" y2="275" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="279"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      05 · Kolom 15 cm
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 06. EXTERNAL SOCKET COUPLING (SAMBUNGAN SHOCK LUAR) */}
              <motion.g
                animate={{ y: shockUpperY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('shock-luar')}
                className="cursor-pointer"
                opacity={partOpacity('shock-luar')}
              >
                <rect
                  x="310"
                  y="311"
                  width="60"
                  height="30"
                  rx="3"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('shock-luar')}
                  strokeWidth={partStrokeWidth('shock-luar')}
                />
                <line
                  x1="312"
                  y1="326"
                  x2="368"
                  y2="326"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                {isExploded && (
                  <g>
                    <line x1="372" y1="326" x2="404" y2="326" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="330"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      06 · Shock Luar
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 07. WIRE MESH RETAINER SCREEN (KASA AYAM) */}
              <motion.g
                animate={{ y: meshY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('kasa-ayam')}
                className="cursor-pointer"
                opacity={partOpacity('kasa-ayam')}
              >
                <ellipse
                  cx="340"
                  cy="346"
                  rx="24"
                  ry="8"
                  fill="url(#wireMeshPattern)"
                  stroke={partStroke('kasa-ayam')}
                  strokeWidth={partStrokeWidth('kasa-ayam')}
                />
                {isExploded && (
                  <g>
                    <line x1="366" y1="346" x2="404" y2="346" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="350"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      07 · Kasa Ayam Mesh
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 08. MAIN CARBON COLUMN (50 cm) */}
              <motion.g
                animate={{ y: pipa50Y }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('pipa-50')}
                className="cursor-pointer"
                opacity={partOpacity('pipa-50')}
              >
                <rect
                  x="316"
                  y="353"
                  width="48"
                  height="168"
                  rx="2"
                  fill="url(#pvcBody)"
                  stroke={partStroke('pipa-50')}
                  strokeWidth={partStrokeWidth('pipa-50')}
                />
                {showCutaway && (
                  <rect
                    x="323"
                    y="361"
                    width="34"
                    height="152"
                    rx="2"
                    fill="url(#carbonPattern)"
                    stroke="#64748B"
                    strokeWidth="0.9"
                  />
                )}
                {!showCutaway && (
                  <text
                    x="340"
                    y="442"
                    textAnchor="middle"
                    className="fill-red-400 text-[11px] font-mono font-semibold"
                  >
                    50 cm
                  </text>
                )}
                {isExploded && (
                  <g>
                    <line x1="366" y1="436" x2="404" y2="436" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="440"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      08 · Main Pipe 50 cm
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 09. EXTERNAL SOCKET COUPLING (SAMBUNGAN SHOCK LUAR) */}
              <motion.g
                animate={{ y: shockUpperY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('shock-luar')}
                className="cursor-pointer"
                opacity={partOpacity('shock-luar')}
              >
                <rect
                  x="310"
                  y="311"
                  width="60"
                  height="30"
                  rx="3"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('shock-luar')}
                  strokeWidth={partStrokeWidth('shock-luar')}
                />
                <line
                  x1="312"
                  y1="326"
                  x2="368"
                  y2="326"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                {isExploded && (
                  <g>
                    <line x1="372" y1="326" x2="404" y2="326" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="330"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      09 · Shock Luar
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 10. WIRE MESH RETAINER SCREEN (KASA AYAM) */}
              <motion.g
                animate={{ y: meshY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('kasa-ayam')}
                className="cursor-pointer"
                opacity={partOpacity('kasa-ayam')}
              >
                <ellipse
                  cx="310"
                  cy="518"
                  rx="24"
                  ry="8"
                  fill="url(#wireMeshPattern)"
                  stroke={partStroke('kasa-ayam')}
                  strokeWidth={partStrokeWidth('kasa-ayam')}
                />
                {isExploded && (
                  <g>
                    <line x1="366" y1="346" x2="404" y2="346" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="350"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      10 · Kasa Ayam Mesh
                    </text>
                  </g>
                )}
              </motion.g>

              {/* 11. LOWER 10 cm COLUMN + PERFORATED END CAP */}
              <motion.g
                animate={{ y: col10CapY }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => handleDiagramPartClick('kolom-10-cap')}
                className="cursor-pointer"
                opacity={partOpacity('kolom-10-cap')}
              >
                {/* Lower coupling bridge */}
                <rect
                  x="310"
                  y="518"
                  width="60"
                  height="22"
                  rx="2"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('kolom-10-cap')}
                  strokeWidth={partStrokeWidth('kolom-10-cap')}
                />
                {/* 10 cm gravel chamber */}
                <rect
                  x="316"
                  y="539"
                  width="48"
                  height="32"
                  rx="2"
                  fill="url(#pvcBody)"
                  stroke={partStroke('kolom-10-cap')}
                  strokeWidth={partStrokeWidth('kolom-10-cap')}
                />
                {showCutaway && (
                  <rect
                    x="323"
                    y="543"
                    width="34"
                    height="24"
                    rx="1.5"
                    fill="url(#gravelPattern)"
                    stroke="#94A3B8"
                    strokeWidth="0.8"
                  />
                )}
                {/* Perforated End Cap (Tutup Pipa Paralon) */}
                <rect
                  x="311"
                  y="568"
                  width="58"
                  height="28"
                  rx="4"
                  fill="url(#pvcFitting)"
                  stroke={partStroke('kolom-10-cap')}
                  strokeWidth={partStrokeWidth('kolom-10-cap')}
                />
                {/* Drilled exit holes indicator */}
                {[323, 331, 340, 349, 357].map((hx) => (
                  <circle key={hx} cx={hx} cy="588" r="2" fill="#0F172A" />
                ))}
                {!showCutaway && (
                  <text
                    x="340"
                    y="558"
                    textAnchor="middle"
                    className="fill-red-400 text-[9px] font-mono font-semibold"
                  >
                    10 cm
                  </text>
                )}
                {isExploded && (
                  <g>
                    <line x1="371" y1="565" x2="404" y2="565" stroke="#0284C7" strokeWidth="1" />
                    <text
                      x="410"
                      y="569"
                      className="fill-slate-800 text-[11px] font-mono font-semibold"
                    >
                      11 · 10 cm + End Cap
                    </text>
                  </g>
                )}
              </motion.g>

              {/* Animated Water Flow Particles */}
              {showFlow && (
                <g pointerEvents="none">
                  {/* Horizontal stream in hose */}
                  {[0, 0.45, 0.9].map((delay, i) => (
                    <motion.circle
                      key={`h-${i}`}
                      r="3.5"
                      fill="#0EA5E9"
                      initial={{ cx: 140 + hoseX, cy: 122 + hoseY, opacity: 0 }}
                      animate={{
                        cx: [140 + hoseX, 340],
                        cy: [122 + hoseY, 122 + elbowY],
                        opacity: [0, 0.95, 0.95, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay,
                        ease: 'linear',
                      }}
                    />
                  ))}
                  {/* Vertical downward stream through stages */}
                  {[0.2, 0.7, 1.2, 1.7].map((delay, i) => (
                    <motion.circle
                      key={`v-${i}`}
                      r="3.5"
                      fill="#0284C7"
                      initial={{ cx: 340, cy: 130 + elbowY, opacity: 0 }}
                      animate={{
                        cy: [130 + elbowY, 595 + col10CapY],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay,
                        ease: 'linear',
                      }}
                    />
                  ))}
                  {/* Treated outflow droplets exiting perforated cap */}
                  {[323, 340, 357].map((ox, i) => (
                    <motion.circle
                      key={`out-${i}`}
                      cx={ox}
                      r="2.5"
                      fill="#38BDF8"
                      animate={{
                        cy: [596 + col10CapY, 624 + col10CapY],
                        opacity: [0.95, 0],
                      }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: 'easeIn',
                      }}
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Zone 3: Selected Component Function & Real Photo Inspector (Right) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
          {/* Header & Step Controls */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                Part {activePart.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{activePart.categoryLabel}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Previous component"
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Next component"
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Part Title & Workshop Designation */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-slate-900 leading-snug">
              {activePart.name}
            </h3>
            <p className="mt-1 text-xs font-mono text-slate-500">
              Workshop Label: {activePart.workshopLabel}
            </p>
          </div>

          {/* Real Hardware Photo */}
          <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <ResilientImage
                src={activePart.image}
                alt={activePart.imageCaption}
                className={`w-full h-full object-cover ${activePart.imageFocusClass || 'object-center'}`}
                fallbackLabel={activePart.name}
              />
            </div>
            <p className="px-3 py-2 text-xs text-slate-600 bg-slate-50 border-t border-slate-200">
              {activePart.imageCaption}
            </p>
          </div>

          {/* Spec Strip (Unboxed tabular figures) */}
          <dl className="mt-4 grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
            <div>
              <dt className="text-slate-500">Dimensions</dt>
              <dd className="mt-0.5 font-mono font-medium text-slate-900 tabular-nums">
                {activePart.dimensions}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Quantity</dt>
              <dd className="mt-0.5 font-mono font-medium text-slate-900 tabular-nums">
                {activePart.quantity}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-slate-500">Material Construction</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{activePart.material}</dd>
            </div>
          </dl>

          {/* Engineering Function Explanations */}
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700">
            <div>
              <h4 className="text-xs font-semibold text-slate-900">Primary Function</h4>
              <p className="mt-1 text-slate-600">{activePart.primaryFunction}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900">
                Role in Filtration Sequence
              </h4>
              <p className="mt-1 text-slate-600">{activePart.filtrationRole}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-semibold text-slate-900">
                Assembly & Care Note
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {activePart.maintenanceTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
