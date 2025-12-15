import type { WishModel } from '../models/wishModel';

const WISH_EMOJIS = ['✨', '🎄', '🎅', '⛄', '🔔', '🎁', '⭐', '❤️', '💚', '🌟', '🍪', '🎂'];

/**
 * Renderiza los deseos como copos de nieve que caen por la pantalla.
 * Los deseos se mueven libremente, pero se detienen al pasar el mouse.
 * 
 * @param wishes - Array de deseos obtenidos de Supabase
 */
export function renderTree(wishes: WishModel[]): void {
  const wishContainer = document.getElementById('wish');
  
  if (!wishContainer) {
    console.error('No se encontró el elemento con id="wish"');
    return;
  }

  // Limpiar contenido previo
  wishContainer.innerHTML = '';

  if (wishes.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = '❄️ Sé el primero en dejar tu deseo';
    wishContainer.appendChild(emptyMessage);
    return;
  }

  // Crear un wish-snowflake para cada deseo
  wishes.forEach((wish, index) => {
    const snowflake = document.createElement('div');
    snowflake.className = 'wish-snowflake';
    
    // Posición inicial aleatoria en X
    const randomX = Math.random() * 100;
    const randomDuration = 8 + Math.random() * 12; // 8-20 segundos
    const randomDelay = Math.random() * 5; // 0-5 segundos
    const randomSwing = 30 + Math.random() * 100; // amplitud del movimiento horizontal
    
    snowflake.style.left = `${randomX}%`;
    snowflake.style.setProperty('--duration', `${randomDuration}s`);
    snowflake.style.setProperty('--delay', `${randomDelay}s`);
    snowflake.style.setProperty('--swing', `${randomSwing}px`);
    
    // Contenedor para el emoji - seleccionar uno aleatorio
    const emoji = document.createElement('span');
    emoji.className = 'wish-emoji';
    const randomEmoji = WISH_EMOJIS[Math.floor(Math.random() * WISH_EMOJIS.length)];
    emoji.textContent = randomEmoji;
    
    // Contenedor para la información del deseo
    const info = document.createElement('div');
    info.className = 'wish-info';
    info.innerHTML = `
      <div class="wish-name"><strong>${wish.name}</strong></div>
      ${wish.age ? `<div class="wish-age">${wish.age} años</div>` : ''}
      ${wish.country ? `<div class="wish-country">${wish.country}</div>` : ''}
      <div class="wish-text">"${wish.wish_text}"</div>
    `;
    
    snowflake.appendChild(emoji);
    snowflake.appendChild(info);
    
    // Al pasar el mouse, pausar la animación
    snowflake.addEventListener('mouseenter', () => {
      snowflake.style.animationPlayState = 'paused';
      snowflake.classList.add('hovered');
    });
    
    // Al salir el mouse, reanudar la animación
    snowflake.addEventListener('mouseleave', () => {
      snowflake.style.animationPlayState = 'running';
      snowflake.classList.remove('hovered');
    });
    
    wishContainer.appendChild(snowflake);
  });
}

