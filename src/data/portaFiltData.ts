export type ComponentCategory = 'all' | 'columns' | 'fittings' | 'media';

export interface PortaFiltComponent {
  id: string;
  index: string;
  name: string;
  workshopLabel: string;
  category: Exclude<ComponentCategory, 'all'>;
  categoryLabel: string;
  dimensions: string;
  material: string;
  quantity: string;
  summary: string;
  primaryFunction: string;
  filtrationRole: string;
  maintenanceTip: string;
  image: string;
  imageCaption: string;
  imageFocusClass?: string;
}

export const PORTAFILT_IMAGES = {
  assembledComparison: '/assets/aistudio/IMG-20261109-WA0003_a364a78f.jpg',
  partsFlatlay: '/assets/aistudio/IMG-20261108-WA0090_34fe043a.jpg',
  column15Gravel: '/assets/aistudio/IMG-20261109-WA0002_2e7d5c44.jpg',
  processCollage: '/assets/aistudio/IMG-20261108-WA0224_73f3c77f.jpg',
  column10AndCap: '/assets/aistudio/IMG-20261109-WA0001_a043df42.jpg',
  column50AndCarbon: '/assets/aistudio/IMG-20261109-WA0004_1a8b5525.jpg',
};

export const PORTAFILT_COMPONENTS: PortaFiltComponent[] = [
  {
    id: 'hose',
    index: '01',
    name: 'Flexible Ribbed Intake Hose',
    workshopLabel: 'Selang Fleksibel',
    category: 'fittings',
    categoryLabel: 'Fittings & Seals',
    dimensions: '2 in Spiral Bore',
    material: 'Reinforced Spiral PVC',
    quantity: '1 Unit',
    summary: 'Corrugated flexible conduit delivering pressurized or gravity-fed water into the PORTA-FILT head.',
    primaryFunction:
      'Routes raw water from a pump, tap, or elevated source directly into the 90-degree PVC elbow without kinking or collapsing under suction or discharge pressure.',
    filtrationRole:
      'Maintains steady laminar feed velocity into the vertical filtration stack while allowing operators to position PORTA-FILT beside tanks, trenches, or collection drums.',
    maintenanceTip:
      'Flush the spiral ribs with clean water after muddy field deployments and inspect the end cuff for cracks before clamping.',
    image: PORTAFILT_IMAGES.assembledComparison,
    imageCaption: 'Ribbed intake hose coupled to the PORTA-FILT top elbow assembly.',
    imageFocusClass: 'object-right-top',
  },
  {
    id: 'klem',
    index: '02',
    name: 'Dual Stainless Steel Hose Clamps',
    workshopLabel: 'Klem Stainless',
    category: 'fittings',
    categoryLabel: 'Fittings & Seals',
    dimensions: '48–70 mm Adjustable',
    material: 'Corrosion-Resistant Stainless Steel',
    quantity: '2 Units',
    summary: 'Twin worm-drive band clamps locking the flexible ribbed hose onto the PVC elbow spigot.',
    primaryFunction:
      'Applies uniform 360-degree radial compression around the corrugated hose collar so pressurized feed water cannot leak or blow off the elbow joint.',
    filtrationRole:
      'Using two parallel clamps distributes clamping force across two spiral ridges, preserving full hydraulic head pressure down through the packed media beds.',
    maintenanceTip:
      'Tighten evenly with a flathead or Phillips screwdriver until snug; avoid over-torquing to prevent deforming the PVC wall.',
    image: PORTAFILT_IMAGES.processCollage,
    imageCaption: 'Tightening the dual stainless steel Klem bands with a screwdriver.',
    imageFocusClass: 'object-left-top',
  },
  {
    id: 'elbow',
    index: '03',
    name: '90° PVC Elbow Fitting',
    workshopLabel: 'Elbow PVC',
    category: 'fittings',
    categoryLabel: 'Fittings & Seals',
    dimensions: '90° Turn · Heavy Schedule PVC',
    material: 'Rigid Grey uPVC',
    quantity: '1 Unit',
    summary: 'Smooth-radius 90-degree bend transitioning horizontal hose flow into the vertical column.',
    primaryFunction:
      'Redirects incoming water cleanly from the horizontal intake hose down the vertical axis of the PORTA-FILT pipe assembly with minimal turbulence.',
    filtrationRole:
      'Prevents air pockets from trapping at the column crown and serves as the rigid mechanical anchor between the flexible hose and the threaded union.',
    maintenanceTip:
      'Check the inner socket ring when disassembling the union to ensure no coarse grit accumulates at the bend.',
    image: PORTAFILT_IMAGES.partsFlatlay,
    imageCaption: '90-degree rigid PVC elbow shown alongside the tape measure and union fittings.',
    imageFocusClass: 'object-center',
  },
  {
    id: 'sdl-sdd',
    index: '04',
    name: 'Threaded Union Pair (SDL & SDD)',
    workshopLabel: 'SDL & SDD (Sambungan Drat Luar & Dalam)',
    category: 'fittings',
    categoryLabel: 'Fittings & Seals',
    dimensions: 'Male & Female Threaded Couplers',
    material: 'Heavy-Duty Grey uPVC',
    quantity: '1 Pair (2 Pieces)',
    summary: 'Quick-disconnect male and female threaded adapters enabling tool-free disassembly of the head unit.',
    primaryFunction:
      'Joins the upper elbow manifold to the filtration column stack via precision PVC threads so the operator can twist the head open without cutting glued joints.',
    filtrationRole:
      'Enables rapid field servicing, media backwashing, and replacement of spent activated carbon or gravel stages between filtration cycles.',
    maintenanceTip:
      'Wrap PTFE plumber tape sparingly on the SDL male threads if operating under high pump pressure; rinse sand from threads before re-tightening.',
    image: PORTAFILT_IMAGES.partsFlatlay,
    imageCaption: 'SDL (male thread) and SDD (female thread) adapters positioned at bottom right.',
    imageFocusClass: 'object-right-bottom',
  },
  {
    id: 'kolom-15',
    index: '05',
    name: 'Upper Filtration Column (15 cm)',
    workshopLabel: 'Pipa Kolom Filtrasi 15 cm',
    category: 'columns',
    categoryLabel: 'Pipe Columns',
    dimensions: '15 cm Active Chamber',
    material: 'Schedule uPVC Pipe + Porous Bio-Gravel',
    quantity: '1 Column Section',
    summary: 'First-stage vertical chamber packed with porous volcanic stone and gravel media.',
    primaryFunction:
      'Houses the coarse porous stone bed that receives raw water immediately below the threaded union, diffusing the stream across the full pipe cross-section.',
    filtrationRole:
      'Stage 1 Mechanical & Coarse Bio-Filtration: captures suspended silt, twigs, and large particulates before water enters the fine activated carbon chamber below.',
    maintenanceTip:
      'Rinse the volcanic gravel media in clean water whenever flow rate drops due to trapped sediment.',
    image: PORTAFILT_IMAGES.column15Gravel,
    imageCaption: '15 cm column section filled with porous volcanic gravel and bio-stone media.',
    imageFocusClass: 'object-center',
  },
  {
    id: 'shock-luar',
    index: '06',
    name: 'External Socket Couplings',
    workshopLabel: 'Sambungan Shock Luar',
    category: 'fittings',
    categoryLabel: 'Fittings & Seals',
    dimensions: 'Slip-Fit Collar · 2 Units',
    material: 'Rigid Grey uPVC',
    quantity: '2 Units',
    summary: 'Precision slip couplings that bridge the 15 cm, 50 cm, and 10 cm column pipes into one continuous body.',
    primaryFunction:
      'Aligns consecutive pipe columns coaxially and provides an internal ledge seat where circular wire mesh screens rest firmly between media stages.',
    filtrationRole:
      'Separates distinct filtration media zones cleanly—preventing coarse gravel from mixing with fine activated carbon granules during transport or water surges.',
    maintenanceTip:
      'Seat pipe ends fully against the inner stop shoulder to keep the internal mesh disc flat and sealed around its perimeter.',
    image: PORTAFILT_IMAGES.partsFlatlay,
    imageCaption: 'Twin external socket couplings (Sambungan Shock Luar) laid out for modular column joins.',
    imageFocusClass: 'object-left-center',
  },
  {
    id: 'kasa-ayam',
    index: '07',
    name: 'Wire Mesh Retainer Screens',
    workshopLabel: 'Kasa Ayam',
    category: 'media',
    categoryLabel: 'Media & Mesh',
    dimensions: 'Circular Die-Cut Screen',
    material: 'Coated Fine Wire Mesh',
    quantity: '3 Discs (Stage Dividers & Cap Liner)',
    summary: 'Circular wire mesh barrier discs seated inside couplings and the end cap to contain filter media.',
    primaryFunction:
      'Acts as a permeable structural floor beneath each media layer, allowing filtered water to pass freely while locking carbon granules and gravel inside their chambers.',
    filtrationRole:
      'Stops fine activated carbon particles from washing downstream into clean water output and blocks debris from clogging the perforated end cap holes.',
    maintenanceTip:
      'Inspect mesh discs during media swaps and brush off bio-film or trapped fibers before re-seating inside the coupling lip.',
    image: PORTAFILT_IMAGES.processCollage,
    imageCaption: 'Circular Kasa Ayam wire mesh seated cleanly inside the PVC socket coupling.',
    imageFocusClass: 'object-right-bottom',
  },
  {
    id: 'pipa-50',
    index: '08',
    name: 'Main Carbon Filtration Pipe (50 cm)',
    workshopLabel: 'Pipa Utama 50 cm + Karbon Aktif',
    category: 'columns',
    categoryLabel: 'Pipe Columns',
    dimensions: '50 cm Length · Primary Stage',
    material: 'Rigid Grey uPVC + Activated Carbon Granules',
    quantity: '1 Main Column',
    summary: 'The core 50 cm vertical chamber packed with high-surface-area black activated carbon media.',
    primaryFunction:
      'Provides an extended 50 cm contact path through dense granular activated carbon so water spends sufficient residence time interacting with microporous carbon.',
    filtrationRole:
      'Stage 2 Adsorption & Chemical Polishing: removes dissolved odors, chlorine, colorants, organic contaminants, and metallic off-tastes.',
    maintenanceTip:
      'Pre-rinse fresh activated carbon until runoff runs clear before sealing the column; replace or regenerate carbon media periodically based on turbidity load.',
    image: PORTAFILT_IMAGES.column50AndCarbon,
    imageCaption: '50 cm main PVC column packed to the rim with granular black activated carbon.',
    imageFocusClass: 'object-center',
  },
  {
    id: 'kolom-10-cap',
    index: '09',
    name: 'Lower Column (10 cm) & Perforated End Cap',
    workshopLabel: 'Kolom 10 cm & Tutup Pipa Paralon',
    category: 'media',
    categoryLabel: 'Media & Mesh',
    dimensions: '10 cm Chamber + Multi-Hole End Cap',
    material: 'Rigid uPVC + Porous Gravel + Mesh Liner',
    quantity: '1 Column + 1 Drilled Cap',
    summary: 'Final 10 cm gravel polishing chamber capped by a precision-drilled PVC outlet cap lined with wire mesh.',
    primaryFunction:
      'Stabilizes outflow pressure at the base of the PORTA-FILT column and disperses clean treated water evenly through a grid of drilled exit ports.',
    filtrationRole:
      'Stage 3 Final Polish & Discharge: the 10 cm stone bed buffers flow over the Kasa Ayam-lined perforated cap, producing a steady, particle-free water stream.',
    maintenanceTip:
      'Check the drilled perforations on the Tutup Pipa Paralon occasionally for mineral scaling and verify the inner wire mesh rests flush against the base.',
    image: PORTAFILT_IMAGES.column10AndCap,
    imageCaption: '10 cm gravel polishing chamber (left) and mesh-lined perforated PVC end cap (right).',
    imageFocusClass: 'object-center',
  },
];

export const FILTRATION_STAGES = [
  {
    step: '01',
    title: 'Intake & Pressure Seal',
    parts: 'Flexible Hose · Dual Klem · 90° Elbow · SDL & SDD',
    description:
      'Raw water enters via the ribbed spiral hose locked by dual stainless steel clamps, turns smoothly through the 90° elbow, and passes the quick-release threaded union.',
  },
  {
    step: '02',
    title: 'Coarse Sediment Capture',
    parts: '15 cm Filtration Column · Volcanic Bio-Gravel · Kasa Ayam Mesh',
    description:
      'Water spreads across porous gravel inside the 15 cm chamber, trapping coarse silt and debris before passing through the wire mesh divider.',
  },
  {
    step: '03',
    title: 'Deep Carbon Adsorption',
    parts: '50 cm Main Column · Granular Activated Carbon',
    description:
      'A 50 cm bed of black activated carbon adsorbs odors, chlorine, organic compounds, and discoloration over an extended vertical contact zone.',
  },
  {
    step: '04',
    title: 'Final Polish & Discharge',
    parts: '10 cm Gravel Column · Mesh Liner · Perforated End Cap',
    description:
      'A final 10 cm porous stone layer and mesh-lined perforated end cap release clean, balanced outflow without media washout.',
  },
];
