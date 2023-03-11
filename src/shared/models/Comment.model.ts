/**
 * Model for a Comment Entity
 */
export default interface Comment {
  id: number
  post: number
  created_at: string
  content: string
  is_owner: boolean
  profile_id: number
  profile_name: string
  profile_image: string
}
