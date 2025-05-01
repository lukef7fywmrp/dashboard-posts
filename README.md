# Blog Dashboard

A blog dashboard application built with Next.js that interacts with the JSONPlaceholder API to manage posts.

## Important Notes About Testing

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock API service. Please note:

1. **Data Persistence**:

   - Changes (create, update, delete) are not actually persisted on the server
   - The API simulates successful responses but doesn't store the data
   - If you refresh the page, you'll see the original data again

2. **Testing Behavior**:
   - You can test all CRUD operations in the UI
   - Changes will appear to work until you refresh the page
   - This is intentional for development and testing purposes

## Features

- Admin Dashboard with CRUD operations for posts
- Rich Text Editor for post content
- Public view of posts with details page
- Modern UI with TailwindCSS and shadcn/ui
- React Query for data fetching and caching

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/admin` - Admin dashboard for managing posts
- `/posts/[id]` - Individual post view
- `/` - Public list of posts

## Tech Stack

- Next.js (App Router)
- TailwindCSS
- shadcn/ui components
- React Query
- Plate Rich Text Editor

## Development Notes

This project was created as a technical test to demonstrate:

- Next.js best practices
- Modern UI/UX implementation
- State management with React Query
- Error handling
- Code structure and readability

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
