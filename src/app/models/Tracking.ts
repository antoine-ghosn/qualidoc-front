export interface Tracking {
    id: number;
    name: string;
    ok: number;
    ko: number;
    total: number;
    status: 'EN COURS' | 'TERMINÉ' | 'ANNULÉ' | '...';
    type: 'import' | 'export';
  }
  