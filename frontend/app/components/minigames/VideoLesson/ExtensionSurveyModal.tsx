'use client';

import { useState } from 'react';
import styles from './ExtensionSurveyModal.module.css';
import {
  submitPostSurvey,
  submitPreSurvey,
  type MyExtensionSurveyResponse,
  type PostSurveySubmitResponse,
} from '../../../../api/extension-survey';

interface ExtensionSurveyModalProps {
  mode: 'pre' | 'post';
  studentName: string;
  onPreCompleted?: (res: MyExtensionSurveyResponse) => void;
  onPostCompleted?: (res: PostSurveySubmitResponse) => void;
  onClose: () => void;
}

const CONFIDENCE_LABELS = [
  { value: 1, label: 'Nenhum' },
  { value: 2, label: 'Básico' },
  { value: 3, label: 'Razoável' },
  { value: 4, label: 'Bom' },
  { value: 5, label: 'Muito alto' },
];

const RATING_LABELS = [
  { value: 1, label: 'Muito ruim' },
  { value: 2, label: 'Regular' },
  { value: 3, label: 'Bom' },
  { value: 4, label: 'Muito bom' },
  { value: 5, label: 'Excelente' },
];

export default function ExtensionSurveyModal({
  mode,
  studentName,
  onPreCompleted,
  onPostCompleted,
  onClose,
}: ExtensionSurveyModalProps) {
  // Pre-course form state
  const [ageRange, setAgeRange] = useState('18 a 24 anos');
  const [profileType, setProfileType] = useState(
    'Estudante de Análise e Desenvolvimento de Sistemas (ADS)',
  );
  const [educationLevel, setEducationLevel] = useState('Graduação em andamento');
  const [cityState, setCityState] = useState('');
  const [priorProgramming, setPriorProgramming] = useState<boolean>(false);
  const [preConfidence, setPreConfidence] = useState<number>(2);
  const [expectation, setExpectation] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Post-course form state
  const [postConfidence, setPostConfidence] = useState<number>(4);
  const [gamificationRating, setGamificationRating] = useState<number>(5);
  const [overallRating, setOverallRating] = useState<number>(5);
  const [difficulties, setDifficulties] = useState('');
  const [highlights, setHighlights] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (cityState.trim().length < 2) {
      setError('Informe sua cidade e estado (ex.: Fortaleza - CE).');
      return;
    }
    if (!consentAccepted) {
      setError('Marque o termo de concordância acadêmica para continuar.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitPreSurvey({
        courseId: 'logicaGuanabara',
        ageRange,
        profileType,
        educationLevel,
        cityState: cityState.trim(),
        priorProgramming,
        preConfidence,
        expectation: expectation.trim(),
        consentAccepted,
      });
      onPreCompleted?.(res);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Erro ao salvar formulário inicial. Tente novamente.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await submitPostSurvey({
        courseId: 'logicaGuanabara',
        postConfidence,
        gamificationRating,
        overallRating,
        difficulties: difficulties.trim(),
        highlights: highlights.trim(),
        suggestions: suggestions.trim(),
      });
      onPostCompleted?.(res);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Erro ao enviar avaliação final. Tente novamente.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>
              {mode === 'pre'
                ? 'PROJETO DE EXTENSÃO • ETAPA INICIAL'
                : 'PROJETO DE EXTENSÃO • AVALIAÇÃO FINAL'}
            </span>
            <h2 className={styles.title}>
              {mode === 'pre'
                ? '📝 CADASTRO & DIAGNÓSTICO INICIAL'
                : '🏆 AVALIAÇÃO FINAL PARA CERTIFICADO'}
            </h2>
            <p className={styles.subtitle}>
              {mode === 'pre'
                ? `Olá, ${studentName}! Antes de iniciar as 15 aulas da oficina, preencha rapidamente seu perfil e nível inicial.`
                : `Parabéns, ${studentName}! Você concluiu as 15 aulas. Responda esta avaliação rápida para liberar seu certificado em PDF (10h).`}
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar formulário"
          >
            ✕
          </button>
        </div>

        {mode === 'pre' ? (
          <form className={styles.form} onSubmit={handlePreSubmit}>
            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="ext-profile">
                  SEU PERFIL *
                </label>
                <select
                  id="ext-profile"
                  className={styles.select}
                  value={profileType}
                  onChange={(e) => setProfileType(e.target.value)}
                >
                  <option value="Estudante de Análise e Desenvolvimento de Sistemas (ADS)">
                    Estudante de ADS
                  </option>
                  <option value="Estudante de outra área de TI">
                    Estudante de outra área de TI
                  </option>
                  <option value="Curioso / Iniciante em programação">
                    Curioso / Iniciante em programação
                  </option>
                  <option value="Estudante do Ensino Médio">
                    Estudante do Ensino Médio
                  </option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="ext-age">
                  FAIXA ETÁRIA *
                </label>
                <select
                  id="ext-age"
                  className={styles.select}
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                >
                  <option value="Menor de 18 anos">Menor de 18 anos</option>
                  <option value="18 a 24 anos">18 a 24 anos</option>
                  <option value="25 a 34 anos">25 a 34 anos</option>
                  <option value="35 a 44 anos">35 a 44 anos</option>
                  <option value="45 anos ou mais">45 anos ou mais</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="ext-edu">
                  ESCOLARIDADE *
                </label>
                <select
                  id="ext-edu"
                  className={styles.select}
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                >
                  <option value="Ensino Fundamental">Ensino Fundamental</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="Ensino Técnico">Ensino Técnico</option>
                  <option value="Graduação em andamento">Graduação em andamento</option>
                  <option value="Graduação completa">Graduação completa</option>
                  <option value="Pós-graduação">Pós-graduação</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="ext-city">
                  CIDADE / ESTADO *
                </label>
                <input
                  id="ext-city"
                  type="text"
                  className={styles.input}
                  placeholder="Ex.: Fortaleza - CE"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>
                JÁ TEVE CONTATO COM PROGRAMAÇÃO ANTES? *
              </span>
              <div className={styles.toggleGroup}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${priorProgramming === false ? styles.toggleBtnActive : ''}`}
                  onClick={() => setPriorProgramming(false)}
                >
                  NÃO, É MEU PRIMEIRO CONTATO
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${priorProgramming === true ? styles.toggleBtnActive : ''}`}
                  onClick={() => setPriorProgramming(true)}
                >
                  SIM, JÁ TIVE ALGUM CONTATO
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>
                DE 1 A 5, QUAL SEU NÍVEL DE CONFIANÇA ATUAL EM LÓGICA DE PROGRAMAÇÃO? *
              </span>
              <div className={styles.scaleRow}>
                {CONFIDENCE_LABELS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`${styles.scaleBtn} ${preConfidence === item.value ? styles.scaleBtnActive : ''}`}
                    onClick={() => setPreConfidence(item.value)}
                  >
                    <span className={styles.scaleNum}>{item.value}</span>
                    <span className={styles.scaleHint}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ext-exp">
                O QUE VOCÊ ESPERA APRENDER NESTA OFICINA? (OPCIONAL)
              </label>
              <textarea
                id="ext-exp"
                className={styles.textarea}
                placeholder="Ex.: Entender variáveis, condicionais, laços de repetição e perder o medo de programar..."
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
              />
            </div>

            <label className={styles.consentBox}>
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
              />
              <span className={styles.consentText}>
                Autorizo o uso anônimo das minhas respostas e estatísticas de conclusão
                para fins estritamente acadêmicos no Relatório de Atividades Integradas
                de Extensão (UNIGRANDE).
              </span>
            </label>

            {error && <div className={styles.errorBox}>⚠️ {error}</div>}

            <div className={styles.footer}>
              <button type="button" className={styles.secondaryBtn} onClick={onClose}>
                DEPOIS
              </button>
              <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                {submitting ? 'SALVANDO...' : '✔ SALVAR E INICIAR AULAS'}
              </button>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handlePostSubmit}>
            <div className={styles.field}>
              <span className={styles.label}>
                1. AGORA QUE CONCLUIU AS 15 AULAS, QUAL SEU NÍVEL DE CONFIANÇA EM LÓGICA? (1 A 5) *
              </span>
              <div className={styles.scaleRow}>
                {CONFIDENCE_LABELS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`${styles.scaleBtn} ${postConfidence === item.value ? styles.scaleBtnActive : ''}`}
                    onClick={() => setPostConfidence(item.value)}
                  >
                    <span className={styles.scaleNum}>{item.value}</span>
                    <span className={styles.scaleHint}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>
                2. O FORMATO GAMIFICADO (RPG, XP E PERGUNTAS NO VÍDEO) AJUDOU NO APRENDIZADO? *
              </span>
              <div className={styles.scaleRow}>
                {RATING_LABELS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`${styles.scaleBtn} ${gamificationRating === item.value ? styles.scaleBtnActive : ''}`}
                    onClick={() => setGamificationRating(item.value)}
                  >
                    <span className={styles.scaleNum}>{item.value}</span>
                    <span className={styles.scaleHint}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>
                3. QUAL SUA AVALIAÇÃO GERAL DA OFICINA? *
              </span>
              <div className={styles.scaleRow}>
                {RATING_LABELS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`${styles.scaleBtn} ${overallRating === item.value ? styles.scaleBtnActive : ''}`}
                    onClick={() => setOverallRating(item.value)}
                  >
                    <span className={styles.scaleNum}>{item.value}</span>
                    <span className={styles.scaleHint}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ext-high">
                4. O QUE VOCÊ MAIS GOSTOU NA OFICINA?
              </label>
              <textarea
                id="ext-high"
                className={styles.textarea}
                placeholder="Ex.: As pausas com perguntas ajudaram a fixar o conteúdo..."
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ext-diff">
                5. QUAIS DIFICULDADES VOCÊ ENCONTROU?
              </label>
              <textarea
                id="ext-diff"
                className={styles.textarea}
                placeholder="Ex.: Laços de repetição ou tempo para concluir todas as aulas na semana..."
                value={difficulties}
                onChange={(e) => setDifficulties(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ext-sug">
                6. SUGESTÕES DE MELHORIA PARA PRÓXIMAS TURMAS
              </label>
              <textarea
                id="ext-sug"
                className={styles.textarea}
                placeholder="Ex.: Adicionar exercícios práticos extras ou mais aulas..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
              />
            </div>

            {error && <div className={styles.errorBox}>⚠️ {error}</div>}

            <div className={styles.footer}>
              <button type="button" className={styles.secondaryBtn} onClick={onClose}>
                CANCELAR
              </button>
              <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                {submitting
                  ? 'ENVIANDO...'
                  : '🏆 ENVIAR AVALIAÇÃO E LIBERAR CERTIFICADO'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
