export function isEmptyArray<T>(input: T[]): boolean {
  return input.length === 0;
}

export function isInvalidArray<T>(input: T[], expectedArrayLength?: number): boolean {
  return input.length <= (expectedArrayLength ?? 2) || input.some(data => !data);
}

export function containsDelimiter(input: string, del: string): boolean {
  return input.includes(del);
}
