import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import {
  Form as RouterForm,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import PostList from '../../../Components/PostList/PostList'
import usePageTitle from '../../../shared/hooks/usePageTitle'
import { PaginatedResult } from '../../../shared/models/PaginatedResponse.model'
import { Post } from '../../../shared/models/Post.model'
import './SearchPage.scss'

export async function SearchPageLoader({ request }) {
  const url = new URL(request.url)
  const keywords = url.searchParams.get('keywords')
  let posts = null
  if (keywords) {
    posts = (
      await axios.get<PaginatedResult<Post>>(
        `posts/search?keywords=${keywords}`
      )
    ).data
  }
  return { posts, keywords }
}

export default function SearchPage() {
  const { posts, keywords: initialKeywords } = useLoaderData() as Awaited<
    ReturnType<typeof SearchPageLoader>
  >

  const [keywords, setKeywords] = useState<string | null>(initialKeywords)
  const [result, setResult] = useState<PaginatedResult<Post> | null>(posts)

  const submit = useSubmit()
  const navigation = useNavigation()
  const searchForm = useRef<HTMLFormElement | null>(null)

  usePageTitle('Search')

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('keywords')

  useEffect(() => {
    setResult(posts)
  }, [posts])

  useEffect(() => {
    const getData = setTimeout(() => {
      setResult(null)
      if (keywords) {
        submit(searchForm.current, { replace: true })
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [keywords])

  return (
    <>
      <Container id='search-page-container' className='mw-600'>
        <RouterForm ref={searchForm} role='search' className='mx-auto'>
          <Form.Group controlId='searchFormKeywords' id='search-form-group'>
            <Form.Label srOnly>Keywords</Form.Label>
            <Form.Control
              type='search'
              name='keywords'
              placeholder='Search for e.g. Dogs, Sun, City...'
              value={keywords || ''}
              onChange={(event) => {
                setKeywords(event.target.value)
              }}
            />
            <div id='search-page-spinner' hidden={!searching}>
              <i className='fa-solid fa-circle-notch fa-spin'></i>
            </div>
          </Form.Group>
        </RouterForm>
      </Container>
      {result && <PostList {...result} />}
    </>
  )
}
