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

The new sigil generation system embodies "chaos is not random, it is rhythmic":

1. **Minimal Line Count**: Each sigil uses only 2-6 lines maximum
   - Chaos paradigm: Cross + optional single mark (2-3 lines)
   - Hermetic paradigm: Triangle + optional center (3-4 lines)
   - Shamanic paradigm: Spiral + terminus mark (2 lines)
   - Cybernetic paradigm: Minimal circuit (4-6 lines)

2. **Rhythmic Extraction**: 
   - Extracts only the first 3 unique letters from the statement
   - Calculates a single rhythm value (0-1) from letter positions
   - Determines phase angle based on statement seed (8 cardinal directions)

3. **Deterministic Generation**: 
   - Same statement always produces the same sigil
   - No random elements - pure rhythmic patterns
   - Each mark has purpose derived from the statement

### Visualization Components

1. **SigilCreator**: Ultra-minimal sigil generation
   - Rhythmic pattern extraction from intent statements
   - 2-6 line sigils inspired by TOPY Psychick Cross
   - Heavy strokes with square line caps
   - Photocopy filter effects

2. **SigilTransformationVisualizer**: 4-step rhythmic visualization
   - Statement of Intent
   - Rhythmic Extraction (core 3 letters)
   - Phase Alignment (rhythm & angle visualization)
   - Sigil Manifestation (final minimal form)

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

**Working with Minimal Sigil Generation**:
- Focus on extracting rhythmic essence, not complex transformations
- Use deterministic calculations based on letter positions
- Keep line count under 6 for maximum impact
- Square line caps and miter joins for sharp, decisive marks

**Three.js 3D Components**:
- Use `@react-three/fiber` components
- Implement proper disposal in cleanup
- Consider performance with `useMemo` for geometries