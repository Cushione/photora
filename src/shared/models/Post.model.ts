/**
 * Model for a Post Entity
 */
export interface Post {
  id: number
  owner: string
  created_at: string
  title: string
  description: string
  image: string
  is_owner: boolean
  profile_id: number
  profile_name: string
  profile_image: string
  has_liked: boolean
  number_of_likes: number
  number_of_comments: number
}
