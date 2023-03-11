/**
 * Model for a Paginated Result
 */
export interface PaginatedResult<T> {
    count: number
    results: T[]
    next: string
    previous: string
  }