# AutoDash

A full-stack application for vehicle inventory management and analytics.

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- Recharts
- React Date Picker
- Axios

### Backend
- Express.js
- CORS
- csv-parser
- date-fns

## Project Structure
```
autodash/
├── client/           # React frontend
├── server/           # Express backend
├── .gitignore
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install required dependencies:
   ```bash
   npm install 
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### GET /api/inventory
Fetches inventory data with optional filters.

Query Parameters:
- `make`: Filter by vehicle make
- `duration`: Filter by time period (e.g., "1m", "3m", "6m", "1y")

Example:
```
GET /api/inventory?make=Toyota&duration=3m
```

## Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## Development Guidelines

1. Follow the established folder structure
2. Write unit tests for new features
3. Use proper TypeScript types
4. Implement error handling
5. Follow React best practices and hooks guidelines
6. Use Redux Toolkit for state management
7. Implement proper data validation

## Performance Considerations

1. Implement memoization for expensive calculations
2. Use proper indexing for data filtering
3. Implement pagination for large datasets
4. Optimize bundle size
5. Use lazy loading for components

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

MIT
