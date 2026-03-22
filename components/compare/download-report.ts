interface Report {
  mode: 'comparison' | 'benefits';
  crawlQuality: 'full' | 'partial' | 'minimal';
  businessSummary: string;
  businessType: string;
  industry: string;
  teamSizeEstimate: string;
  painPoints: string[];
  fitScore: number;
  executiveSummary: { dimension: string; competitor: string; verly: string; winner: string }[];
  dimensionScores: Record<string, { verly: number; competitor: number }>;
  sections: {
    id: string;
    title: string;
    personalizedInsight: string;
    keyDifference: string;
    features: { feature: string; competitor: string; verly: string; verlyWins: boolean; relevanceToUser: string }[];
  }[];
  performanceMetrics: { metric: string; competitor: number | null; verly: number; unit: string }[];
  personalizedBenefits: string[];
  whenToChooseVerly: string[];
  recommendation: string;
  suggestedUseCases: { title: string; description: string; impact: string }[];
  implementationSteps: { step: number; title: string; description: string; timeEstimate: string }[];
  competitorName: string;
  competitorTagline: string;
  prospectDomain: string;
  generatedAt: string;
}

const DIMENSION_LABELS: Record<string, string> = {
  aiCapabilities: 'AI Capabilities', channelSupport: 'Channel Support', leadGeneration: 'Lead Generation',
  humanEscalation: 'Human Escalation', analytics: 'Analytics', customization: 'Customization',
  aiWriting: 'AI Writing', deployment: 'Deployment', pricing: 'Pricing',
  performance: 'Performance', security: 'Security',
};

function winnerLabel(w: string, name: string) {
  if (w === 'verly') return 'VerlyAI';
  if (w === 'competitor') return name;
  return 'Tie';
}

export function downloadReport(report: Report) {
  const date = new Date(report.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const isComparison = report.mode === 'comparison';
  const title = isComparison
    ? `VerlyAI vs ${report.competitorName} — Report for ${report.prospectDomain}`
    : `How VerlyAI Helps ${report.prospectDomain}`;
  const fitLabel = report.fitScore >= 85 ? 'Excellent Fit' : report.fitScore >= 70 ? 'Good Fit' : report.fitScore >= 50 ? 'Moderate Fit' : 'Low Fit';

  const css = `
    :root { --primary: #2563eb; --accent: #7c3aed; --muted: #6b7280; --border: #e5e7eb; --bg: #ffffff; --green: #16a34a; --red: #dc2626; --warn: #d97706; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; line-height: 1.6; background: #f8fafc; }
    .page { max-width: 900px; margin: 0 auto; background: var(--bg); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

    .hero { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 48px 40px; text-align: center; }
    .hero h1 { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
    .hero p { font-size: 15px; opacity: 0.85; }
    .hero .stats { display: flex; justify-content: center; gap: 24px; margin-top: 20px; }
    .hero .stat { background: rgba(255,255,255,0.15); border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; }

    .content { padding: 40px; }
    h2 { font-size: 18px; font-weight: 700; margin: 36px 0 16px; padding-bottom: 8px; border-bottom: 2px solid var(--primary); color: var(--primary); }
    h2:first-child { margin-top: 0; }
    h3 { font-size: 15px; font-weight: 700; margin: 20px 0 8px; color: #111; }
    p { margin-bottom: 10px; font-size: 13.5px; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
    .badge-primary { background: #eff6ff; color: var(--primary); }
    .badge-muted { background: #f3f4f6; color: var(--muted); }
    .meta { display: flex; gap: 8px; margin: 12px 0 24px; flex-wrap: wrap; }

    .fit-box { display: flex; align-items: center; gap: 24px; background: #eff6ff; border-radius: 16px; padding: 24px; margin: 16px 0 24px; }
    .fit-score { font-size: 56px; font-weight: 900; color: var(--primary); line-height: 1; }
    .fit-label { font-size: 16px; font-weight: 700; color: #111; }
    .fit-sub { font-size: 12px; color: var(--muted); }

    .card { background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #f0f0f0; }
    .card-title { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 6px; }
    .card-impact { display: inline-block; background: #eff6ff; color: var(--primary); font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 6px; margin-top: 8px; }

    .step { display: flex; gap: 16px; margin-bottom: 16px; }
    .step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--primary); color: white; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .step-time { font-size: 11px; color: var(--muted); font-weight: 600; background: #f3f4f6; padding: 2px 8px; border-radius: 4px; }

    table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 13px; }
    th { text-align: left; padding: 10px 12px; background: #f8fafc; border-bottom: 2px solid var(--border); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); font-weight: 700; }
    td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
    tr.verly-wins { background: #f0f7ff; }
    .winner { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
    .winner.verly { background: #eff6ff; color: var(--primary); }
    .winner.competitor { background: #fef2f2; color: var(--red); }
    .winner.tie { background: #f3f4f6; color: var(--muted); }

    .insight { background: #eff6ff; border-left: 3px solid var(--primary); padding: 12px 16px; margin: 10px 0; border-radius: 0 8px 8px 0; font-size: 13px; }
    .insight-label { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); margin-bottom: 4px; }
    .key-diff { background: #f9fafb; padding: 12px 16px; border-radius: 8px; margin: 10px 0; font-size: 13px; color: var(--muted); }

    .benefit { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-size: 13.5px; }
    .benefit-check { color: var(--primary); font-weight: 700; font-size: 16px; flex-shrink: 0; }

    .recommendation { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 28px; border-radius: 16px; margin: 28px 0; }
    .recommendation h3 { color: white; margin-top: 0; font-size: 16px; }
    .recommendation p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; }

    .scores-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 12px 0; }
    .score-row { display: flex; justify-content: space-between; padding: 8px 12px; background: #f9fafb; border-radius: 6px; font-size: 12px; }
    .score-v { color: var(--primary); font-weight: 700; }
    .score-c { color: var(--muted); }

    .relevance { font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 3px; }
    .relevance.High { background: #eff6ff; color: var(--primary); }
    .relevance.Medium { background: #fef9c3; color: #a16207; }
    .relevance.Low { background: #f3f4f6; color: var(--muted); }

    .cta { text-align: center; margin: 36px 0 20px; }
    .cta a { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; text-decoration: none; padding: 14px 36px; border-radius: 12px; font-weight: 700; font-size: 15px; }
    .footer { text-align: center; font-size: 11px; color: #9ca3af; padding: 24px 40px; border-top: 1px solid var(--border); }

    @media print {
      body { background: white; }
      .page { box-shadow: none; }
      .hero { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .recommendation { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      h2 { break-after: avoid; }
      table, .card, .recommendation { break-inside: avoid; }
    }`;

  let body = '';

  // ─── Hero ──────────────────────────────────────────────────────────
  body += `<div class="hero">
    <h1>${title}</h1>
    <p>Personalized AI-powered analysis for ${report.prospectDomain}</p>
    <div class="stats">
      <div class="stat">Fit Score: ${report.fitScore}/100</div>
      ${isComparison ? `<div class="stat">VerlyAI wins ${report.executiveSummary.filter(r => r.winner === 'verly').length}/${report.executiveSummary.length}</div>` : ''}
      <div class="stat">${date}</div>
    </div>
  </div><div class="content">`;

  // ─── Business Snapshot ─────────────────────────────────────────────
  body += `<h2>Your Business at a Glance</h2>
  <p>${report.businessSummary}</p>
  <div class="meta">
    <span class="badge badge-primary">${report.businessType}</span>
    <span class="badge badge-muted">${report.industry}</span>
    <span class="badge badge-muted">${report.teamSizeEstimate}</span>
  </div>`;

  if (report.painPoints.length > 0) {
    body += `<h3>Pain Points</h3><ul>${report.painPoints.map(p => `<li style="margin:4px 0;font-size:13px;color:#3f3f46">${p}</li>`).join('')}</ul>`;
  }

  // ─── Fit Score ─────────────────────────────────────────────────────
  body += `<div class="fit-box">
    <div class="fit-score">${report.fitScore}</div>
    <div><div class="fit-label">${fitLabel}</div><div class="fit-sub">VerlyAI Fit Score for ${report.prospectDomain}</div></div>
  </div>`;

  // ─── Benefits-Only: Use Cases + Implementation ─────────────────────
  if (!isComparison) {
    if (report.suggestedUseCases?.length > 0) {
      body += `<h2>Suggested AI Agent Use Cases</h2>`;
      report.suggestedUseCases.forEach(uc => {
        body += `<div class="card">
          <div class="card-title">${uc.title}</div>
          <p style="font-size:12.5px;color:#4b5563;margin:0">${uc.description}</p>
          <div class="card-impact">${uc.impact}</div>
        </div>`;
      });
    }

    if (report.implementationSteps?.length > 0) {
      body += `<h2>Implementation Plan</h2>`;
      report.implementationSteps.forEach(s => {
        body += `<div class="step">
          <div class="step-num">${s.step}</div>
          <div>
            <strong style="font-size:13.5px">${s.title}</strong> <span class="step-time">${s.timeEstimate}</span>
            <p style="font-size:12.5px;color:#6b7280;margin:4px 0 0">${s.description}</p>
          </div>
        </div>`;
      });
    }
  }

  // ─── Comparison: Exec Summary + Scores + Sections ──────────────────
  if (isComparison) {
    body += `<h2>Executive Summary</h2>
    <table><thead><tr><th>Dimension</th><th>${report.competitorName}</th><th style="color:var(--primary)">VerlyAI</th><th style="text-align:center">Winner</th></tr></thead><tbody>
    ${report.executiveSummary.map(r => `<tr${r.winner === 'verly' ? ' class="verly-wins"' : ''}>
      <td><strong>${r.dimension}</strong></td><td>${r.competitor}</td><td>${r.verly}</td>
      <td style="text-align:center"><span class="winner ${r.winner}">${winnerLabel(r.winner, report.competitorName)}</span></td>
    </tr>`).join('')}
    </tbody></table>`;

    body += `<h2>Dimension Scores (0-10)</h2><div class="scores-grid">
    ${Object.entries(report.dimensionScores).map(([k, v]) => `<div class="score-row">
      <span style="font-weight:600">${DIMENSION_LABELS[k] || k}</span>
      <span><span class="score-v">Verly ${v.verly}</span> &nbsp; <span class="score-c">${report.competitorName} ${v.competitor}</span></span>
    </div>`).join('')}
    </div>`;

    report.sections.forEach((s, i) => {
      body += `<h2>${i + 1}. ${s.title}</h2>
      <div class="insight"><div class="insight-label">Personalized for ${report.prospectDomain}</div>${s.personalizedInsight}</div>
      <table><thead><tr><th>Feature</th><th>${report.competitorName}</th><th style="color:var(--primary)">VerlyAI</th><th style="text-align:center">Relevance</th></tr></thead><tbody>
      ${s.features.map(f => `<tr${f.verlyWins ? ' class="verly-wins"' : ''}>
        <td><strong>${f.verlyWins ? '&#10003; ' : ''}${f.feature}</strong></td><td>${f.competitor}</td><td>${f.verly}</td>
        <td style="text-align:center"><span class="relevance ${f.relevanceToUser}">${f.relevanceToUser}</span></td>
      </tr>`).join('')}
      </tbody></table>
      <div class="key-diff"><strong>Key Difference:</strong> ${s.keyDifference}</div>`;
    });
  }

  // ─── Benefits ──────────────────────────────────────────────────────
  if (report.personalizedBenefits.length > 0) {
    body += `<h2>How VerlyAI Benefits ${report.prospectDomain}</h2>`;
    report.personalizedBenefits.forEach(b => {
      body += `<div class="benefit"><span class="benefit-check">&#10003;</span><span>${b}</span></div>`;
    });
  }

  if (isComparison && report.whenToChooseVerly.length > 0) {
    body += `<h2>Why Choose VerlyAI</h2><ul>
    ${report.whenToChooseVerly.map(r => `<li style="margin:6px 0;font-size:13px">${r}</li>`).join('')}</ul>`;
  }

  // ─── Recommendation + CTA ──────────────────────────────────────────
  body += `<div class="recommendation">
    <h3>Our Recommendation</h3>
    <p>${report.recommendation}</p>
  </div>
  <div class="cta">
    <p style="font-size:16px;font-weight:700;margin-bottom:12px">Ready to see the difference?</p>
    <a href="https://verlyai.xyz">Deploy Your AI Agent at verlyai.xyz</a>
  </div>
  </div>
  <div class="footer">&copy; ${new Date().getFullYear()} VerlyAI. Report generated on ${date} based on publicly available data.<br><a href="https://verlyai.xyz" style="color:var(--primary);text-decoration:none">verlyai.xyz</a></div>`;

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><style>${css}</style></head><body><div class="page">${body}</div></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = isComparison
    ? `VerlyAI-vs-${report.competitorName}-${report.prospectDomain}.html`
    : `VerlyAI-Benefits-${report.prospectDomain}.html`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
