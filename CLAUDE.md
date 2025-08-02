# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript application for chaos magick data visualization, built with Vite and featuring complex interactive visualizations using D3.js and Three.js. The app uses a distinctive terminal/cyberpunk aesthetic with CRT monitor effects.

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
- **Styling**: Tailwind CSS with custom terminal theme
- **Data Visualization**: D3.js for 2D graphs, Three.js for 3D
- **Animations**: Framer Motion
- **Data Storage**: IndexedDB via 'idb' library
- **Icons**: lucide-react

### Project Structure

```
src/
├── components/          # React components
│   ├── SigilCreator.tsx        # D3.js sigil generation
│   ├── SigilGallery.tsx        # Display sigil collection
│   ├── GnosisHeatmap.tsx       # Calendar visualization
│   ├── SynchronicityWeb.tsx    # Force-directed network graph
│   ├── RealityTunnelNav.tsx    # 3D paradigm visualization
│   ├── ServitorPanel.tsx       # Servitor management
│   └── TOPYLogo.tsx           # Temple of Psychick Youth logo
├── store/              # Zustand state management
│   └── useStore.ts     # Main store with persistence
├── types/              # TypeScript interfaces
│   └── index.ts        # Core data models
├── utils/              # Utility functions
│   └── indexedDB.ts    # Database operations
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

The app uses Zustand with persistence middleware (`src/store/useStore.ts`):
- Centralized store for all application state
- Automatic persistence to localStorage
- Type-safe actions and selectors
- Arrays for collections (sigils, servitors, etc.)

### Visualization Components

1. **SigilCreator**: Transforms intent statements into geometric sigils using D3.js
   - Letter-to-shape transformation algorithm
   - Dynamic charge visualization
   - SVG export capability

2. **SynchronicityWeb**: Force-directed graph showing event connections
   - D3.js force simulation
   - Interactive node dragging
   - Connection strength visualization

3. **RealityTunnelNav**: 3D paradigm visualization
   - Three.js/React Three Fiber
   - Orbital controls
   - Animated transitions between paradigms

4. **GnosisHeatmap**: Calendar-based intensity visualization
   - D3.js scales for color mapping
   - Year-view calendar grid
   - Intensity tracking over time

### Styling Approach

The app uses a minimal black and white aesthetic inspired by mail art and Psychick TV:
- Stark black (#000000) and white (#ffffff) color scheme
- Courier New monospace font for body text
- Arial Black/Impact for headers and display text
- Clean geometric borders and typography
- Subtle xerox/photocopy effects for mail art aesthetic

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
3. Add state management in `src/store/useStore.ts`
4. Import and use in `App.tsx`

**Modifying the Visual Theme**:
- Edit `tailwind.config.js` for color palette changes
- Modify `src/index.css` for typography and effects
- Update component classes using: `btn-primary`, `btn-secondary`, `input-field`, `card`, `divider`

**Working with D3.js Visualizations**:
- Use `useEffect` for D3 DOM manipulation
- Clean up selections in effect cleanup
- Type D3 selections properly with TypeScript

**Three.js 3D Components**:
- Use `@react-three/fiber` components
- Implement proper disposal in cleanup
- Consider performance with `useMemo` for geometries