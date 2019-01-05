export const safe = <T extends {}>(obj: T): T => {
  return obj as T;
};
