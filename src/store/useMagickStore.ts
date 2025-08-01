import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sigil, RealityTunnel, Servitor, GnosisSession, SynchronicityEvent } from '../types';

interface MagickStore {
    sigils: Sigil[];
    realityTunnels: RealityTunnel[];
    servitors: Servitor[];
    gnosisSessions: GnosisSession[];
    synchronicities: SynchronicityEvent[];
    currentTunnel: string | null;

    // Actions
    addSigil: (sigil: Sigil) => void;
    updateSigil: (id: string, updates: Partial<Sigil>) => void;
    chargeSigil: (id: string, date: Date) => void;

    addRealityTunnel: (tunnel: RealityTunnel) => void;
    switchTunnel: (tunnelId: string) => void;

    addServitor: (servitor: Servitor) => void;
    feedServitor: (id: string) => void;

    addGnosisSession: (session: GnosisSession) => void;
    addSynchronicity: (event: SynchronicityEvent) => void;
}

export const useMagickStore = create<MagickStore>()(
    persist(
        (set) => ({
            sigils: [],
            realityTunnels: [],
            servitors: [],
            gnosisSessions: [],
            synchronicities: [],
            currentTunnel: null,

            addSigil: (sigil) => set((state) => ({
                sigils: [...state.sigils, sigil]
            })),

            updateSigil: (id, updates) => set((state) => ({
                sigils: state.sigils.map(s => s.id === id ? { ...s, ...updates } : s)
            })),

            chargeSigil: (id, date) => set((state) => ({
                sigils: state.sigils.map(s =>
                    s.id === id
                        ? { ...s, chargedDates: [...s.chargedDates, date] }
                        : s
                )
            })),

            addRealityTunnel: (tunnel) => set((state) => ({
                realityTunnels: [...state.realityTunnels, tunnel]
            })),

            switchTunnel: (tunnelId) => set({ currentTunnel: tunnelId }),

            addServitor: (servitor) => set((state) => ({
                servitors: [...state.servitors, servitor]
            })),

            feedServitor: (id) => set((state) => ({
                servitors: state.servitors.map(s =>
                    s.id === id
                        ? { ...s, energy: Math.min(1, s.energy + 0.2), lastFed: new Date() }
                        : s
                )
            })),

            addGnosisSession: (session) => set((state) => ({
                gnosisSessions: [...state.gnosisSessions, session]
            })),

            addSynchronicity: (event) => set((state) => ({
                synchronicities: [...state.synchronicities, event]
            })),
        }),
        {
            name: 'chaos-magick-storage',
        }
    )
); 