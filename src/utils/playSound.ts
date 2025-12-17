export function playSound(sound: string): void {
  const audio = new Audio(sound);
  audio.volume = 0.5;
  audio.play().catch(err => console.error('Error playing sound:', err));
}
