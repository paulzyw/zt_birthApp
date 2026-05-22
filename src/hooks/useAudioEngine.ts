import { useEffect, useRef, useState, useCallback } from 'react';
import { Howl } from 'howler';

const AMBIENT_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/nastelbom-victory.mp3';
const MESSAGE_URL = 'https://abxwkechmdchstqrfofq.supabase.co/storage/v1/object/public/audio_file/parents-message-ped.wav';
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

  useEffect(() => {
    if (!sharedAmbient) {
      sharedAmbient = new Howl({
        src: [AMBIENT_URL],
        loop: true,
        volume: 0.12,
      });
    }

    if (!sharedMessage) {
      sharedMessage = new Howl({
        src: [MESSAGE_URL],
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
      });
    }

    if (!sharedFireworks) {
      sharedFireworks = new Howl({
        src: [FIREWORKS_URL],
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
      });
    }

    if (!sharedBirthday) {
      sharedBirthday = new Howl({
        src: [BIRTHDAY_URL],
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
      });
    }
  }, []);

  const playAmbient = useCallback(() => {
    if (sharedAmbient && !sharedAmbient.playing()) {
      sharedAmbient.play();
    }
  }, []);

  const playMessage = useCallback(() => {
    sharedMessage?.play();
  }, []);

  const pauseMessage = useCallback(() => {
    sharedMessage?.pause();
  }, []);

  const playFireworks = useCallback(() => {
    if (sharedFireworks && !sharedFireworks.playing()) {
      sharedFireworks.play();
    }
  }, []);

  const stopFireworks = useCallback(() => {
    sharedFireworks?.stop();
  }, []);

  const playBirthday = useCallback(() => {
    if (sharedBirthday && !sharedBirthday.playing()) {
      sharedBirthday.play();
    }
  }, []);

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
  };
}
