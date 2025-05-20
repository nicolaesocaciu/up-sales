
import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = () => {
    const count = 300; // Increased count for more particles
    const defaults = {
      origin: { y: 0.5, x: 0.5 }, // Start from the center of the screen
      zIndex: 9999,
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        scalar: 2.5 // Make the particles bigger than default
      });
    }

    // First burst - from center, big spread
    fire(0.25, {
      spread: 100,
      startVelocity: 70,
      decay: 0.92,
      scalar: 2.5
    });

    // Second burst - from center
    fire(0.2, {
      spread: 150,
      startVelocity: 60,
      decay: 0.91,
      scalar: 3.0
    });

    // Third burst - from center, wide spread, large particles
    fire(0.35, {
      spread: 180,
      decay: 0.88,
      scalar: 3.5
    });

    // Fourth burst - slower velocity, extra large
    fire(0.1, {
      spread: 140,
      startVelocity: 30,
      decay: 0.92,
      scalar: 4.0
    });

    // Fifth burst - high velocity, large particles
    fire(0.1, {
      spread: 160,
      startVelocity: 65,
      scalar: 3.0
    });
  };

  return { triggerConfetti };
};
