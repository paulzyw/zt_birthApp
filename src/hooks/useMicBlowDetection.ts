import { useEffect, useRef, useState } from 'react';

export function useMicBlowDetection() {
  const [isBlown, setIsBlown] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Detect intensity in the lower frequency range (0-250Hz approx)
        // Bin 0 to 5 for lower frequencies
        let lowFreqSum = 0;
        for (let i = 0; i < 6; i++) {
          lowFreqSum += dataArray[i];
        }
        const avgLowFreq = lowFreqSum / 6;
        setIntensity(avgLowFreq);

        if (avgLowFreq > 220) {
          setIsBlown(true);
        }

        animationFrameRef.current = requestAnimationFrame(checkBlow);
      };

      checkBlow();
    } catch (err) {
      console.warn("Microphone access denied or not supported:", err);
      setIsSupported(false);
    }
  };

  const stopDetection = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close().catch(err => {
          console.warn("Error closing AudioContext:", err);
        });
      } catch (err) {
        console.warn("Exception closing AudioContext:", err);
      }
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (err) {
          console.warn("Error stopping audio track:", err);
        }
      });
      streamRef.current = null;
    }
    analyserRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return { isBlown, intensity, isSupported, startDetection, stopDetection, setIsBlown };
}
