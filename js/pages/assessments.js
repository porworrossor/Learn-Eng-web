// ========================================
// LingoPath Assessment Center & Final Evaluation
// ========================================

import { Store } from '../store.js';
import { CurriculumService } from '../services/curriculum.js';
import { CONFIG } from '../config.js';
import { Router } from '../router.js';

export function renderAssessments(container) {
  const placement = Store.getPlacement();
  const progress = Store.getProgress();
  const curriculum = CurriculumService.getCurriculum();
  const stages = curriculum.stages || [];
  const currProgress = CurriculumService.calculateProgress();

  const isFinalUnlocked = currProgress.percentage >= 60; // Unlocked when significant curriculum completed

  container.innerHTML = `
    <div class="page-container page-container--wide">
      <div class="page-header__breadcrumb">
        <a href="#/dashboard">Dashboard</a> <span>/</span> <span>Assessments</span>
      </div>
      <h1 class="page-header__title">Assessment & Evaluation Center</h1>
      <p class="page-header__subtitle">
        Validate your English growth through diagnostic stage checkpoints and comprehensive CEFR final evaluation.
      </p>

      <!-- Placement Test Summary Card -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <h3 style="font-size: var(--text-lg); font-weight: bold; color: var(--color-neutral-900);">
              Initial Diagnostic Baseline
            </h3>
            <p style="font-size: 13px; color: var(--color-neutral-500);">
              Taken on ${placement ? new Date(placement.scoredAt || Date.now()).toLocaleDateString() : 'Demo Baseline'}
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="badge badge--${(placement?.overall?.level || 'a2').toLowerCase()}" style="font-size: 16px; padding: 6px 14px;">
              Baseline: ${placement?.overall?.level || 'A2'} (${placement?.overall?.levelName || 'Elementary'})
            </span>
            <a href="#/placement" class="btn btn--outline btn--sm">Retake Test</a>
          </div>
        </div>

        <div class="grid-4">
          ${['reading', 'listening', 'writing', 'speaking'].map(skill => {
            const data = placement?.skills?.[skill] || { level: 'A2' };
            return `
              <div style="padding: 12px; background: var(--color-neutral-50); border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 12px; text-transform: capitalize; color: var(--color-neutral-500);">${skill}</div>
                <div style="font-size: 18px; font-weight: bold; color: var(--color-neutral-900); margin-top: 2px;">${data.level}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Stage Checkpoint Assessments -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
        <h3 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: var(--space-2); color: var(--color-neutral-900);">
          Stage Mastery Checkpoints
        </h3>
        <p style="font-size: 13px; color: var(--color-neutral-500); margin-bottom: var(--space-4);">
          Complete each curriculum stage to unlock its corresponding diagnostic milestone.
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${stages.map((stage, idx) => {
            const completedCount = (progress.completedLessons || []).length;
            const stageUnlocked = idx === 0 || completedCount >= idx * 3;
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border: 1px solid var(--color-neutral-150); border-radius: var(--radius-lg); background: ${stageUnlocked ? 'var(--color-neutral-0)' : 'var(--color-neutral-50)'}; opacity: ${stageUnlocked ? '1' : '0.6'};">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 20px;">${stageUnlocked ? '🎯' : '🔒'}</span>
                  <div>
                    <div style="font-weight: 600; font-size: 15px;">Stage ${idx + 1} Assessment: ${stage.title}</div>
                    <div style="font-size: 12px; color: var(--color-neutral-500);">Evaluates ${stage.level}-level grammar, reading, and listening</div>
                  </div>
                </div>
                <a href="#/placement" class="btn btn--sm ${stageUnlocked ? 'btn--secondary' : 'btn--ghost'}" ${stageUnlocked ? '' : 'disabled'}>
                  ${stageUnlocked ? 'Start Assessment' : 'Locked'}
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Final Evaluation -->
      <div class="card" style="padding: var(--space-6); border: 2px solid ${isFinalUnlocked ? 'var(--color-primary-400)' : 'var(--color-neutral-200)'}; background: ${isFinalUnlocked ? 'linear-gradient(135deg, var(--color-primary-50), var(--color-neutral-0))' : 'var(--color-neutral-0)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: var(--text-xl); font-weight: bold; color: var(--color-neutral-900);">
                Comprehensive Final CEFR Evaluation
              </h3>
              ${isFinalUnlocked ? '<span class="badge badge--success">Ready to Take</span>' : '<span class="badge badge--neutral">Requires 60% Path Completion</span>'}
            </div>
            <p style="font-size: 13px; color: var(--color-neutral-500); margin-top: 4px;">
              Directly compares your starting baseline against your current proficiency with new evaluation tasks.
            </p>
          </div>
          <a href="#/placement" class="btn btn--primary btn--lg" ${isFinalUnlocked ? '' : 'disabled'}>
            Begin Final Evaluation →
          </a>
        </div>

        <div class="alert alert--info" style="margin-bottom: 0;">
          <div class="alert__title">Educational Integrity Standard</div>
          <div class="alert__desc">
            Advancing your estimated CEFR level is grounded strictly on assessment performance and rubrics, not merely clicking through lessons.
          </div>
        </div>
      </div>
    </div>
  `;
}
