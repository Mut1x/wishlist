# Wishlist App

A modern Angular application for managing your wishlist items with a beautiful modal interface.

## Features

- **Modal-based Interface**: Add and edit wishes through a clean, modern modal window
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All wishes are saved locally in your browser
- **Rich Wish Details**: Each wish can include name, description, price, currency, and link
- **Acquisition Tracking**: Mark wishes as acquired with a visual indicator
- **Form Validation**: Ensures all required fields are filled and links are valid

## How to Use

### Adding a New Wish
1. Click the "Add New Wish" button in the header
2. Fill in the wish details in the modal:
   - **Wish Name** (required): The name of your wish
   - **Description** (optional): Additional details about the wish
   - **Price** (optional): The cost of the item
   - **Currency**: Select from EUR, USD, INR, or JPY
   - **Link** (required): Must be a valid HTTPS URL
3. Click "Add Wish" to save

### Editing a Wish
1. Click the edit button (pencil icon) next to any wish
2. Modify the details in the modal
3. Click "Update Wish" to save changes

### Managing Wishes
- **Delete**: Click the delete button (trash icon) to remove a wish
- **Mark as Acquired**: Check the "Acquired" checkbox to mark a wish as obtained
- **View Item**: Click "View Item" to open the wish link in a new tab

## Technical Details

- Built with Angular 20
- Uses modern CSS with LESS preprocessing
- Responsive design with mobile-first approach
- Form validation with real-time error feedback
- Local storage for data persistence

## Development

To run the development server:

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200` to view the application.

## Recent Updates

- Converted inline form to modal-based interface
- Added support for both adding and editing wishes in the same modal
- Improved UI/UX with modern styling and animations
- Enhanced responsive design for mobile devices
- Added form validation with user-friendly error messages

## Tech stack

- Angular 20
- Typescript
- Less
- Local storage

## To Do

- ~~Modal window for form~~
- Use routing to see individual wishes
- ~~Clean up the UI~~
- ~~Import/export wishes to JSON and CSV~~
- Write tests

