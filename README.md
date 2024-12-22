# Project Documentation

## Features Implemented

### Technical Description

1. **User Authentication**:
   - Integrated Firebase authentication for secure user sign-up, login, and logout functionality.
   - Leveraged environment variables for sensitive API keys.
2. **Add to Cart**:
   - Integrated an "Add to Cart" button in the recipe cards. When a user clicks the button, the selected recipe is added to a cart state, enabling users to manage their cart items.
3. **Dynamic Data Rendering**:
   - Developed components to fetch and display real-time data from the Firebase database.
4. **Responsive Design**:
   - Implemented CSS frameworks and media queries for a mobile-friendly and adaptive UI.
5. **Error Handling**:
   - Added robust error-handling mechanisms for authentication failures and server-related issues.
6. **Toast Notifications**:
   - Integrated **Toastify** for real-time notifications on user actions (e.g., successful login, errors, logout).
   - Enhanced user experience with visually appealing and actionable alerts.
7. **Footer Component**:
   - Designed and added a **footer** with useful links and branding information.
   - Made the footer responsive to align seamlessly with the rest of the layout.

### Non-Technical Description

- **User-Friendly Interface**: Designed an intuitive layout with clearly labeled features for easy navigation.
- **Enhanced Feedback Mechanism**: Incorporated real-time notifications to guide users during interactions.
- **Aesthetic Enhancements**: Added a professional-looking footer to improve the overall visual appeal of the application.
- **Security Enhancements**: Ensured data security by using environment variables and best practices for authentication.

---

## Bug Fixes

1. **Invalid API Key Issue**:
   - Fixed getRecipeDetails funtion in Httpkit.js.
   - Added the await keyword before the axios.get() call in the getRecipeDetails method to properly wait for the API response before accessing the data property.
2. **Permission Error During Build**:
   - Resolved the `EPERM` file access issue by adjusting directory permissions and clearing the `.next` folder.
3. **Responsive Design Bugs**:
   - Fixed layout alignment issues on smaller devices for a smoother user experience.
4. **Toast Notification Positioning**:
   - Adjusted Toastify notifications to prevent overlap with other UI elements.
5. **TypeError: setIsOpen is not a function**
   - Cause: The setIsOpen function was expected to be passed as a prop but was either undefined or improperly provided. This caused the component to break when attempting to invoke setIsOpen.
   - Fix: Added proper type checking and default handling for the setIsOpen prop. Verified that the parent component correctly passed a valid function to manage the open/close state.
6. **Search Input Handling Issue**
   -Cause: The search functionality was not implemented correctly. The searchInput was improperly handled, and filtering logic was missing.
   -Fix:
   Fixed the searchInput state handling to ensure it stores the correct user input.
   Implemented a filtering mechanism that compares the query with recipe names in a case-insensitive manner.
   Displayed a message if no recipes match the search query.

---

## Time Estimate

**Total Time Spent**: Approximately 20 hours
