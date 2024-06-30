export interface File {
  id: number
  url: string
  name: string
  mime_type: string
  size: number
  created_at: string
}

export interface FileDataCreate {
  file: File
  type: string
}
