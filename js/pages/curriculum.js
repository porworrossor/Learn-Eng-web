// ========================================
// LingoPath Learning Path / Curriculum Page
// ========================================

import { CurriculumService } from '../services/curriculum.js';
import { Store } from '../store.js';

export function renderCurriculum(container) {
  const curriculum = CurriculumService.getCurriculum();
  const progress = Store.getProgress();
  const completedLessons = new Set(progress.completedLessons || []);
  const overallProgress = CurriculumService.calculateProgress();

  container.innerHTML = `
    <div class="page-container page-container--wide">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8);">
        <div>
          <div class="page-header__breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> <span>Learning Path</span>
          </div>
          <h1 class="page-header__title">My Personalized Curriculum</h1>
          <p class="page-header__subtitle">
            Progressing from <strong>${curriculum.currentLevel}</strong> to <strong>${curriculum.targetLevel}</strong> &bull; ${curriculum.stages?.length || 0} Stages &bull; ${curriculum.totalModules || 0} Modules &bull; ${curriculum.totalLessons || 0} Lessons (~${curriculum.estimatedHours || 30} hrs)
          </p>
        </div>
        <div style="display: flex; gap: var(--space-3);">
          <a href="#/goal-selection" class="btn btn--outline">
            ⚙️ Adjust Goals
          </a>
        </div>
      </div>

      <!-- Overall Path Progress -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-8);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
          <span style="font-weight: 600;">Overall Path Completion</span>
          <span style="font-weight: bold; color: var(--color-primary-700);">${overallProgress.completed} / ${overallProgress.total} lessons (${overallProgress.percentage}%)</span>
        </div>
        <div class="progress" style="height: 10px;">
          <div class="progress__bar" style="width: ${overallProgress.percentage}%;"></div>
        </div>
      </div>

      <!-- Stages Hierarchy -->
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        ${(curriculum.stages || []).map((stage, stageIdx) => {
          const stageLessons = stage.modules.flatMap(m => m.lessons);
          const stageCompleted = stageLessons.filter(l => completedLessons.has(l.id)).length;
          const isDone = stageCompleted === stageLessons.length && stageLessons.length > 0;

          return `
            <div class="curriculum-stage ${isDone ? 'curriculum-stage--completed' : ''}">
              <div class="curriculum-stage__header" data-stage="${stage.id}">
                <div class="curriculum-stage__number">${isDone ? '✓' : stageIdx + 1}</div>
                <div class="curriculum-stage__info">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="curriculum-stage__title">${stage.title}</div>
                    <span class="badge badge--${stage.level.toLowerCase()}">${stage.level}</span>
                  </div>
                  <div class="curriculum-stage__meta">
                    ${stage.description} &bull; <strong>${stageCompleted} / ${stageLessons.length} lessons completed</strong>
                  </div>
                </div>
                <span class="stage-toggle-icon" style="font-size: 18px;">▼</span>
              </div>

              <div class="curriculum-stage__modules" id="modules-${stage.id}" style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4);">
                ${stage.modules.map((mod, modIdx) => `
                  <div class="card" style="padding: var(--space-5);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3);">
                      <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <h4 style="font-size: 16px; font-weight: bold; color: var(--color-neutral-900);">${mod.title}</h4>
                          <span class="badge badge--neutral" style="text-transform: capitalize;">${mod.skill}</span>
                        </div>
                        <div style="font-size: 12px; color: var(--color-neutral-500); margin-top: 4px;">
                          Objectives: ${mod.objectives.join(' • ')}
                        </div>
                      </div>
                      <span style="font-size: 12px; color: var(--color-neutral-400);">${mod.duration || 45} mins</span>
                    </div>

                    <!-- Lessons list -->
                    <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                      ${mod.lessons.map((lesson, lIdx) => {
                        const isLessonCompleted = completedLessons.has(lesson.id);
                        return `
                          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: var(--radius-md); background: ${isLessonCompleted ? 'var(--color-success-light)' : 'var(--color-neutral-50)'}; border: 1px solid var(--color-neutral-150);">
                            <div style="display: flex; align-items: center; gap: 10px;">
                              <span>${isLessonCompleted ? '✅' : '📖'}</span>
                              <span style="font-size: 14px; font-weight: 500;">${lesson.title}</span>
                              ${lesson.hasDemo ? '<span class="badge badge--primary" style="font-size: 10px; padding: 1px 6px;">Interactive</span>' : ''}
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                              <span style="font-size: 12px; color: var(--color-neutral-500);">${lesson.duration || 15}m</span>
                              <a href="#/lesson/${lesson.id}" class="btn btn--sm ${isLessonCompleted ? 'btn--ghost' : 'btn--primary'}">
                                ${isLessonCompleted ? 'Review' : 'Start'}
                              </a>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Accordion toggle handlers
  container.querySelectorAll('.curriculum-stage__header').forEach(header => {
    header.onclick = () => {
      const stageId = header.dataset.stage;
      const modContainer = document.getElementById(`modules-${stageId}`);
      const icon = header.querySelector('.stage-toggle-icon');
      if (modContainer) {
        const isHidden = modContainer.style.display === 'none';
        modContainer.style.display = isHidden ? 'flex' : 'none';
        if (icon) icon.textContent = isHidden ? '▼' : '▶';
      }
    };
  });
}
