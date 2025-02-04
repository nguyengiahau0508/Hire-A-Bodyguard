export function omitFields<T extends Record<string, any>>(obj: T, fields: (keyof T)[]): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fields.includes(key as keyof T))
  ) as Partial<T>;
}

