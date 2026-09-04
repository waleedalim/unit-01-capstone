# Unit 01 Capstone
 
A full-stack recipe management app built as culmination of first week of bootcamp capstone. Users can browse and search public recipes, and create an account to add, edit, and delete their own recipes.
 
**Live App:** http://spoonful-waalim.s3-website-us-east-1.amazonaws.com
**Live API:** http://ec2-100-60-71-190.compute-1.amazonaws.com:3000/api
 
---
 
## Features
 
- **Public recipe browsing**: view and search all recipes by title, no account required
- **Authentication**: signup, login, logout
- **Protected dashboard**: logged-in users can create, edit, and delete their own recipes
- **Route protection**: the dashboard redirects unauthenticated users to login
- **Responsive design**: styled to match the project's Figma spec across screen sizes
- **Edge-case handling**: permission and not-found errors are handled on edit/delete
---
 
## Tech Stack
 
- React + TypeScript (Vite)
- React Router for client-side routing
- Axios for API requests
- Vitest + React Testing Library for component tests
- Express
- MongoDB
- JWT authentication with bcrypt password hashing
- Backend deployed on AWS EC2
- Frontend deployed on AWS S3
---
 
## Project Structure
 
```
unit-01-capstone/
├── backend/          # Express API, MongoDB models, JWT auth
├── client/           # React + TypeScript frontend (Vite)
├── infra/            # CloudFormation template for backend EC2 deployment
├── design.md          # Original design spec / user flows
└── readme.md
```
 
---
 
## Running Locally
 
**Backend** (requires Docker):
```bash
cd backend
docker compose -f docker-compose.dev.yml up --build -d
```
API runs at `http://localhost:3000`.
 
**Frontend**:
```bash
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`.
 
> Note: `client/src/api/axios.ts` currently points at the deployed EC2 backend for production. To run fully locally, swap the `baseURL` back to `http://localhost:3000/api`.
 
---
 
## Testing
 
Component tests are written with Vitest and React Testing Library.
 
```bash
cd client
npm run test
```
 
---
 
## API Endpoints
 
| Method | Route | Description | Auth required |
|---|---|---|---|
| POST | `/api/users/signup` | Create an account | No |
| POST | `/api/users/login` | Log in | No |
| GET | `/api/recipes` | List/search recipes (`?title=`, `?tag=`, `?ingredient=`) | No |
| GET | `/api/recipes/:id` | Get a single recipe | No |
| POST | `/api/recipes` | Create a recipe | Yes |
| PUT | `/api/recipes/:id` | Update a recipe (owner only) | Yes |
| DELETE | `/api/recipes/:id` | Delete a recipe (owner only) | Yes |
 
---
 
## Known Limitations / Future Work
 
- Playwright end-to-end tests are not yet implemented
- Dedicated unit tests for auth/helper utilities (separate from component tests) are not yet implemented
- Ingredient quantities are currently stored as a placeholder value; the UI accepts a single comma-separated ingredients list rather than structured name/quantity pairs
- No password reset flow
---
 
## Author
 
Built by Waleed Alim for Bootcamp week 01 capston.
