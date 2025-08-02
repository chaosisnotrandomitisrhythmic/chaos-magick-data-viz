# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript application for chaos magick data visualization, built with Vite and featuring minimalist, TOPY-inspired visualizations. The app embodies the principle "chaos is not random, it is rhythmic" through ultra-minimal sigil generation and stark black/white aesthetics.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture Overview

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand with persistence middleware
- **Styling**: Tailwind CSS with brutalist black/white theme
- **Data Visualization**: D3.js for minimal geometric forms
- **Animations**: Framer Motion
- **Data Storage**: IndexedDB via 'idb' library
- **Icons**: lucide-react

### Project Structure

```
src/
├── components/          # React components
│   ├── SigilCreator.tsx        # Minimal rhythmic sigil generation
│   ├── SigilGallery.tsx        # Display sigil collection
│   ├── GnosisHeatmap.tsx       # Calendar visualization
│   ├── SynchronicityWeb.tsx    # Force-directed network graph
│   ├── RealityTunnelNav.tsx    # 3D paradigm visualization
│   ├── ServitorPanel.tsx       # Servitor management
│   ├── SigilTransformationVisualizer.tsx  # Rhythmic transformation steps
│   └── TOPYLogo.tsx           # Temple of Psychick Youth logo
├── store/              # Zustand state management
│   └── useMagickStore.ts     # Main store with persistence
├── types/              # TypeScript interfaces
│   └── index.ts        # Core data models
├── hooks/              # Custom React hooks
│   └── useTransformationSound.ts  # Audio feedback
└── App.tsx             # Main app with minimal black/white UI
```

### Key Data Models

The application uses complex TypeScript interfaces defined in `src/types/index.ts`:

- **Sigil**: Magical symbols with intent, charge level, and manifestation tracking
- **Manifestation**: Results and synchronicities linked to sigils
- **RealityTunnel**: Belief paradigm tracking with color coding
- **Servitor**: Thought-form entities with tasks and energy levels
- **GnosisSession**: Altered consciousness states with techniques and insights
- **SynchronicityEvent**: Meaningful coincidence logging with connections

### State Management Pattern

The app uses Zustand with persistence middleware (`src/store/useMagickStore.ts`):
- Centralized store for all application state
- Automatic persistence to localStorage
- Type-safe actions and selectors
- Arrays for collections (sigils, servitors, etc.)

### Sigil Generation Philosophy

The evolved sigil generation system embodies "chaos is not random, it is rhythmic" through intricate pattern analysis:

1. **Intricate Line Count**: Each sigil uses 7-13 lines for complex rhythmic expression
   - Chaos paradigm: Cross + radial lines + angular cuts + connections (7-13 lines)
   - Hermetic paradigm: Dual triangles + rays + sacred geometry (7-13 lines)
   - Shamanic paradigm: Organic spirals + power marks + cross marks (7-13 lines)
   - Cybernetic paradigm: Complex circuit network with 3-6 nodes (7-13 lines)

2. **Deep Rhythmic Extraction**: 
   - Analyzes entire statement for letter frequencies and patterns
   - Calculates multiple rhythm values: primary rhythm, vowel rhythm, consonant density
   - Generates up to 13 phase angles from character positions
   - Extracts harmonic frequencies from letter distribution

3. **Unique Deterministic Generation**: 
   - Same statement always produces the same sigil
   - Complex multi-seed algorithm ensures each sigil is truly unique
   - Line count varies (7-13) based on statement complexity
   - Every mark positioned according to intricate rhythmic calculations

### Visualization Components

1. **SigilCreator**: Intricate rhythmic sigil generation
   - Deep harmonic analysis of intent statements
   - 7-13 line sigils with complex rhythmic patterns
   - Heavy strokes with square line caps
   - Photocopy filter effects
   - Unique patterns based on vowel/consonant ratios and letter frequencies

2. **SigilTransformationVisualizer**: 4-step psychedelic visualization
   - Statement of Intent
   - Rhythmic Extraction (harmonic frequency analysis)
   - Phase Alignment (psychedelic rhythm mandala with fractal waves)
   - Sigil Manifestation (reality-bending emergence with afterglow effects)

3. **SynchronicityWeb**: Force-directed graph showing event connections
   - D3.js force simulation
   - Interactive node dragging
   - Connection strength visualization

4. **RealityTunnelNav**: 3D paradigm visualization
   - Three.js/React Three Fiber
   - Orbital controls
   - Animated transitions between paradigms

5. **GnosisHeatmap**: Calendar-based intensity visualization
   - D3.js scales for color mapping
   - Year-view calendar grid
   - Intensity tracking over time

### Styling Approach

The app uses a brutalist TOPY-inspired aesthetic:
- Pure black (#000000) and white (#ffffff) only
- Courier New monospace for body text
- Arial Black/Impact for headers
- Square line caps and miter joins (no rounded corners)
- Heavy borders (2-4px) and stark contrasts
- Photocopy/xerox filter effects
- Uppercase text throughout
- Grid backgrounds for zine aesthetic

### Development Considerations

1. **TypeScript**: Strict mode enabled, all components must be properly typed
2. **Linting**: ESLint configured with React and TypeScript rules
3. **No Test Framework**: Tests not currently configured
4. **Local Storage Only**: All data stored client-side, no backend API
5. **Hot Module Replacement**: Vite provides fast refresh during development

### Common Tasks

**Adding a New Visualization Component**:
1. Create component in `src/components/`
2. Define TypeScript interfaces in `src/types/index.ts` if needed
3. Add state management in `src/store/useMagickStore.ts`
4. Import and use in `App.tsx`

**Modifying the Visual Theme**:
- Edit `tailwind.config.js` for color palette changes
- Modify `src/index.css` for typography and effects
- Update component classes using: `btn-primary`, `btn-secondary`, `input-field`, `card`, `divider`

**Working with Intricate Sigil Generation**:
- Extract deep rhythmic patterns through harmonic frequency analysis
- Use multi-layered deterministic calculations (vowel/consonant ratios, letter frequencies)
- Generate 7-13 lines for intricate, unique patterns
- Square line caps and miter joins for sharp, decisive marks
- Each paradigm has distinct geometric characteristics while maintaining complexity

**Three.js 3D Components**:
- Use `@react-three/fiber` components
- Implement proper disposal in cleanup
- Consider performance with `useMemo` for geometries