export type ButtonState = 'default' | 'working' | 'done';

interface StateConfig {
  text: string;
  imgUrl?: string;
  bgColor?: string;
}

export interface ButtonConfig extends Record<ButtonState, StateConfig> {}