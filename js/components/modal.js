// ========================================
// LingoPath Modal Dialog Component
// ========================================

export const Modal = {
  open({ title, content, actions = [], onClose = null }) {
    this.close();

    const backdrop = document.createElement('div');
    backdrop.id = 'active-modal-backdrop';
    backdrop.className = 'modal-backdrop animate-fade-in';

    const modal = document.createElement('div');
    modal.className = 'modal-card animate-scale-up';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="modal-card__header">
        <h3 class="modal-card__title">${title}</h3>
        <button class="modal-card__close" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-card__body">${content}</div>
      <div class="modal-card__footer"></div>
    `;

    const footer = modal.querySelector('.modal-card__footer');
    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = `btn ${action.className || 'btn--secondary'}`;
      btn.textContent = action.label;
      btn.onclick = () => {
        if (action.onClick) action.onClick();
        if (action.closeModal !== false) Modal.close();
      };
      footer.appendChild(btn);
    });

    const closeBtn = modal.querySelector('.modal-card__close');
    closeBtn.onclick = () => {
      if (onClose) onClose();
      Modal.close();
    };

    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        if (onClose) onClose();
        Modal.close();
      }
    };

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  },

  close() {
    const existing = document.getElementById('active-modal-backdrop');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }
};
