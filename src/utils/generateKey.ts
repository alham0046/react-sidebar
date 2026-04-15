export const getKeyCombo = (e: {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
}) => {
  return [
    e.ctrl ? "1" : "0",
    e.alt ? "1" : "0",
    e.shift ? "1" : "0",
    e.meta ? "1" : "0",
    e.key.toLowerCase()
  ].join("_");
};