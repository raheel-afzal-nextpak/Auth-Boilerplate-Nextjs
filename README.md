# 🚀 Auth-Boilerplate-Nextjs

[![Next.js](https://img.shields.io/badge/Next.js-v14.2.2-000000?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-v10.11.1-FFCA28?logo=firebase&style=for-the-badge)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.3.0-06B6D4?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-v1.0-4F46E5?logo=radix&style=for-the-badge)](https://www.radix-ui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-3178C6?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)

This project is a **Next.js** boilerplate that provides a strong foundation for building modern web applications with Firebase authentication, Radix UI components, Tailwind CSS for styling, and TypeScript for type safety. It implements a clean and maintainable structure, using the Repository Pattern with Firebase and state management using Redux and Recoil.

## 🌟 Key Features

- **Firebase Authentication** with support for:
  - 📧 **Email/Password Authentication** (including email verification)
  - 🔐 **Google Sign-in**
  - 🍏 **Apple Sign-in**
  
- **Radix UI Components** for accessible, customizable UI elements.
- **Tailwind CSS** for utility-first, responsive styling.
- **TypeScript** for type safety and a great developer experience.
- **Repository Pattern** for a clean separation between business logic and Firebase.
- **State Management** with **Redux Toolkit** and **Recoil**.
- **Form Handling** with **React Hook Form** and **Zod** for schema-based validation.
- **Unit Testing** using **Jest** and **React Testing Library**.

## 📦 Packages Used

Here’s a breakdown of the key packages used in this project:

### Core Dependencies

- **[Next.js](https://nextjs.org/)** - The React Framework for Production.
- **[Firebase](https://firebase.google.com/)** - Authentication and backend services.
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components for building high-quality design systems.
  
### Firebase and State Management

- **[Firebase v10.11.1](https://firebase.google.com/)** - Authentication and data management.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Efficient Redux setup for state management.
- **[Recoil](https://recoiljs.org/)** - A flexible state management library for complex state.
- **[Redux Persist](https://github.com/rt2zz/redux-persist)** - Persist Redux state across sessions.

### Forms and Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant, flexible form handling.
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation for forms.

### Testing and Development

- **[Jest](https://jestjs.io/)** - Delightful JavaScript testing.
- **[React Testing Library](https://testing-library.com/)** - Testing utilities to work with React components.
- **[ESLint](https://eslint.org/)** - Linter for code consistency.
- **[Husky](https://typicode.github.io/husky/#/)** - Pre-commit hooks for ensuring code quality.


## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/radix-auth-boilerplate.git
cd radix-auth-boilerplate
2. Install dependencies
bash
Copy code
npm install
3. Firebase Setup
Go to Firebase Console, create a project, and enable Email/Password, Google, and Apple authentication.
Download your Firebase credentials and update the .env file:
makefile
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
4. Run the development server
bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser to see the project in action.

5. Build for production
bash
Copy code
npm run build
📚 Usage
Firebase Authentication: Easily manage user authentication with email/password, Google, and Apple sign-in.
Tailwind CSS: Customize the look and feel of your app by modifying the pre-configured utility classes.
Radix UI: Quickly implement accessible UI components for menus, tabs, popovers, and more.
Forms: Use React Hook Form and Zod for efficient form handling and validation.
📈 Performance and Testing
Run tests using Jest and React Testing Library:

bash
Copy code
npm run test
🧰 Additional Tools
Recoil for state management, providing an easy-to-use and flexible alternative to Redux.
Redux Logger for logging Redux state changes in development.
Tailwind Merge for handling Tailwind utility class conflicts.
🔗 Useful Links
Radix UI Documentation
Tailwind CSS Documentation
Firebase Documentation
🤝 Contributing
Feel free to open issues and pull requests. Contributions are welcome!

