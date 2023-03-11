/**
 * Model for a Profile Entity
 */
export default interface Profile {
  content: string
  created_at: string
  id: number
  image: string
  is_owner: boolean
  name: string
  owner: string
  is_followed: boolean
}
