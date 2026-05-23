import { useEffect, useState, useCallback } from 'react';
import { Howl, Howler } from 'howler';

const AMBIENT_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/nastelbom-victory.mp3';
const MESSAGE_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/parents-message02-ped.wav';
const FIREWORKS_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/community-fireworks.mp3';
const BIRTHDAY_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/happy-birthday-to-you-piano-version.mp3';

// Use shared singletons so multiple hook instances reference the exact same underlying sounds
let sharedAmbient: Howl | null = null;
let sharedMessage: Howl | null = null;
let sharedFireworks: Howl | null = null;
let sharedBirthday: Howl | null = null;

let activeOnMessageEnd: (() => void) | undefined = undefined;

export function useAudioEngine(options?: { onMessageEnd?: () => void }) {
  const [isMuted, setIsMuted] = useState(false);

  // Maintain active reference for the shared message's ending event
  useEffect(() => {
    if (options?.onMessageEnd) {
      activeOnMessageEnd = options.onMessageEnd;
      return () => {
        if (activeOnMessageEnd === options.onMessageEnd) {
          activeOnMessageEnd = undefined;
        }
      };
    }
  }, [options?.onMessageEnd]);

  // Safe helper to resume global context on any action
  const resumeContextIfNeeded = useCallback(() => {
    try {
      const ctx = (Howler as any).ctx;
      if (ctx && typeof ctx.resume === 'function' && ctx.state === 'suspended') {
        ctx.resume()
          .then(() => console.log('[AudioEngine] AudioContext successfully resumed.'))
          .catch((err: any) => console.warn('[AudioEngine] Failed to resume AudioContext:', err));
      }
    } catch (e) {
      console.error('[AudioEngine] Error checking context:', e);
    }
  }, []);

  useEffect(() => {
    // Helper to securely load a sound with retry logic
    const createSound = (src: string, config: any, name: string): Howl => {
      const sound = new Howl({
        src: [src],
        html5: false, // Use Web Audio for tight synchronization and effects
        preload: true,
        ...config,
        onloaderror: (id, error) => {
          console.warn(`[AudioEngine] ${name} load error. Retrying in 3.5 seconds...`, error);
          setTimeout(() => {
            if (sound.state() === 'unloaded') {
              sound.load();
            }
          }, 3500);
        },
        onplayerror: (id, error) => {
          console.warn(`[AudioEngine] ${name} play error (probably browser autoplay restriction). Resuming context & retrying...`, error);
          resumeContextIfNeeded();
          sound.once('unlock', () => {
            sound.play();
          });
        }
      });
      return sound;
    };

    if (!sharedAmbient) {
      sharedAmbient = createSound(AMBIENT_URL, {
        loop: true,
        volume: 0.12,
      }, 'Ambient');
    }

    if (!sharedMessage) {
      sharedMessage = createSound(MESSAGE_URL, {
        volume: 1.0,
        onplay: () => {
          sharedAmbient?.fade(0.12, 0.07, 1000);
        },
        onend: () => {
          sharedAmbient?.fade(0.07, 0.12, 1000);
          activeOnMessageEnd?.();
        },
        onstop: () => {
          sharedAmbient?.fade(0.07, 0.12, 1000);
        }
      }, 'Parents Message');
    }

    if (!sharedFireworks) {
      sharedFireworks = createSound(FIREWORKS_URL, {
        volume: 1.0,
        onplay: () => {
          sharedAmbient?.volume(0);
        },
        onend: () => {
          sharedAmbient?.volume(0.28);
        },
        onstop: () => {
          sharedAmbient?.volume(0.28);
        }
      }, 'Fireworks');
    }

    if (!sharedBirthday) {
      sharedBirthday = createSound(BIRTHDAY_URL, {
        loop: true,
        volume: 1.0,
        onplay: () => {
          sharedAmbient?.volume(0);
        },
        onend: () => {
          sharedAmbient?.volume(0.28);
        },
        onstop: () => {
          sharedAmbient?.volume(0.28);
        }
      }, 'Birthday Piano');
    }
  }, [resumeContextIfNeeded]);

  const unlockAudio = useCallback(() => {
    console.log('[AudioEngine] Unlocking Audio Context on explicit user gesture...');
    resumeContextIfNeeded();

    // Safely trigger preloading and active playing of Ambient sound
    [sharedAmbient, sharedMessage, sharedFireworks, sharedBirthday].forEach((sound) => {
      if (sound) {
        if (sound.state() === 'unloaded') {
          sound.load();
        }
      }
    });

    if (sharedAmbient) {
      if (sharedAmbient.state() === 'loaded') {
        if (!sharedAmbient.playing()) {
          sharedAmbient.play();
        }
      } else {
        // Play as soon as it loads
        sharedAmbient.once('load', () => {
          if (sharedAmbient && !sharedAmbient.playing()) {
            sharedAmbient.play();
          }
        });
        sharedAmbient.load();
        // Fallback play immediately in case it's already loading
        sharedAmbient.play();
      }
    }
  }, [resumeContextIfNeeded]);

  const playAmbient = useCallback(() => {
    resumeContextIfNeeded();
    if (sharedAmbient) {
      if (sharedAmbient.state() === 'unloaded') {
        sharedAmbient.load();
      }
      if (!sharedAmbient.playing()) {
        sharedAmbient.play();
      }
    }
  }, [resumeContextIfNeeded]);

  const playMessage = useCallback(() => {
    resumeContextIfNeeded();
    if (sharedMessage) {
      if (sharedMessage.state() === 'unloaded') {
        sharedMessage.load();
      }
      sharedMessage.play();
    }
  }, [resumeContextIfNeeded]);

  const pauseMessage = useCallback(() => {
    sharedMessage?.pause();
  }, []);

  const playFireworks = useCallback(() => {
    resumeContextIfNeeded();
    if (sharedFireworks) {
      if (sharedFireworks.state() === 'unloaded') {
        sharedFireworks.load();
      }
      if (!sharedFireworks.playing()) {
        sharedFireworks.play();
      }
    }
  }, [resumeContextIfNeeded]);

  const stopFireworks = useCallback(() => {
    sharedFireworks?.stop();
  }, []);

  const playBirthday = useCallback(() => {
    resumeContextIfNeeded();
    if (sharedBirthday) {
      if (sharedBirthday.state() === 'unloaded') {
        sharedBirthday.load();
      }
      if (!sharedBirthday.playing()) {
        sharedBirthday.play();
      }
    }
  }, [resumeContextIfNeeded]);

  const stopBirthday = useCallback(() => {
    sharedBirthday?.stop();
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prevMute) => {
      const nextMute = !prevMute;
      Howler.mute(nextMute);
      return nextMute;
    });
  }, []);

  return {
    isMuted,
    playAmbient,
    playMessage,
    pauseMessage,
    playFireworks,
    stopFireworks,
    playBirthday,
    stopBirthday,
    toggleMute,
    unlockAudio,
  };
}
