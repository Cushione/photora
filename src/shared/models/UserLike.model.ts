/**
 * Structure of a User Like Entry
 */
export interface UserLike {
  is_followed: boolean
  profile_id: number
  profile_image: string
  profile_name: string
  is_owner: boolean
}
