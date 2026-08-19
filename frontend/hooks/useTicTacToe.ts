'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    emitStartGame,
    emitPlayerMove,
    onGameCreated,
    onGameUpdated,
    onGameOver,
    onGameError,
    offGameEvents,
} from '../api/socket'
import { GameResult } from '../app/components/GameResultAnimation';

export type GameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'draw';
export type Board = (string | null)[];

interface UseTicTacToeReturn {
  board: Board;
  status: GameStatus;
  isPlayerTurn: boolean;
  lastBotMove: number | null;
  gameResult: GameResult | null;
  statusText: string;
  statusColor: string;
  handleCellClick: (position: number) => void;
  handleResultComplete: () => void;
}

export function useTicTacToe(
    missionId: string,
    onSuccess: () => void,
    onClose: () => void,
): UseTicTacToeReturn {
    const [gameId, setGameId] = useState<string | null>(null);
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [status, setStatus] = useState<GameStatus>('waiting');
    const [lastBotMove, setLastBotMove] = useState<number | null>(null);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);

    const onSuccessRef = useRef(onSuccess);
    useEffect(() => {
        onSuccessRef.current = onSuccess;
    }, [onSuccess]);

    useEffect(() => {
        onGameCreated((data) => {
        setGameId(data.gameId);
        setBoard(data.board);
        setIsPlayerTurn(data.currentPlayer === 'X');
        setStatus('playing');
        });

        onGameUpdated((data) => {
        setBoard(data.board);
        setStatus(data.status);
        setIsPlayerTurn(data.currentPlayer === 'X');
        if (data.botMove !== undefined) {
            setLastBotMove(data.botMove);
        }
        });

        onGameOver((data) => {
        setStatus(data.result);
        setGameResult(data.result);
        });

        onGameError((data) => {
        console.error('Game error:', data.message);
        });

        emitStartGame(missionId);

        return () => {
        offGameEvents();
        };
    }, [missionId]);

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
        case 'playing': return isPlayerTurn ? 'Sua vez! (X)' : 'Vez do bot...';
        case 'won':     return 'VITÓRIA!';
        case 'lost':    return 'DERROTA!';
        case 'draw':    return 'EMPATE!';
        default:        return '';
        }
    })();

    const statusColor = (() => {
        switch (status) {
        case 'won':  return '#7ab648';
        case 'lost': return '#a04030';
        case 'draw': return '#c9a84c';
        default:     return 'var(--gold)';
        }
    })();

    const handleCellClick = useCallback(
        (position: number) => {
        if (!gameId || !isPlayerTurn || status !== 'playing') return;
        if (board[position] !== null) return;
        emitPlayerMove(gameId, position);
        },
        [gameId, isPlayerTurn, status, board],
    );

    return {
        board,
        status,
        isPlayerTurn,
        lastBotMove,
        gameResult,
        statusText,
        statusColor,
        handleCellClick,
        handleResultComplete,
    };
}