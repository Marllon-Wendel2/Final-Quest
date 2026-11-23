'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './VideoLesson.module.css';
import { findLessonConfig, LessonQuestion } from './lessons.config';
import {
  getVideoLessonProgress,
  saveVideoLessonProgress,
  VideoLessonProgress,
} from '../../../../api/player-mission';

// ─── Types ─────────────────────────────────────────────────────────────────

interface VideoLessonProps {
  missionId: string;
  missionTitle: string;
  points: number;
  isCompleted?: boolean;
  initialLessonProgress?: VideoLessonProgress;
  onLessonProgressChange?: (progress: VideoLessonProgress) => void;
  onSuccess: () => void;
  onClose: () => void;
}

type Phase = 'watching' | 'question' | 'completed';

// ─── Helpers ────────────────────────────────────────────────────────────────

const EMPTY_PROGRESS: VideoLessonProgress = {
  answeredQuestions: [],
  xpGranted: [],
  bonusGranted: false,
  videoCompleted: false,
  missionCompleted: false,
};

function mergeProgress(
  base: VideoLessonProgress,
  incoming?: Partial<VideoLessonProgress>,
): VideoLessonProgress {
  if (!incoming) return { ...base };
  return {
    answeredQuestions: Array.from(
      new Set([...base.answeredQuestions, ...(incoming.answeredQuestions ?? [])]),
    ),
    xpGranted: Array.from(
      new Set([...base.xpGranted, ...(incoming.xpGranted ?? [])]),
    ),
    bonusGranted: Boolean(base.bonusGranted || incoming.bonusGranted),
    videoCompleted: Boolean(base.videoCompleted || incoming.videoCompleted),
    missionCompleted: Boolean(base.missionCompleted || incoming.missionCompleted),
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function VideoLesson({
  missionId,
  missionTitle,
  points,
  isCompleted = false,
  initialLessonProgress,
  onLessonProgressChange,
  onSuccess,
  onClose,
}: VideoLessonProps) {
  const lesson = useMemo(() => findLessonConfig(missionTitle), [missionTitle]);
  const { questions, videoId, xpPerQuestion, xpBonus, lessonNumber } = lesson;
  const playerContainerId = `yt-player-video-lesson-${lessonNumber}`;

  const initialSaved = useMemo(
    () =>
      mergeProgress(EMPTY_PROGRESS, {
        ...initialLessonProgress,
        missionCompleted: Boolean(
          initialLessonProgress?.missionCompleted || isCompleted,
        ),
      }),
    [initialLessonProgress, isCompleted],
  );
  const initialAlreadyDone = isCompleted || initialSaved.missionCompleted;
  const initialPhase: Phase =
    initialAlreadyDone &&
    initialSaved.videoCompleted &&
    initialSaved.answeredQuestions.length >= questions.length
      ? 'completed'
      : 'watching';

  // ── State ──
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<string>>(
    () => new Set(initialSaved.answeredQuestions),
  );
  const [xpEarned, setXpEarned] = useState<number>(
    () =>
      initialSaved.xpGranted.length * xpPerQuestion +
      (initialSaved.bonusGranted ? xpBonus : 0),
  );
  const [showFeedback, setShowFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [missionAlreadyCompleted, setMissionAlreadyCompleted] = useState(initialAlreadyDone);

  // ── Refs ──
  const playerRef = useRef<YTPlayer | null>(null);
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<VideoLessonProgress>(initialSaved);
  const videoCompletedRef = useRef(initialSaved.videoCompleted);
  const pendingQuestionsRef = useRef<string[]>([]);
  const answeredCorrectlyRef = useRef<Set<string>>(new Set(initialSaved.answeredQuestions));
  const phaseRef = useRef<Phase>(initialPhase);
  const missionAlreadyCompletedRef = useRef(initialAlreadyDone);
  const onSuccessRef = useRef(onSuccess);
  const onLessonProgressChangeRef = useRef(onLessonProgressChange);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onLessonProgressChangeRef.current = onLessonProgressChange;
  }, [onLessonProgressChange]);

  // ── Keep refs in sync with state ──
  const updatePhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const updateAnsweredCorrectly = useCallback((s: Set<string>) => {
    answeredCorrectlyRef.current = s;
    setAnsweredCorrectly(s);
  }, []);

  const persistProgress = useCallback(
    (next: VideoLessonProgress) => {
      const snapshot: VideoLessonProgress = {
        answeredQuestions: [...next.answeredQuestions],
        xpGranted: [...next.xpGranted],
        bonusGranted: next.bonusGranted,
        videoCompleted: next.videoCompleted,
        missionCompleted: next.missionCompleted,
      };
      progressRef.current = snapshot;
      onLessonProgressChangeRef.current?.(snapshot);
      saveVideoLessonProgress(missionId, snapshot).catch(() => {
        // ignore transient network errors; next update will resync monotonically
      });
    },
    [missionId],
  );

  // ── Sync latest progress from backend on mount ──
  useEffect(() => {
    let active = true;
    getVideoLessonProgress(missionId)
      .then((remote) => {
        if (!active) return;
        const merged = mergeProgress(progressRef.current, {
          ...remote,
          missionCompleted: Boolean(remote.missionCompleted || isCompleted),
        });
        progressRef.current = merged;
        videoCompletedRef.current = merged.videoCompleted;
        const answeredSet = new Set(merged.answeredQuestions);
        updateAnsweredCorrectly(answeredSet);
        setXpEarned(
          merged.xpGranted.length * xpPerQuestion +
            (merged.bonusGranted ? xpBonus : 0),
        );
        if (merged.missionCompleted) {
          missionAlreadyCompletedRef.current = true;
          setMissionAlreadyCompleted(true);
        }
        if (
          merged.missionCompleted &&
          merged.videoCompleted &&
          merged.answeredQuestions.length >= questions.length &&
          phaseRef.current === 'watching'
        ) {
          updatePhase('completed');
        }
        onLessonProgressChangeRef.current?.(merged);
      })
      .catch(() => {
        // fallback to initialLessonProgress already loaded
      });

    return () => {
      active = false;
    };
  }, [
    missionId,
    isCompleted,
    xpPerQuestion,
    xpBonus,
    questions.length,
    updateAnsweredCorrectly,
    updatePhase,
  ]);

  // ── Complete lesson (only trigger backend completion once) ──
  const finalizeLesson = useCallback(() => {
    const prog = { ...progressRef.current };

    if (!prog.bonusGranted) {
      prog.bonusGranted = true;
      setXpEarned((prev) => prev + xpBonus);
    }

    const shouldNotifyBackend = !missionAlreadyCompletedRef.current && !prog.missionCompleted;
    prog.missionCompleted = true;
    persistProgress(prog);

    updatePhase('completed');

    if (shouldNotifyBackend) {
      missionAlreadyCompletedRef.current = true;
      setMissionAlreadyCompleted(true);
      onSuccessRef.current();
    }
  }, [xpBonus, persistProgress, updatePhase]);

  // ── Handle answer ──
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (showFeedback) return;
      const question = questions[currentQuestionIndex];
      if (!question) return;

      setSelectedOption(optionIndex);
      const isCorrect = optionIndex === question.correct;

      if (isCorrect) {
        setShowFeedback({ correct: true, text: question.feedback.right });

        const prog = { ...progressRef.current };
        let changed = false;

        if (!prog.xpGranted.includes(question.id)) {
          prog.xpGranted = [...prog.xpGranted, question.id];
          setXpEarned((prev) => prev + xpPerQuestion);
          changed = true;
        }

        const newAnswered = new Set([...answeredCorrectlyRef.current, question.id]);
        updateAnsweredCorrectly(newAnswered);

        if (!prog.answeredQuestions.includes(question.id)) {
          prog.answeredQuestions = [...prog.answeredQuestions, question.id];
          changed = true;
        }

        if (changed) {
          persistProgress(prog);
        }

        setTimeout(() => {
          setShowFeedback(null);
          setSelectedOption(null);

          const newPending = pendingQuestionsRef.current.filter((id) => id !== question.id);
          pendingQuestionsRef.current = newPending;

          if (videoCompletedRef.current) {
            if (newPending.length > 0) {
              const nextIdx = questions.findIndex((q) => q.id === newPending[0]);
              if (nextIdx !== -1) {
                setCurrentQuestionIndex(nextIdx);
                updatePhase('question');
                return;
              }
            }
            finalizeLesson();
          } else if (question.pauseAt !== null) {
            updatePhase('watching');
            playerRef.current?.playVideo();
          } else {
            finalizeLesson();
          }
        }, 1500);
      } else {
        setShowFeedback({ correct: false, text: question.feedback.wrong });
        setTimeout(() => {
          setShowFeedback(null);
          setSelectedOption(null);
        }, 2000);
      }
    },
    [
      showFeedback,
      currentQuestionIndex,
      questions,
      xpPerQuestion,
      persistProgress,
      updateAnsweredCorrectly,
      updatePhase,
      finalizeLesson,
    ],
  );

  // ── Trigger a question by id ──
  const triggerQuestion = useCallback(
    (questionId: string) => {
      const idx = questions.findIndex((q) => q.id === questionId);
      if (idx === -1) return;
      if (answeredCorrectlyRef.current.has(questionId)) return;
      setCurrentQuestionIndex(idx);
      updatePhase('question');
      playerRef.current?.pauseVideo();
    },
    [questions, updatePhase],
  );

  // ── Interval check for pauseAt ──
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();
    intervalRef.current = setInterval(() => {
      if (!playerRef.current) return;
      if (phaseRef.current !== 'watching') return;

      const currentTime = playerRef.current.getCurrentTime();
      for (const q of questions) {
        if (q.pauseAt === null) continue;
        if (answeredCorrectlyRef.current.has(q.id)) continue;
        if (pendingQuestionsRef.current.includes(q.id)) continue;
        if (currentTime >= q.pauseAt) {
          triggerQuestion(q.id);
          break;
        }
      }
    }, 1000);
  }, [questions, stopPolling, triggerQuestion]);

  // ── On video ended ──
  const handleVideoEnded = useCallback(() => {
    videoCompletedRef.current = true;
    const prog = { ...progressRef.current, videoCompleted: true };
    persistProgress(prog);
    stopPolling();

    const unansweredMid = questions
      .filter((q) => q.pauseAt !== null && !answeredCorrectlyRef.current.has(q.id))
      .map((q) => q.id);

    const finalQ = questions.find((q) => q.pauseAt === null);
    const allPending = [...unansweredMid];
    if (finalQ && !answeredCorrectlyRef.current.has(finalQ.id)) {
      allPending.push(finalQ.id);
    }

    if (allPending.length > 0) {
      pendingQuestionsRef.current = allPending;
      const idx = questions.findIndex((q) => q.id === allPending[0]);
      if (idx !== -1) {
        setCurrentQuestionIndex(idx);
        updatePhase('question');
        return;
      }
    }

    finalizeLesson();
  }, [questions, persistProgress, stopPolling, updatePhase, finalizeLesson]);

  const startPollingRef = useRef(startPolling);
  const stopPollingRef = useRef(stopPolling);
  const handleVideoEndedRef = useRef(handleVideoEnded);

  useEffect(() => {
    startPollingRef.current = startPolling;
    stopPollingRef.current = stopPolling;
    handleVideoEndedRef.current = handleVideoEnded;
  }, [startPolling, stopPolling, handleVideoEnded]);

  // ── YouTube IFrame API initialization (runs once per videoId) ──
  useEffect(() => {
    let cancelled = false;

    const initPlayer = () => {
      if (cancelled || !window.YT?.Player || !playerHostRef.current) return;

      // Ensure a clean mount target element inside playerHostRef
      playerHostRef.current.innerHTML = '';
      const mountEl = document.createElement('div');
      mountEl.id = playerContainerId;
      playerHostRef.current.appendChild(mountEl);

      playerRef.current = new window.YT.Player(playerContainerId, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, enablejsapi: 1 },
        events: {
          onStateChange: (event) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) {
              document.querySelectorAll('audio').forEach((audioEl) => {
                if (!audioEl.paused) {
                  audioEl.pause();
                }
              });
              startPollingRef.current();
            } else if (state === window.YT.PlayerState.ENDED) {
              stopPollingRef.current();
              handleVideoEndedRef.current();
            } else {
              stopPollingRef.current();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initPlayer();
      };

      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      stopPollingRef.current();
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore destroy errors
      }
      playerRef.current = null;
    };
  }, [playerContainerId, videoId]);

  // ── Derived ──
  const currentQuestion: LessonQuestion | undefined = questions[currentQuestionIndex];
  const answeredCount = answeredCorrectly.size;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{missionTitle || lesson.title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        {/* YouTube Player */}
        <div className={styles.playerWrapper} ref={playerHostRef} />

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <span>
            PERGUNTAS: {answeredCount}/{questions.length}
          </span>
          {questions.map((q, i) => {
            const isDone = answeredCorrectly.has(q.id);
            const isActive = phase === 'question' && currentQuestionIndex === i;
            return (
              <span
                key={q.id}
                className={[
                  styles.progressStep,
                  isDone ? styles.done : '',
                  isActive ? styles.active : '',
                ].join(' ')}
                title={`Pergunta ${i + 1}`}
              >
                {isDone ? '✓' : i + 1}
              </span>
            );
          })}
        </div>

        {/* Question area */}
        {phase === 'question' && currentQuestion && (
          <div className={styles.questionArea}>
            <p className={styles.questionText}>{currentQuestion.question}</p>
            <div className={styles.options}>
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  className={[
                    styles.optionBtn,
                    selectedOption === i ? styles.selected : '',
                  ].join(' ')}
                  onClick={() => handleAnswer(i)}
                  disabled={showFeedback !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showFeedback && (
              <div
                className={[
                  styles.feedback,
                  showFeedback.correct ? styles.feedbackCorrect : styles.feedbackWrong,
                ].join(' ')}
              >
                {showFeedback.text}
              </div>
            )}
          </div>
        )}

        {/* Completed badge */}
        {phase === 'completed' && (
          <div className={styles.completedBadge}>
            <h2>🏆 Aula {lessonNumber} Concluída!</h2>
            <p>
              {missionAlreadyCompleted
                ? `Missão concluída (${points} PTS já creditados — sem duplicação de XP).`
                : `Você completou a Aula ${lessonNumber} e ganhou ${points} PTS!`}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.xpCounter}>
            ⭐ XP DA AULA: {xpEarned} | 🏆 MISSÃO: {points} PTS
          </span>
          <button className={styles.footerBtn} onClick={onClose}>
            {phase === 'completed' ? '✔ Concluir' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
}
