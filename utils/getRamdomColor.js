import { DEFAULT_COLORS } from "./constants";

export default function getRandomColor() {
  const randInt = Math.floor(Math.random() * 23) + 1;

  return DEFAULT_COLORS[randInt];
}
