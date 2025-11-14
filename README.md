# React ReqRes API Web App

Project demo for learning REST API integration with React + Tailwind using JSONPlaceholder as a fake backend. Implements simulated auth (token saved in localStorage), protected dashboard, posts CRUD (list, add, update, delete), client-side validation and simple toasts.

---

## Tech stack / Versions
- Node: 24.x (use nvm/volta to pin)
- React: 18.x
- React Router: 6.x
- TypeScript: 4.x (project files use .tsx)
- Tailwind CSS: 3.x
- JSONPlaceholder: https://jsonplaceholder.typicode.com (fake REST API)

---

## Project description (in-depth)
This repository is a small learning application that demonstrates how to integrate a REST API in a modern React + TypeScript app. It focuses on:

- Simulating Sign Up / Sign In and storing an auth token in localStorage.
- Protecting routes with React Router v6 and an AuthContext.
- Performing CRUD operations against JSONPlaceholder's /posts endpoint (List, Create, Update, Delete).
- Client-side validation (Title: letters & spaces only, Body: letters, numbers & spaces only).
- Simple UI patterns: layout + header, conditional links, optimistic UI updates, and toast notifications for success/error.

JSONPlaceholder is used as a fake backend — requests return realistic responses but server-side data is not persisted. The app demonstrates how to handle responses and update the UI optimistically.

---

## Quick Install & Run (Linux)
1. Install Node 24 (nvm recommended)
```bash
nvm install 24
nvm use 24
```
2. Install dependencies
```bash
npm install
```
3. Run dev server
```bash
npm run dev
# or
npm start
```
4. Build for production
```bash
npm run build
```

---

## Project setup steps (detailed)
1. Clone repository
```bash
git clone <repo-url>
cd react-reqres-api-web-app
```
2. Ensure Node 24 installed and active (see nvm commands above).
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open http://localhost:3000 (or the port your dev server prints)

Optional:
- Linting/formatting: run configured npm scripts (if present).
- Inspect network calls via browser DevTools to view requests to JSONPlaceholder.

---

## Project folder structure (important files)
- public/ — static assets (favicon, index.html)
- src/
  - main.tsx — React entry and root render
  - App.tsx — router setup and AuthProvider wrapper
  - styles/ — Tailwind / global CSS
  - components/
    - header.tsx — header with conditional links, logout
    - footer.tsx
    - toast.tsx (or inline toast logic)
  - contexts/
    - AuthContext.tsx — token state, login, logout, isAuthenticated
  - layouts/
    - DefaultLayout.tsx — Header + Outlet + Footer
  - pages/
    - sign-in.tsx — sign-in form, uses AuthContext.login
    - sign-up.tsx — sign-up (dummy)
    - home.tsx, about.tsx
    - PageNotFound.tsx
    - admin/
      - dashboard.tsx — posts list, add/update form, delete, toasts
  - utils/ (optional) — helpers for API calls, validation helpers

Notes:
- Router config: App.tsx uses createBrowserRouter with nested routes and wildcard 404s placed inside DefaultLayout so 404 pages render within layout.

---

## Features (user-facing)
- Simulated Sign Up / Sign In:
  - Sign In stores a fake token in localStorage on success.
  - Header updates to show Welcome + Logout when authenticated.
- Protected Dashboard:
  - Dashboard route requires authentication and redirects to Sign In when unauthenticated.
- Posts CRUD:
  - List posts (GET /posts)
  - Add post (POST /posts) via the same form, client-side validation.
  - Edit post (PUT /posts/:id) using the same form (Edit button populates form).
  - Delete post (DELETE /posts/:id) with confirmation.
- Validation:
  - Title: required, letters & spaces only.
  - Body: required, letters, numbers & spaces only.
- UI:
  - DefaultLayout provides consistent Header/Footer.
  - Toasts show success and error messages.
  - Optimistic updates: after POST/PUT/DELETE UI updates immediately.

---

## API details (JSONPlaceholder) — base URL
Base URL: https://jsonplaceholder.typicode.com

JSONPlaceholder is a free fake REST API that returns realistic responses but does not persist changes. Use the endpoints below for learning and testing.

1. Sign Up (dummy)
- Endpoint: POST /users
- Purpose: simulate user creation (response is faked)
- Example request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "123456"
}
```
- Example response (fake):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "123456",
  "id": 11
}
```

2. Sign In (dummy)
- JSONPlaceholder has no auth endpoints. The app simulates login (e.g., POST /posts or custom logic) and stores a fake token.
- Example (handled in app): receive `{ "token": "fake-jwt-token", "user": {...} }` and save token to localStorage.

3. Listing data
- Endpoint: GET /posts
- Returns list of posts:
```json
[
  { "userId": 1, "id": 1, "title": "...", "body": "..." },
  ...
]
```

4. Add new item
- Endpoint: POST /posts
- Request:
```json
{ "title": "My New Post", "body": "Learning API integration in ReactJS", "userId": 1 }
```
- Response:
```json
{ "id": 101, "title": "My New Post", "body": "...", "userId": 1 }
```

5. Update item
- Endpoint: PUT /posts/:id
- Request:
```json
{ "id": 1, "title": "Updated Post Title", "body": "Updated post content", "userId": 1 }
```
- Response:
```json
{ "id": 1, "title": "Updated Post Title", "body": "Updated post content", "userId": 1 }
```

6. Delete item
- Endpoint: DELETE /posts/:id
- Response: `{}` — treat any 2xx as success

Summary table (quick)
- Sign Up: POST /users
- Sign In (simulated): POST /posts (or handled in app)
- List: GET /posts
- Add: POST /posts
- Update: PUT /posts/:id
- Delete: DELETE /posts/:id

---

## How auth is handled in this app
- Sign-in flow (simulated):
  - On successful sign-in the app stores a token string in localStorage:
    - localStorage.setItem('token', token)
  - AuthContext reads token on mount and exposes:
    - token (string | null)
    - login(token: string)
    - logout()
    - isAuthenticated (boolean)
- ProtectedRoute uses isAuthenticated to allow or redirect to /sign-in.
- Header consumes AuthContext and:
  - Shows Sign In / Sign Up links when not authenticated.
  - Shows "Welcome to dashboard" and Logout when authenticated.
- Logout clears token and redirects to home.

Implementation tips:
- Prefer using AuthContext rather than direct localStorage.getItem everywhere.
- Listen for storage events if you want cross-tab token sync:
```ts
window.addEventListener('storage', (e) => {
  if (e.key === 'token') { /* update local context state */ }
});
```

---

## Validation rules used in UI
- Title: required, letters and spaces only — /^[A-Za-z\s]+$/
- Body: required, letters, numbers and spaces only — /^[A-Za-z0-9\s]+$/
- If validation fails the form shows field-level errors and a toast with the message.

---

## Example curl requests
- List posts
```bash
curl https://jsonplaceholder.typicode.com/posts
```
- Add post
```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","body":"World","userId":1}'
```
- Update post
```bash
curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Updated","body":"Updated","userId":1}'
```
- Delete post
```bash
curl -X DELETE https://jsonplaceholder.typicode.com/posts/1
```

---

## Troubleshooting & notes
- JSONPlaceholder fakes responses; POST/PUT/DELETE do not persist on server.
- If 404 pages under /dashboard not rendering inside the layout, ensure App.tsx uses nested wildcard routes (e.g. `/dashboard/*`) and places PageNotFound as a child.
- If header doesn't reflect auth state after manual localStorage change, reload or ensure AuthContext listens to `storage` event.
- For debugging, use browser DevTools Network to inspect requests and headers.

---

## Next steps (optional enhancements)
- Replace simulated auth with a real auth backend.
- Move API calls into a small API client module (centralize headers, base URL).
- Add pagination / lazy load for posts.
- Add unit tests for components and context.

---

If you want, I can update the README to include:
- Postman collection or CLI examples for each endpoint
- A CONTRIBUTING.md with local dev conventions
- A short architecture diagram (textual)
