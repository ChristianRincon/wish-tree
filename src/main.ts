import './style.css';
import { getWishes } from './services/wish_services/getWishes';
import { renderTree } from './components/wishComponent';
import { openModal } from './components/modal';

async function initializeApp(): Promise<void> {
  try {
    const wishes = await getWishes();
    
    renderTree(wishes);
    
    const addWishButton = document.getElementById('add-wish-btn');
    if (addWishButton) {
      addWishButton.addEventListener('click', openModal);
    }
    console.log('✨ Wish Tree inicializada correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error);
    
    const treeContainer = document.getElementById('tree');
    if (treeContainer) {
      treeContainer.innerHTML = `
        <div class="error-message">
          <p>⚠️ Error al cargar los deseos</p>
          <small>Por favor, verifica tu conexión a Supabase</small>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);

export { getWishes, renderTree };
