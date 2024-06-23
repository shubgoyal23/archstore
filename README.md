# ArchStore project

### API Documentation

#### Endpoint: /api/v1/users

##### Unsecured Endpoints:

1. **POST /register**
   - **Description:** Registers a new user.
   - **Required Inputs:** 
     - `fullname` (String)
     - `username` (String)
     - `email` (String)
     - `password` (String)
     - `isadmin` (Boolean)

2. **POST /login**
   - **Description:** Authenticates a user.
   - **Required Inputs:** 
     - `username` or `email` (String)
     - `password` (String)

##### Secured Endpoints:

1. **POST /logout**
   - **Description:** Logs out the currently logged-in user.

2. **GET /user**
   - **Description:** Retrieves the details of the currently logged-in user.
   - **Authentication:** Requires user to be authenticated via cookies.

3. **POST /user-edit**
   - **Description:** Edits the details of the currently logged-in user.
   - **Required Inputs:** 
     - `username` (String)
     - `fullname` (String)
     - `email` (String)

4. **GET /list**
   - **Description:** Searches for users based on their full name.
   - **Required Inputs:** 
     - `fullname` (String)

5. **POST /avatar-upload**
   - **Description:** Uploads an avatar for the user.
   - **Required Inputs:** 
     - `avatar` (File)

6. **GET /userinfo**
   - **Description:** Retrieves information of a specified user.
   - **Required Inputs:** 
     - `userId` (String)

#### Endpoint: /api/v1/message

##### Secured Endpoints:

1. **POST /new**
   - **Description:** Sends a new message to a user.
   - **Required Inputs:** 
     - `to` (String) - User ID of the recipient
     - `message` (String) - The message content

2. **GET /all**
   - **Description:** Retrieves all messages sent to and received from a particular user.
   - **Required Inputs:** 
     - `to` (String) - User ID of the other participant

3. **GET /contacts**
   - **Description:** Retrieves a list of users with whom the current user has had contact.

#### Endpoint: /api/v1/post

##### Secured Endpoints:

1. **POST /add**
   - **Description:** Adds a new post.
   - **Required Inputs:** 
     - `content` (String) - The content of the post
     - `isPublic` (Boolean) - Visibility of the post

2. **POST /like**
   - **Description:** Likes or unlikes a post.
   - **Required Inputs:** 
     - `postId` (String) - The ID of the post

3. **POST /comment**
   - **Description:** Comments on a post.
   - **Required Inputs:** 
     - `postId` (String) - The ID of the post
     - `comment` (String) - The comment content

#### Endpoint: /api/v1/connection

##### Secured Endpoints:

1. **POST /add**
   - **Description:** Follows a user.
   - **Required Inputs:** 
     - `followed` (String) - User ID of the user to be followed

2. **GET /followers**
   - **Description:** Retrieves the list of followers of the currently logged-in user.

3. **GET /followed**
   - **Description:** Retrieves the list of users that the currently logged-in user is following.

#### Endpoint: /api/v1/notification

##### Secured Endpoints:

1. **GET /**
   - **Description:** Retrieves the current notifications for the user.

2. **POST /**
   - **Description:** Marks notifications as read and deletes them from the server.
   - **Required Inputs:** 
     - `notification_id` (String) - The ID of the notification to be marked and deleted