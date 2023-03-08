import axios from 'axios'
import moment from 'moment';
import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { Link, useLoaderData } from 'react-router-dom'
import { Post } from '../../shared/models/Post.model'
import "./PostList.scss"

export async function loader({ params }: { params: { id: number } }) {
  const posts = (
    await axios.get<{ title: string }[]>(
      import.meta.env.VITE_API_URL + 'posts/'
    )
  ).data
  return { posts }
}

export default function PostList() {
  const { posts }: { posts: Post[] } = useLoaderData() as { posts: Post[] }
  return (
    <Container id="post-list-container">
      {posts.length ? (
        posts.map((post) => (
          <Card key={post.id} className="m-4">
            <Card.Body>
              <Card.Text className='d-flex justify-content-between'>
                <Link to={`/profiles/${post.profile_id}`} className="post-list-profile-link">
                  <Image
                    className='post-list-avatar'
                    src={post.profile_image}
                  />
                  <span className='ml-2'>{post.profile_name}</span>
                </Link>
                <span>{moment(post.created_at).fromNow()}</span>
              </Card.Text>
            </Card.Body>
            <Card.Img src={post.image} />
            <Card.Body>
              <Card.Text className='d-flex'>
                <Button variant='light'>
                  <i className='fa-regular fa-heart'></i>
                </Button>
                <Link to={`/posts/${post.id}#comment`} className="btn btn-light ml-2">
                  <i className='fa-regular fa-message'></i>
                </Link>
                {post.number_of_likes > 0 && (
                  <Button variant='link' className='ml-2'>
                    {post.number_of_likes} Like{post.number_of_likes !== 1 ? 's' : ''}
                  </Button>
                )}
              </Card.Text>
              <Card.Title>
                {post.title}
              </Card.Title>
              <Card.Text>
                {post.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>
          <i>No posts</i>
        </p>
      )}
    </Container>
  )
}
