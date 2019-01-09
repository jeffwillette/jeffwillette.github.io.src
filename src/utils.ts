export const safe = <T extends {}>(obj: T | null): T => {
  return obj ? (obj as T) : ({} as T);
};
