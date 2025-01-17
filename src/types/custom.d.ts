// src/custom.d.ts ou src/types/custom.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}
