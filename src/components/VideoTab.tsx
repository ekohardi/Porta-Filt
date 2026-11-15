import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  Film,
  Link2,
  Pause,
  Play,
  RotateCcw,
  Trash2,
  Upload,
} from 'lucide-react';
import { PORTAFILT_IMAGES } from '../data/portaFiltData';
import { ResilientImage } from './ResilientImage';

interface StoryboardChapter {
  id: string;
  step: string;
  title: string;
  durationSec: number;
  image: string;
  caption: string;
  partsUsed: string;
}

const STORYBOARD_CHAPTERS: StoryboardChapter[] = [
  {
    id: 'ch-1',
    step: '01',
    title: 'Disassembled Parts & Dimension Check',
    durationSec: 6,
    image: PORTAFILT_IMAGES.partsFlatlay,
    caption:
      'All PORTA-FILT elements laid out beside a measuring tape: 50 cm main pipe, 15 cm and 10 cm filtration columns, SDL & SDD union pair, 90° elbow, two external shock couplings, twin Klem clamps, Kasa Ayam wire mesh, and perforated end cap.',
    partsUsed: 'Full 9-Part Hardware Kit',
  },
  {
    id: 'ch-2',
    step: '02',
    title: 'Hose Clamping & Mesh Retainer Seating',
    durationSec: 6,
    image: PORTAFILT_IMAGES.processCollage,
    caption:
      'Securing the corrugated spiral hose to the elbow with dual stainless steel Klem bands using a screwdriver, and seating the circular Kasa Ayam wire mesh screen cleanly inside the PVC socket coupling.',
    partsUsed: 'Klem · Ribbed Hose · Kasa Ayam · Shock Luar',
  },
  {
    id: 'ch-3',
    step: '03',
    title: 'Multi-Stage Media Packing (Gravel & Carbon)',
    durationSec: 6,
    image: PORTAFILT_IMAGES.column50AndCarbon,
    caption:
      'Packing the 50 cm primary pipe with granular black activated carbon for odor and chemical adsorption, flanked by porous volcanic gravel chambers in the 15 cm and 10 cm columns.',
    partsUsed: '50 cm Carbon Pipe · 15 cm & 10 cm Gravel Columns',
  },
  {
    id: 'ch-4',
    step: '04',
    title: 'Final Assembly & Field Operation',
    durationSec: 6,
    image: PORTAFILT_IMAGES.assembledComparison,
    caption:
      'Complete vertical PORTA-FILT stack ready for gravity or pump-fed operation, with tool-free SDL & SDD disassembly for fast media rinsing and replacement.',
    partsUsed: 'Complete PORTA-FILT Assembly',
  },
];

const STORAGE_VIDEO_URL_KEY = 'porta_filt_custom_video_url';

function parseEmbedUrl(rawUrl: string): { type: 'iframe' | 'video'; src: string } | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    // YouTube standard or share links
    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      let videoId = '';
      if (host.includes('youtu.be')) {
        videoId = parsed.pathname.replace('/', '');
      } else if (parsed.pathname.includes('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0] || '';
      } else if (parsed.pathname.includes('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1]?.split('/')[0] || '';
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
      if (videoId) {
        return {
          type: 'iframe',
          src: `https://www.youtube.com/embed/${videoId}?rel=0`,
        };
      }
    }

    // Vimeo links
    if (host.includes('vimeo.com')) {
      const vimeoId = parsed.pathname.split('/').filter(Boolean).pop();
      if (vimeoId) {
        return {
          type: 'iframe',
          src: `https://player.vimeo.com/video/${vimeoId}`,
        };
      }
    }

    // Google Drive preview links
    if (host.includes('drive.google.com') && parsed.pathname.includes('/file/d/')) {
      const fileId = parsed.pathname.split('/file/d/')[1]?.split('/')[0];
      if (fileId) {
        return {
          type: 'iframe',
          src: `https://drive.google.com/file/d/${fileId}/preview`,
        };
      }
    }

    return { type: 'video', src: trimmed };
  } catch {
    return null;
  }
}

export function VideoTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [localFileName, setLocalFileName] = useState<string>('');
  const [externalUrlInput, setExternalUrlInput] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_VIDEO_URL_KEY) || '';
    } catch {
      return '';
    }
  });
  const [savedExternalUrl, setSavedExternalUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_VIDEO_URL_KEY) || '';
    } catch {
      return '';
    }
  });
  const [urlError, setUrlError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  // Storyboard fallback player state
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [reelProgress, setReelProgress] = useState(0);

  const parsedExternal = parseEmbedUrl(savedExternalUrl);
  const hasCustomVideo = Boolean(localVideoUrl || parsedExternal);

  useEffect(() => {
    return () => {
      if (localVideoUrl) {
        URL.revokeObjectURL(localVideoUrl);
      }
    };
  }, [localVideoUrl]);

  useEffect(() => {
    if (!isPlayingReel || hasCustomVideo) return;
    const interval = window.setInterval(() => {
      setReelProgress((prev) => {
        if (prev >= 100) {
          setChapterIndex((c) => (c + 1) % STORYBOARD_CHAPTERS.length);
          return 0;
        }
        return prev + 2;
      });
    }, 120);
    return () => window.clearInterval(interval);
  }, [isPlayingReel, hasCustomVideo]);

  const handleVideoFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUrlError('Please select a valid video file (.mp4, .webm, or .mov).');
      return;
    }
    setUrlError('');
    if (localVideoUrl) {
      URL.revokeObjectURL(localVideoUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setLocalVideoUrl(objectUrl);
    setLocalFileName(file.name);
    setIsPlayingReel(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleVideoFile(e.target.files?.[0]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleVideoFile(e.dataTransfer.files?.[0]);
  };

  const handleSaveExternalUrl = () => {
    const result = parseEmbedUrl(externalUrlInput);
    if (!result) {
      setUrlError('Enter a valid video link (MP4, YouTube, Vimeo, or Google Drive).');
      return;
    }
    setUrlError('');
    if (localVideoUrl) {
      URL.revokeObjectURL(localVideoUrl);
      setLocalVideoUrl(null);
      setLocalFileName('');
    }
    setSavedExternalUrl(externalUrlInput.trim());
    try {
      localStorage.setItem(STORAGE_VIDEO_URL_KEY, externalUrlInput.trim());
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const handleClearCustomVideo = () => {
    if (localVideoUrl) {
      URL.revokeObjectURL(localVideoUrl);
    }
    setLocalVideoUrl(null);
    setLocalFileName('');
    setSavedExternalUrl('');
    setExternalUrlInput('');
    setUrlError('');
    try {
      localStorage.removeItem(STORAGE_VIDEO_URL_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const activeChapter = STORYBOARD_CHAPTERS[chapterIndex];

  return (
    <section className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-mono text-sky-700 tracking-wide">
            Demonstration Media · PORTA-FILT Video Stage
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            PORTA-FILT Assembly & Operation Video
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Play your own PORTA-FILT demonstration video file or link directly in this tab,
            or step through the workshop photo sequence below.
          </p>
        </div>

        {/* Upload / Clear Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Load Your Video File</span>
          </button>

          {hasCustomVideo && (
            <button
              type="button"
              onClick={handleClearCustomVideo}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-slate-500" />
              <span>Switch to Workshop Reel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split: Video Stage + Controls/Chapters */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center: 16:9 Theater Player */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative aspect-video bg-slate-950 w-full overflow-hidden transition-all ${
              isDragging ? 'ring-4 ring-sky-500/60' : ''
            }`}
          >
            {localVideoUrl ? (
              <video
                key={localVideoUrl}
                src={localVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
              />
            ) : parsedExternal ? (
              parsedExternal.type === 'iframe' ? (
                <iframe
                  src={parsedExternal.src}
                  title="PORTA-FILT Demonstration Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={parsedExternal.src}
                  src={parsedExternal.src}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              )
            ) : (
              /* Interactive Photo-Sequence Storyboard Player */
              <div className="relative w-full h-full">
                <ResilientImage
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  className="w-full h-full object-cover"
                  fallbackLabel={activeChapter.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-5 sm:p-7">
                  <div className="text-xs font-mono text-sky-300 tabular-nums">
                    Workshop Reel · Chapter {activeChapter.step} of{' '}
                    {STORYBOARD_CHAPTERS.length}
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                    {activeChapter.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-200 max-w-2xl leading-relaxed">
                    {activeChapter.caption}
                  </p>

                  {/* Storyboard Transport Controls */}
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsPlayingReel((p) => !p)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isPlayingReel ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Reel</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Play Sequence</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setChapterIndex(0);
                        setReelProgress(0);
                      }}
                      aria-label="Restart sequence"
                      className="p-2 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-400 transition-all duration-150"
                        style={{ width: `${reelProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isDragging && (
              <div className="absolute inset-0 bg-sky-950/80 flex flex-col items-center justify-center text-white pointer-events-none">
                <Upload className="w-10 h-10 mb-2 text-sky-300" />
                <p className="text-sm font-semibold">
                  Drop your PORTA-FILT video file to play
                </p>
              </div>
            )}
          </div>

          {/* Player Metadata Strip */}
          <div className="px-5 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 truncate">
              <Film className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-900 truncate">
                {localFileName
                  ? `Local Video: ${localFileName}`
                  : parsedExternal
                  ? `Linked Video: ${savedExternalUrl}`
                  : `Workshop Walkthrough: ${activeChapter.partsUsed}`}
              </span>
            </div>
            <span className="text-slate-400 whitespace-nowrap shrink-0">
              Drag & drop MP4 / WebM / MOV onto player
            </span>
          </div>
        </div>

        {/* Right Panel: Video URL Linker + Chapter Menu */}
        <div className="lg:col-span-4 space-y-5">
          {/* Paste Video Link Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Link2 className="w-4 h-4 text-slate-500" />
              <h3>Attach Your Video Source</h3>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Choose a local video file above or paste a YouTube, Vimeo, Google Drive,
              or direct MP4 link to display your PORTA-FILT video in this tab.
            </p>

            <div className="mt-3 flex gap-2">
              <input
                type="url"
                value={externalUrlInput}
                onChange={(e) => setExternalUrlInput(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                aria-label="Video URL"
                className="flex-1 min-w-0 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveExternalUrl}
                className="px-3.5 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Load Link
              </button>
            </div>
            {urlError && (
              <p className="mt-2 text-xs text-red-600 font-medium">{urlError}</p>
            )}
          </div>

          {/* Chapter Playlist */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Assembly Walkthrough Chapters
              </h3>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                4 Steps
              </span>
            </div>

            <div className="space-y-2">
              {STORYBOARD_CHAPTERS.map((chapter, idx) => {
                const isSelected = !hasCustomVideo && idx === chapterIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => {
                      if (hasCustomVideo) {
                        handleClearCustomVideo();
                      }
                      setChapterIndex(idx);
                      setReelProgress(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 ring-1 ring-sky-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-12 rounded overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <ResilientImage
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                        fallbackLabel={chapter.step}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-sky-700 tabular-nums">
                        Chapter {chapter.step}
                      </div>
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {chapter.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {chapter.partsUsed}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
