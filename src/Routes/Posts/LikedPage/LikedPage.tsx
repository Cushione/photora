import axios from 'axios'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PostList from '../../../Components/PostList/PostList'
import usePageTitle from '../../../shared/hooks/usePageTitle'
import { PaginatedResult } from '../../../shared/models/PaginatedResponse.model'
import { Post } from '../../../shared/models/Post.model'

export async function LikedPageLoader() {
  const results = (await axios.get<PaginatedResult<Post>>('posts/liked')).data
  return results
}

export default function LikedPage() {
  const result: PaginatedResult<Post> = useLoaderData() as Awaited<
    ReturnType<typeof LikedPageLoader>
  >

  usePageTitle('Liked Posts')

  return <PostList {...result} title="Liked" />
}
