export interface Sigil {
    id: string;
    created: Date;
    statement: string;
    abstractForm: string; // SVG path data
    chargedDates: Date[];
    gnosisMethod: GnosisMethod;
    manifestations: Manifestation[];
    resonanceStrength: number; // 0-1
    paradigm: string; // Current belief system used
    lunarPhase?: string;
    planetaryHour?: string;
}

export type GnosisMethod = 'meditation' | 'dance' | 'exhaustion' | 'sex' | 'pain' | 'intoxication' | 'other';

export interface Manifestation {
    id: string;
    date: Date;
    description: string;
    synchronicities: string[];
    confidence: number; // 0-1, how sure you are this relates to the sigil
    emotionalResonance: number; // -1 to 1, negative to positive
}

export interface RealityTunnel {
    id: string;
    name: string;
    description: string;
    beliefs: string[];
    color: string; // For visualization
    activeFrom: Date;
    activeTo?: Date;
    sigilsCreated: string[]; // Sigil IDs
}

export interface Servitor {
    id: string;
    name: string;
    purpose: string;
    created: Date;
    sigil: string; // SVG path
    energy: number; // 0-1, current "health"
    lastFed: Date;
    results: ServitorResult[];
}

export interface ServitorResult {
    date: Date;
    description: string;
    success: boolean;
}

export interface GnosisSession {
    id: string;
    date: Date;
    method: GnosisMethod;
    duration: number; // minutes
    intensity: number; // 0-1
    sigilsCharged: string[]; // Sigil IDs
    notes?: string;
}

export interface SynchronicityEvent {
    id: string;
    date: Date;
    description: string;
    relatedSigils: string[]; // Sigil IDs
    significance: number; // 0-1
    category: 'number' | 'symbol' | 'encounter' | 'dream' | 'media' | 'other';
} 