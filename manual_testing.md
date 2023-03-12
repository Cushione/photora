# Manual Testing

[Go to README](README.md)

| Testcase                          | Expected Result                                                       | Test Result | Recording |
|-----------------------------------|-----------------------------------------------------------------------|-------------|-|
| Open the Landing Page             | Landing Page loads and displays content correctly                          | ✅ PASS          | [Recording](docs/tests/landing-page.gif)
| Buttons on the Landing Page       | The buttons on the landing page navigate to the correct page                         | ✅ PASS          | [Recording](docs/tests/landing-page-buttons.gif)
| Register a user with valid data   | Request is successful, user is registered and logged in               | ✅ PASS          | [Recording](docs/tests/register-success.gif)
| Register a user with invalid data | Request fails, form loads again with data and errors                  | ✅ PASS          | [Recording](docs/tests/register-failed.gif)
| Login a user with valid data      | Request is successful, user is logged in                              | ✅ PASS          | [Recording](docs/tests/login-success.gif)
| Login a user with invalid data    | Request fails, form loads again with data and errors                  | ✅ PASS          | [Recording](docs/tests/login-failed.gif)
| Open the Homepage unauthenticated | Homepage loads and displays information for unauthenticated users| ✅ PASS                | [Recording](docs/tests/home-unauthenticated.gif)
| Open the Homepage authenticated but without followers | Homepage loads and displays hint to follow members| ✅ PASS | [Recording](docs/tests/home-no-follow.gif)
| Open the Homepage with feed | Homepage loads and displays the feed of the user| ✅ PASS | [Recording](docs/tests/home-feed.gif)
| Open the Explore page unauthenticated | Explore page loads and displays all the posts | ✅ PASS | [Recording](docs/tests/explore.gif)
| Open the Explore page authenticated | Explore page loads and displays all the posts from other members | ✅ PASS | [Recording](docs/tests/explore.gif)
| Open the Explore page with follow | Explore page loads and displays all the posts from other members that are not followed by the user | ✅ PASS | [Recording](docs/tests/explore-follow.gif)
| Open Search Page | Search Page loads and shows input | ✅ PASS | [Recording](docs/tests/search.gif)
| Send search request | After entering keywords the request is send and the result is shown below | ✅ PASS | [Recording](docs/tests/search.gif)
| **Profile** | | | |
| Open Profile  | Opens Profile Page with correct data | ✅ PASS   | [Recording](docs/tests/profile-open.gif)
| Open own Profile | Opens Profile Page with correct data | ✅ PASS | [Recording](docs/tests/profile-open-own.gif)
| Edit Profile | If data is valid, form is submitted, the profile is updated and the user is redirected to profile | ✅ PASS | [Recording](docs/tests/profile-edit.gif)
| Follow Profile | Request is successful, Follow button changes | ✅ PASS | [Recording](docs/tests/profile-follow.gif)
| **Posts** | | | |
| Create a Post with valid data | Request is successful, post is created and user is redirected to profile |  ✅ PASS | [Recording](docs/tests/post-create.gif)
| Create a Post with invalid data | Request fails, form shows error |  ✅ PASS | [Recording](docs/tests/post-create.gif)
| Edit a Post with valid data | Request is successful, post is updated and user is redirected to post detail |  ✅ PASS | [Recording](docs/tests/post-edit.gif)
| Edit a Post with invalid data | Request fails, form shows error |  ✅ PASS | [Recording](docs/tests/post-edit.gif)
| Delete a Post | Request is successful, Post is deleted and user is redirected to profile |  ✅ PASS | [Recording](docs/tests/post-delete.gif)
| Open a post by clicking       | Post Detail page loads with correct data              | ✅ PASS          | [Recording](docs/tests/post-open.gif)
| Open a post through url       | Post Detail page loads with correct data              | ✅ PASS          | [Recording](docs/tests/post-open.gif)
| Liking a post                 | Like count increases and like button changes                          | ✅ PASS          | [Recording](docs/tests/post-like.gif)
| Unliking a post               | Like count decreases and like button changes                          | ✅ PASS          | [Recording](docs/tests/post-like.gif)
| **Commenting**                    |                                                                       |             |
| Writing a comment                 | Request is successful, comment is added to the list, message is shown | ✅ PASS          | [Recording](docs/tests/comment-add.gif)
| Editing a comment                 | Request is successful, comment content is updated, message is shown    | ✅ PASS          | [Recording](docs/tests/comment-edit.gif)
| Delete a comment                  | Request is successful, comment is deleted, message is shown           | ✅ PASS          | [Recording](docs/tests/comment-delete.gif)