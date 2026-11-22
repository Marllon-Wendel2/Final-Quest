'use client';

import { useMemo, useState } from 'react';
import styles from './CourseCertificateModal.module.css';
import { VIDEO_LESSONS } from './lessons.config';

export interface CourseCertificateProps {
  studentName: string;
  studentEmail?: string;
  userId?: string;
  certificates?: string[];
  completedLessonsCount?: number;
  totalLessonsCount?: number;
  totalCoursePoints?: number;
  completedAtIso?: string;
  onClose: () => void;
}

interface CertificateMetadata {
  id: string;
  shortLabel: string;
  courseTitle: string;
  subtitle: string;
  workloadHours: number;
  totalLessons: number;
  totalQuestions: number;
  totalPoints: number;
  modules: string[];
}

const LOGICA_TOTAL_QUESTIONS = VIDEO_LESSONS.reduce(
  (acc, lesson) => acc + lesson.questions.length,
  0,
);

const CERTIFICATE_CATALOG: Record<string, CertificateMetadata> = {
  logicaGuanabara: {
    id: 'logicaGuanabara',
    shortLabel: 'Lógica (Guanabara)',
    courseTitle: 'Introdução à Lógica de Programação',
    subtitle:
      'Oficina de Extensão (UNIGRANDE) • Algoritmos • VisuAlg • Scratch • Condicionais • Repetições • Rotinas • Vetores • Matrizes',
    workloadHours: 10,
    totalLessons: VIDEO_LESSONS.length,
    totalQuestions: LOGICA_TOTAL_QUESTIONS,
    totalPoints: 3050,
    modules: VIDEO_LESSONS.map((lesson) => lesson.title),
  },
  pythonDevDojo: {
    id: 'pythonDevDojo',
    shortLabel: 'Python (DevDojo)',
    courseTitle: 'Python — Maratona de Programação DevDojo',
    subtitle:
      'Sintaxe Python • Tipos • Controle de Fluxo • Funções • Coleções • Módulos • Orientação a Objetos',
    workloadHours: 12,
    totalLessons: 15,
    totalQuestions: 45,
    totalPoints: 3200,
    modules: [
      'Aula 1: Introdução ao Python e Ambiente',
      'Aula 2: Variáveis e Tipos Primitivos',
      'Aula 3: Entrada de Dados e Operadores',
      'Aula 4: Manipulação de Strings',
      'Aula 5: Estruturas Condicionais (if / elif / else)',
      'Aula 6: Laços de Repetição (while)',
      'Aula 7: Laços de Repetição (for e range)',
      'Aula 8: Listas e Tuplas',
      'Aula 9: Dicionários e Conjuntos (sets)',
      'Aula 10: Funções e Parâmetros',
      'Aula 11: Escopo, Retorno e Lambda',
      'Aula 12: Tratamento de Exceções',
      'Aula 13: Módulos e Pacotes',
      'Aula 14: Manipulação de Arquivos',
      'Aula 15: Introdução à Orientação a Objetos',
    ],
  },
};

function resolveCertificateMeta(
  certId: string,
  overrides?: {
    completedLessonsCount?: number;
    totalLessonsCount?: number;
    totalCoursePoints?: number;
  },
): CertificateMetadata {
  const known = CERTIFICATE_CATALOG[certId];
  if (known) {
    if (certId === 'logicaGuanabara') {
      return {
        ...known,
        totalLessons: overrides?.totalLessonsCount || known.totalLessons,
        totalPoints: overrides?.totalCoursePoints || known.totalPoints,
      };
    }
    return known;
  }

  const humanized = certId
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: certId,
    shortLabel: humanized,
    courseTitle: `Curso Gamificado: ${humanized}`,
    subtitle: 'Trilha Completa Concluída na Academia Final Quest RPG',
    workloadHours: 10,
    totalLessons: overrides?.totalLessonsCount || 15,
    totalQuestions: 45,
    totalPoints: overrides?.totalCoursePoints || 3000,
    modules: [
      `Módulo concluído com aprovação integral (${certId})`,
    ],
  };
}

function computeVerificationCode(seed: string): string {
  const fnv1a = (input: string) => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(36).toUpperCase().padStart(7, '0');
  };

  const part1 = fnv1a(`${seed}:fq-cert-a`).slice(0, 4);
  const part2 = fnv1a(`${seed}:fq-cert-b`).slice(0, 4);
  return `FQ-CERT-${part1}-${part2}`;
}

function formatDatePtBr(iso?: string): string {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function buildCertificateCanvas(params: {
  studentName: string;
  studentEmail?: string;
  meta: CertificateMetadata;
  formattedDate: string;
  verificationCode: string;
}): HTMLCanvasElement {
  const { studentName, studentEmail, meta, formattedDate, verificationCode } = params;
  const canvas = document.createElement('canvas');
  const width = 1600;
  const height = 1130;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#161124');
  bg.addColorStop(0.5, '#101d14');
  bg.addColorStop(1, '#120f1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width / 2, 180, 40, width / 2, 260, 720);
  glow.addColorStop(0, 'rgba(232, 200, 120, 0.16)');
  glow.addColorStop(1, 'rgba(232, 200, 120, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  ctx.strokeStyle = '#8a6d3b';
  ctx.lineWidth = 3;
  ctx.strokeRect(58, 58, width - 116, height - 116);

  const cornerSize = 36;
  ctx.strokeStyle = '#e8c878';
  ctx.lineWidth = 6;
  const drawCorner = (x: number, y: number, dx: number, dy: number) => {
    ctx.beginPath();
    ctx.moveTo(x + dx * cornerSize, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + dy * cornerSize);
    ctx.stroke();
  };
  drawCorner(76, 76, 1, 1);
  drawCorner(width - 76, 76, -1, 1);
  drawCorner(76, height - 76, 1, -1);
  drawCorner(width - 76, height - 76, -1, -1);

  ctx.textAlign = 'center';

  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('★  FINAL QUEST — ACADEMIA RPG  ★', width / 2, 138);

  ctx.fillStyle = '#e8c878';
  ctx.font = 'bold 54px Georgia, serif';
  ctx.fillText('CERTIFICADO DE CONCLUSÃO', width / 2, 218);

  ctx.fillStyle = '#8a9a70';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(`ID DO CERTIFICADO: ${meta.id}`, width / 2, 250);

  ctx.strokeStyle = '#8a6d3b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(320, 272);
  ctx.lineTo(width - 320, 272);
  ctx.stroke();

  ctx.fillStyle = '#b4c29c';
  ctx.font = '26px Georgia, serif';
  ctx.fillText('Certificamos que o(a) aventureiro(a)', width / 2, 336);

  ctx.fillStyle = '#fff6d6';
  ctx.font = 'bold 56px Georgia, serif';
  ctx.fillText(studentName.toUpperCase(), width / 2, 414);

  if (studentEmail) {
    ctx.fillStyle = '#8a9a70';
    ctx.font = '22px monospace';
    ctx.fillText(studentEmail, width / 2, 456);
  }

  ctx.fillStyle = '#e8dcc8';
  ctx.font = '26px Georgia, serif';
  ctx.fillText('concluiu com êxito todas as missões do curso', width / 2, 526);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 3;
  ctx.fillRect(200, 556, width - 400, 112);
  ctx.strokeRect(200, 556, width - 400, 112);

  ctx.fillStyle = '#e8c878';
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillText(meta.courseTitle, width / 2, 612);

  ctx.fillStyle = '#b4c29c';
  ctx.font = '19px monospace';
  ctx.fillText(meta.subtitle, width / 2, 648);

  const stats = [
    { value: `${meta.workloadHours} HORAS`, label: 'CARGA HORÁRIA' },
    { value: `${meta.totalLessons} / ${meta.totalLessons}`, label: 'AULAS CONCLUÍDAS' },
    { value: `${meta.totalPoints} PTS`, label: 'XP DO CURSO' },
  ];
  const cardW = 320;
  const cardH = 120;
  const gap = 40;
  const startX = (width - (cardW * 3 + gap * 2)) / 2;

  stats.forEach((stat, idx) => {
    const x = startX + idx * (cardW + gap);
    const y = 720;
    ctx.fillStyle = 'rgba(201, 168, 76, 0.1)';
    ctx.strokeStyle = '#8a6d3b';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, cardW, cardH);
    ctx.strokeRect(x, y, cardW, cardH);

    ctx.fillStyle = '#e8c878';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(stat.value, x + cardW / 2, y + 58);

    ctx.fillStyle = '#b4c29c';
    ctx.font = 'bold 17px monospace';
    ctx.fillText(stat.label, x + cardW / 2, y + 95);
  });

  ctx.strokeStyle = '#8a6d3b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 915);
  ctx.lineTo(width - 140, 915);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#8a9a70';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('DATA DE CONCLUSÃO', 150, 960);
  ctx.fillStyle = '#e8dcc8';
  ctx.font = 'bold 26px monospace';
  ctx.fillText(formattedDate, 150, 998);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillText('Final Quest', width / 2, 972);
  ctx.fillStyle = '#8a9a70';
  ctx.font = '18px monospace';
  ctx.fillText('Certificado Oficial', width / 2, 1002);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#8a9a70';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('CÓDIGO DE VERIFICAÇÃO', width - 150, 960);
  ctx.fillStyle = '#e8c878';
  ctx.font = 'bold 24px monospace';
  ctx.fillText(verificationCode, width - 150, 998);

  return canvas;
}

/**
 * Generates a valid single-page landscape PDF (842 x 595 pt) embedding the canvas JPEG image
 * so the browser downloads a real .pdf file directly without opening a print dialog.
 */
function canvasToPdfBlob(canvas: HTMLCanvasElement): Blob {
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const base64 = dataUrl.split(',')[1] || '';
  const binaryStr = atob(base64);
  const jpegBytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i += 1) {
    jpegBytes[i] = binaryStr.charCodeAt(i);
  }

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0]; // index 0 reserved for free object 0
  let byteLength = 0;

  const pushText = (str: string) => {
    const bytes = encoder.encode(str);
    chunks.push(bytes);
    byteLength += bytes.length;
  };

  const pushBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    byteLength += bytes.length;
  };

  const startObj = (id: number) => {
    offsets[id] = byteLength;
    pushText(`${id} 0 obj\n`);
  };

  const endObj = () => {
    pushText('\nendobj\n');
  };

  // PDF Header
  pushText('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // 1: Catalog
  startObj(1);
  pushText('<< /Type /Catalog /Pages 2 0 R >>');
  endObj();

  // 2: Pages
  startObj(2);
  pushText('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  endObj();

  // 3: Page (A4 Landscape: 842 x 595 pt)
  startObj(3);
  pushText(
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>',
  );
  endObj();

  // 4: Image XObject (DCTDecode JPEG)
  startObj(4);
  pushText(
    `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
  );
  pushBytes(jpegBytes);
  pushText('\nendstream');
  endObj();

  // 5: Page content stream drawing the image full-bleed
  const contentStream = 'q\n842 0 0 595 0 0 cm\n/Im0 Do\nQ\n';
  startObj(5);
  pushText(`<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream`);
  endObj();

  // Xref table
  const xrefOffset = byteLength;
  pushText('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i += 1) {
    const padded = String(offsets[i]).padStart(10, '0');
    pushText(`${padded} 00000 n \n`);
  }

  // Trailer
  pushText(
    `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
  );

  const totalBytes = new Uint8Array(byteLength);
  let cursor = 0;
  for (const chunk of chunks) {
    totalBytes.set(chunk, cursor);
    cursor += chunk.length;
  }

  return new Blob([totalBytes], { type: 'application/pdf' });
}

export default function CourseCertificateModal({
  studentName,
  studentEmail,
  userId,
  certificates,
  completedLessonsCount,
  totalLessonsCount,
  totalCoursePoints,
  completedAtIso,
  onClose,
}: CourseCertificateProps) {
  const certificateList = useMemo(() => {
    if (certificates && certificates.length > 0) {
      return Array.from(new Set(certificates));
    }
    return [];
  }, [certificates]);

  const [selectedCertId, setSelectedCertId] = useState<string>(
    () => certificateList[0] || 'logicaGuanabara',
  );
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeCertId = certificateList.includes(selectedCertId)
    ? selectedCertId
    : certificateList[0] || 'logicaGuanabara';

  const activeMeta = useMemo(
    () =>
      resolveCertificateMeta(activeCertId, {
        completedLessonsCount,
        totalLessonsCount,
        totalCoursePoints,
      }),
    [activeCertId, completedLessonsCount, totalLessonsCount, totalCoursePoints],
  );

  const formattedDate = useMemo(() => formatDatePtBr(completedAtIso), [completedAtIso]);

  const verificationCode = useMemo(
    () =>
      computeVerificationCode(
        `${userId || studentEmail || studentName}|${activeMeta.id}|${formattedDate}`,
      ),
    [userId, studentEmail, studentName, activeMeta.id, formattedDate],
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  const getSafeStudentSlug = () =>
    studentName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'aluno';

  const handleDownloadPdf = () => {
    const canvas = buildCertificateCanvas({
      studentName,
      studentEmail,
      meta: activeMeta,
      formattedDate,
      verificationCode,
    });
    const pdfBlob = canvasToPdfBlob(canvas);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.download = `certificado-${activeMeta.id}-${getSafeStudentSlug()}.pdf`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handleDownloadPng = () => {
    const canvas = buildCertificateCanvas({
      studentName,
      studentEmail,
      meta: activeMeta,
      formattedDate,
      verificationCode,
    });
    const link = document.createElement('a');
    link.download = `certificado-${activeMeta.id}-${getSafeStudentSlug()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Certificados do Aluno"
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar certificados">
          ✕
        </button>

        {certificateList.length === 0 ? (
          <div className={styles.certificateFrame}>
            <span className={styles.cornerTL} />
            <span className={styles.cornerTR} />
            <span className={styles.cornerBL} />
            <span className={styles.cornerBR} />

            <div className={styles.emptyState}>
              <div className={styles.sealRow}>
                <span className={styles.sealIcon}>🔒</span>
              </div>
              <h2 className={styles.emptyTitle}>NENHUM CERTIFICADO DESBLOQUEADO</h2>
              <p className={styles.emptyText}>
                Complete todas as 15 aulas de Introdução à Lógica de Programação para
                desbloquear seu certificado oficial e baixá-lo em PDF!
              </p>
              <button type="button" className={styles.closeFooterBtn} onClick={onClose}>
                FECHAR
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.certificateFrame}>
            <span className={styles.cornerTL} />
            <span className={styles.cornerTR} />
            <span className={styles.cornerBL} />
            <span className={styles.cornerBR} />

            {certificateList.length > 1 && (
              <div className={styles.certTabs}>
                {certificateList.map((certId) => {
                  const meta = resolveCertificateMeta(certId);
                  const isActive = certId === activeCertId;
                  return (
                    <button
                      key={certId}
                      type="button"
                      onClick={() => setSelectedCertId(certId)}
                      className={`${styles.certTab} ${isActive ? styles.certTabActive : ''}`}
                    >
                      📜 {meta.shortLabel}
                    </button>
                  );
                })}
              </div>
            )}

            <div className={styles.sealRow}>
              <span className={styles.sealIcon}>🏆</span>
              <span className={styles.sealIcon}>📜</span>
              <span className={styles.sealIcon}>🏆</span>
            </div>

            <p className={styles.brandTag}>★ FINAL QUEST — ACADEMIA RPG ★</p>
            <h2 className={styles.mainTitle}>CERTIFICADO DE CONCLUSÃO</h2>

            <div className={styles.divider}>✦</div>

            <p className={styles.certifyText}>Certificamos que o(a) aventureiro(a)</p>
            <h3 className={styles.studentName}>{studentName}</h3>
            {studentEmail && <p className={styles.studentEmail}>{studentEmail}</p>}

            <div className={styles.courseBox}>
              <p className={styles.courseLabel}>
                CONCLUIU COM ÊXITO A OFICINA DE EXTENSÃO (UNIGRANDE)
              </p>
              <p className={styles.courseName}>{activeMeta.courseTitle}</p>
              <span className={styles.certIdBadge}>
                ID: {activeMeta.id} • CARGA HORÁRIA: {activeMeta.workloadHours}H
              </span>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{activeMeta.workloadHours}h</span>
                <span className={styles.statLabel}>CARGA HORÁRIA</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>
                  {activeMeta.totalLessons}/{activeMeta.totalLessons}
                </span>
                <span className={styles.statLabel}>AULAS CONCLUÍDAS</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{activeMeta.totalPoints} PTS</span>
                <span className={styles.statLabel}>XP DO CURSO</span>
              </div>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>DATA DE CONCLUSÃO</span>
                <span className={styles.metaValue}>{formattedDate}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>CÓDIGO DE VERIFICAÇÃO</span>
                <div className={styles.codeRow}>
                  <span className={styles.metaValue}>{verificationCode}</span>
                  <button type="button" className={styles.copyBtn} onClick={handleCopyCode}>
                    {copied ? '✓ COPIADO' : 'COPIAR'}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={styles.curriculumToggle}
              onClick={() => setShowCurriculum((prev) => !prev)}
            >
              {showCurriculum ? '▲ OCULTAR CONTEÚDO DO CURSO' : '▼ VER CONTEÚDO DO CURSO'}
            </button>

            {showCurriculum && (
              <div className={styles.curriculumList}>
                {activeMeta.modules.map((modTitle, idx) => (
                  <div key={idx} className={styles.curriculumItem}>
                    <span className={styles.curriculumCheck}>✓</span>
                    <span>{modTitle}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.primaryBtn} onClick={handleDownloadPdf}>
                ⬇️ BAIXAR PDF
              </button>
              <button type="button" className={styles.secondaryBtn} onClick={handleDownloadPng}>
                🖼️ BAIXAR PNG
              </button>
              <button type="button" className={styles.closeFooterBtn} onClick={onClose}>
                FECHAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
