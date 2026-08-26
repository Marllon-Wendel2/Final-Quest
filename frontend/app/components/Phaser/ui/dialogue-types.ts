import { FontColor } from './FontManager';

export type DialogueStep =
  | {
      type: 'text';
      text: string;
      color?: FontColor;
      speaker?: string;        // ← NOVO: nome do falante
      speakerColor?: FontColor; // ← NOVO: cor do nome
    }
  | { type: 'event'; emit: string; data?: unknown }
  | { type: 'wait'; ms: number };

export type DialogueScript = DialogueStep[];
