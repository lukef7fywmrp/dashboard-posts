# Dashboard Posts - Frontend Developer Technical Test

A modern dashboard application built with Next.js that demonstrates CRUD operations using the JSONPlaceholder API. This project showcases best practices in React development, modern UI design, and efficient state management.

## Features

### Admin Dashboard (`/admin`)

- Complete CRUD operations for posts:
  - Create new posts with a rich text editor
  - View a list of all posts
  - Edit existing posts
  - Delete posts with confirmation
- Optimistic updates for smooth user experience
- Modern UI components using shadcn/ui
- Responsive design

### Public Site (`/`)

- View all posts in a clean, modern layout
- Post excerpts with titles
- Detailed post view pages (`/posts/[id]`)
- Responsive design for all devices

## Technical Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Rich Text Editor**: TipTap
- **API**: JSONPlaceholder

## Implementation Notes

### React Query Implementation

The project uses React Query for efficient data fetching and state management. While working with the JSONPlaceholder API (which doesn't persist changes), we've implemented optimistic updates for a better user experience. In a production environment with a real API, you would typically:

1. Keep the optimistic updates for immediate UI feedback
2. Add query invalidation after successful mutations
3. Let React Query automatically refetch to ensure data consistency with the server

The current implementation focuses on client-side cache updates since JSONPlaceholder is a mock API.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/lukef7fywmrp/dashboard-posts
cd dashboard-posts
```

2. Set up environment variables:

```bash
# Create a .env.local file in the root directory and add:
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

3. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note**: The application uses JSONPlaceholder as a mock API. While all CRUD operations will appear to work in the UI, changes are not persisted on the server. This is expected behavior for development and testing purposes.

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions and API calls
└── types/              # TypeScript type definitions
```

## Key Features Implementation

### Admin Dashboard

- Optimistic updates for immediate UI feedback
- Confirmation dialogs for destructive actions
- Error handling with toast notifications
- Rich text editor for post content
- Responsive grid layout

### Public Site

- SEO-friendly post pages
- Clean and modern design
- Responsive layout
- Efficient data fetching with React Query

## Deployment

The project is deployed on Vercel and can be accessed at: [Add your deployment URL]

## Future Improvements

1. Add authentication and authorization
2. Implement real backend integration
3. Add image upload functionality
4. Add search and filtering capabilities
5. Implement pagination for better performance with large datasets

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
