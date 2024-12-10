export interface Paginate {
    current_page: number
    last_page: number
    per_page: number
    prev_page_url: string | null
    next_page_url: string | null
  }