'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  emitStartMemoryGame,
  emitFlipCard,
  emitRequestTimerSync,
  onMemoryGameCreated,
  onCardFlipped,
  onCardsHidden,
  onTimerSync,
  onMemoryGameOver,
  onGameError,
  offMemoryGameEvents,
} from '../api/socket';
import { MemoryCard, MemoryGameStatus } from '../app/types/memory-game';
import { GameResult } from '../app/components/GameResultAnimation';

const TIMER_SYNC_INTERVAL = 3000;

interface UseMemoryGameReturn {
  cards: MemoryCard[];
  status: MemoryGameStatus;
  timeLeft: number;
  moves: number;
  matchedPairs: number;
  hasFreeMove: boolean;
  gameResult: GameResult | null;
  statusText: string;
  statusColor: string;
  handleCardClick: (cardIndex: number) => void;
  handleResultComplete: () => void;
  isProcessing: boolean;
}

export function useMemoryGame(
  missionId: string,
  onSuccess: () => void,
  onClose: () => void,
): UseMemoryGameReturn {
  const [gameId, setGameId] = useState<string | null>(null);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [status, setStatus] = useState<MemoryGameStatus>('waiting');
  const [timeLeft, setTimeLeft] = useState(60);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [hasFreeMove, setHasFreeMove] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  const gameIdRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (status !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Tempo esgotado - servidor vai detectar via timestamp
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  // Sincronização periódica com servidor
  useEffect(() => {
    if (status !== 'playing' || !gameIdRef.current) return;

    syncIntervalRef.current = setInterval(() => {
      if (gameIdRef.current) {
        emitRequestTimerSync(gameIdRef.current);
      }
    }, TIMER_SYNC_INTERVAL);

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [status, gameId]);

  useEffect(() => {
    // Event handlers
    const handleGameCreated = (data: { gameId: string; cards: MemoryCard[]; timeLeft: number; maxMoves: number }) => {
      setGameId(data.gameId);
      gameIdRef.current = data.gameId;
      setCards(data.cards);
      setTimeLeft(data.timeLeft);
      setStatus('playing');
    };

    const handleCardFlipped = (data: {
      gameId: string;
      cardIndex: number;
      card: MemoryCard;
      effect: string;
      moves: number;
      timeLeft: number;
      matchedPairs: number;
      hasFreeMove: boolean;
      canPlay: boolean;
    }) => {
      // Atualizar carta específica
      setCards(prev => prev.map((card, idx) => 
        idx === data.cardIndex ? data.card : card
      ));

      // Atualizar estado
      setMoves(data.moves);
      setTimeLeft(data.timeLeft);
      setMatchedPairs(data.matchedPairs);
      setHasFreeMove(data.hasFreeMove);

      // Usar canPlay do backend - não precisa de lógica no frontend
      setIsProcessing(!data.canPlay);
    };

    const handleCardsHidden = (data: { gameId: string; cards: MemoryCard[]; canPlay: boolean }) => {
      // Esconder cartas e usar canPlay do backend
      setCards(data.cards);
      setIsProcessing(!data.canPlay);
    };

    const handleTimerSync = (data: { gameId: string; timeLeft: number; status: MemoryGameStatus }) => {
      // Sincronizar tempo com servidor
      setTimeLeft(data.timeLeft);
      
      // Se servidor detectou timeout, atualizar status
      if (data.status === 'timeout' && status === 'playing') {
        setStatus('lost');
        setGameResult('lost');
        setIsProcessing(false);
      }
    };

    const handleGameOver = (data: { result: 'won' | 'lost' | 'timeout'; moves: number; timeLeft: number }) => {
      setStatus(data.result === 'timeout' ? 'lost' : data.result);
      setGameResult(data.result === 'timeout' ? 'lost' : data.result);
      setIsProcessing(false);
    };

    const handleError = (data: { message: string }) => {
      console.error('Memory game error:', data.message);
      setIsProcessing(false);
    };

    // Registrar listeners
    onMemoryGameCreated(handleGameCreated);
    onCardFlipped(handleCardFlipped);
    onCardsHidden(handleCardsHidden);
    onTimerSync(handleTimerSync);
    onMemoryGameOver(handleGameOver);
    onGameError(handleError);

    // Iniciar jogo
    emitStartMemoryGame(missionId);

    // Cleanup
    return () => {
      offMemoryGameEvents();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [missionId]);

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      // Validações
      if (!gameIdRef.current || status !== 'playing') return;
      if (isProcessing) return;
      if (cards[cardIndex]?.isFlipped || cards[cardIndex]?.isMatched) return;

      // Bloquear cliques enquanto processa
      setIsProcessing(true);

      // Enviar jogada
      emitFlipCard(gameIdRef.current, cardIndex);
    },
    [status, isProcessing, cards],
  );

  const handleResultComplete = useCallback(() => {
    if (gameResult === 'won') {
      onSuccessRef.current();
    }
    setGameResult(null);
    onClose();
  }, [gameResult, onClose]);

  const statusText = (() => {
    switch (status) {
      case 'waiting': return 'Conectando...';
      case 'playing': 
        if (hasFreeMove) return '★ JOGADA GRÁTIS!';
        return `Encontre os pares! (${matchedPairs}/3)`;
      case 'won':     return 'VITÓRIA!';
      case 'lost':    return 'DERROTA!';
      case 'timeout': return 'TEMPO ESGOTADO!';
      default:        return '';
    }
  })();

  const statusColor = (() => {
    switch (status) {
      case 'won':  return '#7ab648';
      case 'lost': return '#a04030';
      case 'timeout': return '#c87050';
      default:     return 'var(--gold)';
    }
  })();

  return {
    cards,
    status,
    timeLeft,
    moves,
    matchedPairs,
    hasFreeMove,
    gameResult,
    statusText,
    statusColor,
    handleCardClick,
    handleResultComplete,
    isProcessing,
  };
}