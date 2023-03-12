import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { useUserInfoStore } from '../../Authentication/UserInfoContext'
import './Navigation.scss'

interface LinkState {
  isActive: boolean
  isPending: boolean
}

/**
 * Navigation Component
 * Displays all the page links depending on user login state
 * @returns
 */
export default function Navigation() {
  const { userProfile } = useUserInfoStore()

  /**
   * Helper function for setting link styles depending on link state
   * @param LinkState Current state of the link
   * @returns Style classes
   */
  const linkState = (state: LinkState) =>
    state.isActive ? 'active' : state.isPending ? 'pending' : ''

  /**
   * Helper function for displaying links depending on link state
   * @param isPending Current pending state of the link
   * @param icon default icon to display
   * @returns Icon
   */
  const displayLink = (
    isPending: boolean,
    icon: JSX.Element,
    text: string
  ): JSX.Element => (
    <>
      {isPending ? (
        <i className='fa-solid fa-circle-notch fa-spin fa-fw'></i>
      ) : (
        icon
      )}
      {text}
    </>
  )

  return (
    <Nav className='flex-column' id='main-navigation'>
      {userProfile && (
        <Nav.Link
          id='nav-user'
          as={NavLink}
          to={`/profiles/user`}
          className={linkState}
        >
          {({ isPending }) =>
            displayLink(
              isPending,
              <img
                id='nav-avatar'
                className='fa-fw'
                src={userProfile.image}
              ></img>,
              userProfile.name
            )
          }
        </Nav.Link>
      )}
      <Nav.Link as={NavLink} to={`/home`} className={linkState}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-solid fa-house fa-fw'></i>,
            'Home'
          )
        }
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/search`} className={linkState}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-solid fa-magnifying-glass fa-fw'></i>,
            'Search'
          )
        }
      </Nav.Link>

      <Nav.Link as={NavLink} to={`/explore`} className={linkState}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-regular fa-compass fa-fw'></i>,
            'Explore'
          )
        }
      </Nav.Link>

      {userProfile && (
        <>
          <Nav.Link as={NavLink} to={`/liked`} className={linkState}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-regular fa-heart fa-fw'></i>,
                'Liked'
              )
            }
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/posts/create`} className={linkState}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-regular fa-square-plus fa-fw'></i>,
                'Create'
              )
            }
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/logout`} className={linkState}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-arrow-right-from-bracket fa-fw'></i>,
                'Logout'
              )
            }
          </Nav.Link>
        </>
      )}

      {!userProfile && (
        <>
          <Nav.Link as={NavLink} to={`/login`} className={linkState}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-arrow-right-to-bracket fa-fw'></i>,
                'Login'
              )
            }
          </Nav.Link>

          <Nav.Link as={NavLink} to={`/register`} className={linkState}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-user-plus fa-fw'></i>,
                'Register'
              )
            }
          </Nav.Link>
        </>
      )}
    </Nav>
  )
}
