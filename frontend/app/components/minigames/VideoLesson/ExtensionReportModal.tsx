'use client';

import { useEffect, useState } from 'react';
import styles from './ExtensionSurveyModal.module.css';
import {
  getExtensionReport,
  type ExtensionReportResponse,
} from '../../../../api/extension-survey';

interface ExtensionReportModalProps {
  onClose: () => void;
}

function buildAnexoIDraft(report: ExtensionReportResponse): string {
  const { summary, responses } = report;

  const formatBreakdown = (obj: Record<string, number>) => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return 'Sem registros ainda';
    return entries.map(([label, count]) => `${label} (${count})`).join('; ');
  };

  const highlightsList = responses
    .filter((r) => r.highlights)
    .map((r, idx) => `  - Participante ${idx + 1}: "${r.highlights}"`)
    .join('\n');

  const difficultiesList = responses
    .filter((r) => r.difficulties)
    .map((r, idx) => `  - Participante ${idx + 1}: "${r.difficulties}"`)
    .join('\n');

  const suggestionsList = responses
    .filter((r) => r.suggestions)
    .map((r, idx) => `  - Participante ${idx + 1}: "${r.suggestions}"`)
    .join('\n');

  return [
    '====================================================================',
    'ANEXO I — RASCUNHO COM DADOS EXTRAÍDOS (UNIGRANDE)',
    '====================================================================',
    '',
    '2. IDENTIFICAÇÃO DA ATIVIDADE (10%)',
    '- Nome do Projeto: Final Quest — Oficina Gamificada de Introdução à Lógica de Programação',
    '- Atividade: Curso/Oficina a distância gamificada com 2 encontros síncronos (10 horas)',
    `- Público-Alvo: ${formatBreakdown(summary.profileBreakdown)}`,
    `- Número de Pessoas Atendidas: ${summary.totalParticipants}`,
    '',
    'PERFIL DETALHADO DOS PARTICIPANTES (para Seção 3.2):',
    `- Faixas Etárias: ${formatBreakdown(summary.ageRangeBreakdown)}`,
    `- Escolaridade: ${formatBreakdown(summary.educationBreakdown)}`,
    `- Localidades: ${formatBreakdown(summary.cityBreakdown)}`,
    `- Contato prévio com programação: ${summary.priorProgrammingBreakdown.yes} já tiveram contato / ${summary.priorProgrammingBreakdown.no} primeiro contato`,
    '',
    'INDICADORES DE EXECUÇÃO E RESULTADOS (para Seção 3.3 — 10%):',
    `- Média de aulas concluídas: ${summary.avgCompletedLessons ?? 'N/A'} / ${summary.totalAvailableLessons} (${summary.completionRatePercent ?? 'N/A'}%)`,
    `- Avaliações pós-curso respondidas: ${summary.totalPostCompleted} / ${summary.totalParticipants}`,
    `- Certificados emitidos (10h): ${summary.totalCertified} (${summary.certificationRatePercent ?? 'N/A'}%)`,
    `- Confiança média ANTES da oficina: ${summary.avgPreConfidence ?? 'N/A'} / 5`,
    `- Confiança média DEPOIS da oficina: ${summary.avgPostConfidence ?? 'N/A'} / 5`,
    `- Evolução de confiança: ${summary.confidenceGain !== null ? `${summary.confidenceGain >= 0 ? '+' : ''}${summary.confidenceGain} pontos` : 'N/A'}${summary.confidenceGainPercent !== null ? ` (${summary.confidenceGainPercent >= 0 ? '+' : ''}${summary.confidenceGainPercent}%)` : ''}`,
    `- Avaliação da gamificação (RPG/XP/perguntas no vídeo): ${summary.avgGamificationRating ?? 'N/A'} / 5`,
    `- Avaliação geral da oficina: ${summary.avgOverallRating ?? 'N/A'} / 5`,
    '',
    'RELATOS POSITIVOS DOS PARTICIPANTES (Seção 3.3):',
    highlightsList || '  - Sem relatos registrados ainda',
    '',
    'DIFICULDADES RELATADAS (Seção 3.4 — Autoavaliação — 5%):',
    difficultiesList || '  - Sem dificuldades registradas ainda',
    '',
    'SUGESTÕES DE MELHORIA (Seção 3.4 — Autoavaliação — 5%):',
    suggestionsList || '  - Sem sugestões registradas ainda',
    '',
    'LEMBRETE — REGISTROS FOTOGRÁFICOS (25% — MÍNIMO 4 FOTOS NO MESMO ARQUIVO):',
    '  [ ] Foto 1: Reunião síncrona de abertura (segunda-feira) apresentando o Final Quest',
    '  [ ] Foto 2: Tela de participante preenchendo o Formulário Pré-Curso / respondendo aula',
    '  [ ] Foto 3: Acompanhamento durante a semana (ranking/progresso ou tira-dúvidas)',
    '  [ ] Foto 4: Reunião de encerramento (sexta-feira) com Pós-Curso ou Certificado PDF',
    '  [ ] Foto 5 (bônus): Print deste painel de resultados (Antes x Depois)',
  ].join('\n');
}

export default function ExtensionReportModal({ onClose }: ExtensionReportModalProps) {
  const [report, setReport] = useState<ExtensionReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    getExtensionReport('logicaGuanabara')
      .then((data) => setReport(data))
      .catch(() =>
        setError(
          'Não foi possível carregar o relatório. Verifique se sua conta possui permissão ADMIN.',
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleExportCsv = () => {
    if (!report) return;
    const headers = [
      'Nome',
      'Email',
      'Perfil',
      'Faixa Etaria',
      'Escolaridade',
      'Cidade/UF',
      'Contato Previo',
      'Aulas Concluidas',
      'Certificado',
      'Confianca Antes (1-5)',
      'Confianca Depois (1-5)',
      'Nota Gamificacao (1-5)',
      'Nota Geral (1-5)',
      'Expectativa',
      'Pontos Positivos',
      'Dificuldades',
      'Sugestoes',
    ];

    const escapeCsv = (val: unknown) => {
      const str = String(val ?? '').replace(/\r?\n/g, ' ');
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = report.responses.map((r) => [
      r.name,
      r.email,
      r.profileType ?? '',
      r.ageRange ?? '',
      r.educationLevel ?? '',
      r.cityState ?? '',
      r.priorProgramming === null ? '' : r.priorProgramming ? 'Sim' : 'Não',
      r.completedLessonsCount,
      r.hasCertificate ? 'Sim' : 'Não',
      r.preConfidence ?? '',
      r.postConfidence ?? '',
      r.gamificationRating ?? '',
      r.overallRating ?? '',
      r.expectation ?? '',
      r.highlights ?? '',
      r.difficulties ?? '',
      r.suggestions ?? '',
    ]);

    const csv =
      '\uFEFF' +
      [headers.map(escapeCsv).join(';'), ...rows.map((row) => row.map(escapeCsv).join(';'))].join(
        '\n',
      );

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'relatorio-extensao-final-quest.csv';
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handleDownloadAnexoITxt = () => {
    if (!report) return;
    const text = buildAnexoIDraft(report);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'rascunho-anexo-1-extensao-unigrande.txt';
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handleCopyTextSummary = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(buildAnexoIDraft(report));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={`${styles.modal} ${styles.reportModal}`}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>PAINEL ADMIN • ANEXO I UNIGRANDE</span>
            <h2 className={styles.title}>📊 RELATÓRIO DO PROJETO DE EXTENSÃO</h2>
            <p className={styles.subtitle}>
              Dados consolidados dos alunos (contas ADMIN não entram nas métricas) prontos para o
              Anexo I da UNIGRANDE.
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {loading && <p className={styles.subtitle}>Carregando dados da oficina...</p>}
        {error && <div className={styles.errorBox}>⚠️ {error}</div>}

        {!loading && !error && report && (
          <>
            <div className={styles.kpiGrid}>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>{report.summary.totalParticipants}</span>
                <span className={styles.kpiLabel}>PESSOAS ATENDIDAS</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>
                  {report.summary.avgCompletedLessons ?? '-'} /{' '}
                  {report.summary.totalAvailableLessons}
                </span>
                <span className={styles.kpiLabel}>
                  MÉDIA DE AULAS ({report.summary.completionRatePercent ?? 0}%)
                </span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>
                  {report.summary.totalCertified} ({report.summary.certificationRatePercent ?? 0}%)
                </span>
                <span className={styles.kpiLabel}>CERTIFICADOS EMITIDOS</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>
                  {report.summary.avgPreConfidence ?? '-'} →{' '}
                  {report.summary.avgPostConfidence ?? '-'}
                </span>
                <span className={styles.kpiLabel}>
                  CONFIANÇA ANTES → DEPOIS
                  {report.summary.confidenceGainPercent !== null
                    ? ` (+${report.summary.confidenceGainPercent}%)`
                    : ''}
                </span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>
                  {report.summary.avgGamificationRating ?? '-'}/5
                </span>
                <span className={styles.kpiLabel}>NOTA GAMIFICAÇÃO</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiValue}>
                  {report.summary.avgOverallRating ?? '-'}/5
                </span>
                <span className={styles.kpiLabel}>NOTA GERAL</span>
              </div>
            </div>

            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>PERFIL DO PÚBLICO-ALVO (ITEM 2 & 3.2)</h3>
              <div className={styles.chipRow}>
                {Object.entries(report.summary.profileBreakdown).length === 0 ? (
                  <span className={styles.responseMeta}>Nenhuma resposta pré-curso ainda.</span>
                ) : (
                  <>
                    {Object.entries(report.summary.profileBreakdown).map(([label, count]) => (
                      <span key={`p-${label}`} className={styles.chip}>
                        {label}: <strong>{count}</strong>
                      </span>
                    ))}
                    {Object.entries(report.summary.ageRangeBreakdown).map(([label, count]) => (
                      <span key={`a-${label}`} className={styles.chip}>
                        Idade {label}: <strong>{count}</strong>
                      </span>
                    ))}
                    {Object.entries(report.summary.educationBreakdown).map(([label, count]) => (
                      <span key={`e-${label}`} className={styles.chip}>
                        {label}: <strong>{count}</strong>
                      </span>
                    ))}
                    <span className={styles.chip}>
                      Primeiro contato com programação:{' '}
                      <strong>{report.summary.priorProgrammingBreakdown.no}</strong> | Já programou:{' '}
                      <strong>{report.summary.priorProgrammingBreakdown.yes}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>
                PARTICIPANTES E FEEDBACKS ({report.responses.length})
              </h3>
              {report.responses.length === 0 ? (
                <p className={styles.responseMeta}>
                  Ainda não há participantes registrados nos formulários.
                </p>
              ) : (
                report.responses.map((r) => (
                  <div key={r.userId} className={styles.responseCard}>
                    <div className={styles.responseHeader}>
                      <span className={styles.responseName}>
                        {r.name} ({r.email})
                      </span>
                      <span className={styles.responseMeta}>
                        Aulas: {r.completedLessonsCount}/{report.summary.totalAvailableLessons} |
                        Certificado: {r.hasCertificate ? '✅ Sim' : '⏳ Pendente'}
                      </span>
                    </div>
                    <div className={styles.responseMeta}>
                      Perfil: {r.profileType || '-'} • {r.ageRange || '-'} •{' '}
                      {r.educationLevel || '-'} • {r.cityState || '-'} • Contato prévio:{' '}
                      {r.priorProgramming === null
                        ? '-'
                        : r.priorProgramming
                          ? 'Sim'
                          : 'Não'}
                    </div>
                    <div className={styles.feedbackRow}>
                      <strong>Confiança:</strong> Antes {r.preConfidence ?? '-'}/5 → Depois{' '}
                      {r.postConfidence ?? '-'}/5 | <strong>Gamificação:</strong>{' '}
                      {r.gamificationRating ?? '-'}/5 | <strong>Geral:</strong>{' '}
                      {r.overallRating ?? '-'}/5
                    </div>
                    {r.expectation && (
                      <div className={styles.feedbackRow}>
                        <strong>Expectativa:</strong> {r.expectation}
                      </div>
                    )}
                    {r.highlights && (
                      <div className={styles.feedbackRow}>
                        <strong>Pontos positivos:</strong> {r.highlights}
                      </div>
                    )}
                    {r.difficulties && (
                      <div className={styles.feedbackRow}>
                        <strong>Dificuldades:</strong> {r.difficulties}
                      </div>
                    )}
                    {r.suggestions && (
                      <div className={styles.feedbackRow}>
                        <strong>Sugestões:</strong> {r.suggestions}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleCopyTextSummary}
              >
                {copiedSummary ? '✓ COPIADO!' : '📋 COPIAR ANEXO I'}
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleDownloadAnexoITxt}
              >
                📄 BAIXAR RASCUNHO (.TXT)
              </button>
              <button type="button" className={styles.primaryBtn} onClick={handleExportCsv}>
                ⬇️ EXPORTAR CSV
              </button>
              <button type="button" className={styles.secondaryBtn} onClick={onClose}>
                FECHAR
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
