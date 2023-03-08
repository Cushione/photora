export interface PaginatedResult<T> {
    count: number
    results: T[]
    next: string
    previous: string
  }