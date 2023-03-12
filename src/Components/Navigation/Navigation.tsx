import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { useUserInfoStore } from '../../Authentication/UserInfoContext'
import './Navigation.scss'

/**
 * Structure of the React Router Link State
 */
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
  const linkState = (state: LinkState): string =>
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
        <NavLink
          id='nav-user'
          to={`/profiles/user`}
          className={`${linkState} nav-link`}
        >
          {({ isPending }: LinkState) =>
            displayLink(
              isPending,
              <div
                id='nav-avatar'
                className='fa-fw'
                style={{backgroundImage: `url(${userProfile.image})`}}
              ></div>,
              userProfile.name
            )
          }
        </NavLink>
      )}
      <NavLink to={`/home`} className={`${linkState} nav-link`}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-solid fa-house fa-fw'></i>,
            'Home'
          )
        }
      </NavLink>

      <NavLink to={`/search`} className={`${linkState} nav-link`}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-solid fa-magnifying-glass fa-fw'></i>,
            'Search'
          )
        }
      </NavLink>

      <NavLink to={`/explore`} className={`${linkState} nav-link`}>
        {({ isPending }) =>
          displayLink(
            isPending,
            <i className='fa-regular fa-compass fa-fw'></i>,
            'Explore'
          )
        }
      </NavLink>

      {userProfile && (
        <>
          <NavLink to={`/liked`} className={`${linkState} nav-link`}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-regular fa-heart fa-fw'></i>,
                'Liked'
              )
            }
          </NavLink>
          <NavLink to={`/posts/create`} className={`${linkState} nav-link`}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-regular fa-square-plus fa-fw'></i>,
                'Create'
              )
            }
          </NavLink>
          <NavLink to={`/logout`} className={`${linkState} nav-link`}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-arrow-right-from-bracket fa-fw'></i>,
                'Logout'
              )
            }
          </NavLink>
        </>
      )}

      {!userProfile && (
        <>
          <NavLink to={`/login`} className={`${linkState} nav-link`}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-arrow-right-to-bracket fa-fw'></i>,
                'Login'
              )
            }
          </NavLink>

          <NavLink to={`/register`} className={`${linkState} nav-link`}>
            {({ isPending }) =>
              displayLink(
                isPending,
                <i className='fa-solid fa-user-plus fa-fw'></i>,
                'Register'
              )
            }
          </NavLink>
        </>
      )}
    </Nav>
  )
}
