export interface Page<T> {
  items: T[],
  offset: number,
  limit: number,
  hasNext: boolean,
}
