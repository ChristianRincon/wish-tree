import { addWish } from '../services/wish_services/addWish';
import { renderTree, getWishes } from '../main';
import { playSound } from '../utils/playSound';

export function openModal(): void {
  playSound('/sounds/ho-ho-ho.mp3');
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Deja tu deseo</h2>
        <button class="modal-close" aria-label="Cerrar modal">&times;</button>
      </div>
      
      <form id="wish-form" class="modal-form">
        <div class="form-group">
          <label for="name">Nombre <span class="required">*</span></label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Tu nombre"
            required
          />
        </div>

        <div class="form-group">
          <label for="age">Edad</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            placeholder="Tu edad (opcional)"
            min="1"
            max="120"
          />
        </div>

        <div class="form-group">
          <label for="country">País</label>
          <input 
            type="text" 
            id="country" 
            name="country" 
            placeholder="Tu país (opcional)"
          />
        </div>        

        <div class="form-group">
          <label for="wish">Deseo <span class="required">*</span></label>
          <textarea 
            id="wish" 
            name="wish" 
            placeholder="¿Qué deseas en estas fiestas?"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn-submit">Colocar mi deseo 🎄</button>
      </form>
    </div>
  `;

  document.body.appendChild(modalBackdrop);
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.modal-close') as HTMLButtonElement;
  const wishForm = modal.querySelector('#wish-form') as HTMLFormElement;
  const nameInput = modal.querySelector('#name') as HTMLInputElement;
  const ageInput = modal.querySelector('#age') as HTMLInputElement;
  const countryInput = modal.querySelector('#country') as HTMLInputElement;
  const wishInput = modal.querySelector('#wish') as HTMLTextAreaElement;


  const closeModal = (): void => {
    modal.remove();
    modalBackdrop.remove();
  };

  closeButton.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    playSound('/sounds/wish-button-sound.mp3');

    const name = nameInput.value.trim();
    const age = ageInput.value ? parseInt(ageInput.value, 10) : undefined;
    const country = countryInput.value.trim() || undefined;
    const wishText = wishInput.value.trim();

    if (!name || !wishText) {
      alert('Por favor, completa los campos requeridos (Nombre y Deseo)');
      return;
    }

    try {
      const submitButton = wishForm.querySelector('.btn-submit') as HTMLButtonElement;
      submitButton.disabled = true;
      submitButton.textContent = 'Guardando...';

      await addWish({
        name,
        age,
        country,
        wish_text: wishText,
      });

      closeModal();

      const wishes = await getWishes();
      renderTree(wishes);

      console.log('Deseo añadido exitosamente');
    } catch (error) {
      console.error('Error al añadir deseo:', error);
      alert('Error al guardar el deseo. Por favor, intenta de nuevo.');
      
      const submitButton = wishForm.querySelector('.btn-submit') as HTMLButtonElement;
      submitButton.disabled = false;
      submitButton.textContent = 'Colocar mi deseo 🎄';
    }
  });

  // Enfocar el campo de nombre automáticamente
  nameInput.focus();
}
