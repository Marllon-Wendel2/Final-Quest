import { GameResult } from '../GameResultAnimation';

interface ResultConfig {
  title: string;
  subtitle: string;
  icon: string;
  colors: readonly string[];
  symbols: readonly string[];
}

export const RESULT_CONFIGS: Record<GameResult, ResultConfig> = {
  won: {
    title: 'VITÓRIA!',
    subtitle: 'Missão Cumprida!',
    icon: '⚔',
    colors: ['#c9a84c', '#e8c878', '#8a6d3b', '#7ab648', '#5a8a38'],
    symbols: ['★', '✦', '♦', '◆', '✧', '⬥'],
  },
  lost: {
    title: 'DERROTA!',
    subtitle: 'Tente Novamente...',
    icon: '💀',
    colors: ['#a04030', '#78281e', '#c87050', '#8b4513', '#5c3317'],
    symbols: ['☠', '⚰', '✦', '◆', '♠', '♣'],
  },
  draw: {
    title: 'EMPATE!',
    subtitle: 'Nenhum Vencedor',
    icon: '⚖',
    colors: ['#c9a84c', '#8a6d3b', '#6b5a3a', '#4a4a3a', '#3a3a2a'],
    symbols: ['⚖', '✦', '◆', '✧', '⬥', '♦'],
  },
};

export const VICTORY_COLORS = [
  '#c9a84c',
  '#e8c878',
  '#8a6d3b',
  '#7ab648',
  '#5a8a38',
  '#4a7a2a',
  '#3a6a1a',
];

export const VICTORY_SYMBOLS = ['★', '✦', '♦', '◆', '✧', '⬥', '♠', '♣'];
