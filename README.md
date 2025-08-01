# 🌀 Sigil Resonance Tracker
## A Chaos Magick Data Visualization Tool

Transform your magical practice into living data art. Track sigil activations, visualize reality shifts, and discover patterns in your chaos magick workings.

## 🎯 What This Does

This tool combines modern data visualization with chaos magick principles to:

- **Track Sigil Performance**: Visualize success rates, timing patterns, and resonance strength
- **Map Reality Tunnels**: See how your belief paradigms shift over time
- **Gnosis State Analytics**: Track which methods (meditation, dance, exhaustion) produce strongest results
- **Synchronicity Networks**: Visualize connections between sigils, events, and manifestations
- **Lunar/Planetary Correlations**: Overlay astrological timing with your magical results

## 🔮 Core Features

### 1. Sigil Creation & Tracking
- Digital sigil generator using D3.js force-directed graphs
- Each sigil becomes a living data point that evolves based on:
  - Charging frequency
  - Manifestation timeline
  - Synchronicity events
  - Emotional resonance during creation

### 2. Reality Tunnel Navigator
- Interactive 3D visualization of your belief paradigms
- Switch between "tunnels" to see how different beliefs affect your results
- Inspired by Robert Anton Wilson's concept

### 3. Gnosis State Heatmap
- Calendar heatmap showing optimal times for magical work
- Correlates with:
  - Personal biorhythms
  - Moon phases
  - Planetary hours
  - Your documented flow states (from DJ sessions, coding, etc.)

### 4. Servitor Dashboard
- Monitor your thought-form creations
- Visualize their "health" and effectiveness
- Network graph showing servitor interactions

### 5. Synchronicity Web
- Force-directed graph connecting:
  - Sigils created
  - Real-world events
  - Dreams/visions
  - Unexpected manifestations
- Reveals hidden patterns in your magical practice

## 🛠 Tech Stack

- **React** + **TypeScript**: Core framework
- **D3.js**: Data calculations and complex visualizations
- **Three.js**: 3D reality tunnel visualization
- **Framer Motion**: Smooth transitions between states
- **Zustand**: State management for magical records
- **IndexedDB**: Local storage for private magical diary

## 📊 Data Structure

```typescript
interface Sigil {
  id: string;
  created: Date;
  statement: string;
  abstractForm: SVGPath;
  chargedDates: Date[];
  gnosisMethod: 'meditation' | 'dance' | 'exhaustion' | 'other';
  manifestations: Manifestation[];
  resonanceStrength: number; // 0-1
  paradigm: string; // Current belief system used
}

interface Manifestation {
  date: Date;
  description: string;
  synchronicities: string[];
  confidence: number; // How sure you are this relates to the sigil
}
```

## 🎨 Visual Inspiration

- **Aesthetic**: Dark mode with neon accents (cyberpunk meets occult)
- **Sigils pulse** with energy based on recent charging
- **Reality tunnels** rendered as interconnected 3D spaces
- **Synchronicities** appear as lightning connections between nodes
- **Time-based animations** show your magical journey evolving

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🌟 Example Use Cases

1. **Track which gnosis methods work best for you** - See patterns in meditation vs. dance vs. exhaustion
2. **Optimize timing** - Discover your personal "magical hours"
3. **Identify belief blindspots** - See which paradigms you avoid
4. **Network effects** - Understand how sigils interact and amplify each other
5. **Document your Scanner journey** - Each interest area becomes a new reality tunnel to explore

## 🔐 Privacy First

All data stored locally. Your magical records remain yours alone. Export/import functionality for backup.

## 📚 Connects With Your Obsidian Vault

- Import data from your Scanner Daybook
- Export visualizations back to Obsidian
- Link sigils to daily logs and pattern tracking

---

*"In the data patterns, we find the hidden order of chaos. In chaos, we find the freedom to create new patterns."* 