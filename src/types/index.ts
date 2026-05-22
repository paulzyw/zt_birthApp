export enum Scene {
  OPENING = 'OPENING',
  COUNTDOWN = 'COUNTDOWN',
  FIREWORKS = 'FIREWORKS',
  FLOATING_BALLOONS = 'FLOATING_BALLOONS',
  CELEBRATION = 'CELEBRATION',
  VOICE_CARD = 'VOICE_CARD',
  WISHES_GRID = 'WISHES_GRID',
  FINALE = 'FINALE'
}

export type SceneState = {
  currentScene: Scene;
  isAudioMuted: boolean;
  isMicActive: boolean;
  isCandleBlown: boolean;
};
