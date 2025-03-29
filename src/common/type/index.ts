export type StartWith<T extends string, Pattern extends string> = T extends `${Pattern}${string}`
  ? T
  : never
