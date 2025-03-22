### Xpress Dashboard

A modern, responsive dashboard application for Xpress, built with Next.js and Tailwind CSS. This application provides a comprehensive interface for managing verifiers, tracking transactions, and monitoring account activities.





## 🚀 Features

- **Authentication System**

- Secure sign-in and sign-up flows
- Two-step registration process
- Session management with protected routes



- **Dashboard**

- Comprehensive verifiers management
- Advanced filtering and sorting capabilities
- Real-time notifications system
- Responsive design for all devices



- **Data Visualization**

- Transaction monitoring
- Status tracking with visual indicators
- Activity logs and history



- **User Experience**

- Intuitive navigation with collapsible sidebar
- Form validation and error handling
- Loading states and feedback mechanisms
- Dark/light mode support





## 🛠️ Technologies

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Authentication**: Custom JWT implementation (mock)
- **Deployment**: Vercel


## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn


## 🔧 Installation

1. Clone the repository:

```shellscript
git clone https://github.com/kizitech/xpress-fe-assessment.git
cd xpress-fe-assessment
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## 🔑 Usage

### Authentication

For testing purposes, you can use any email and password combination as the application uses a mock authentication system.

Example credentials:

- Email: `test@example.com`
- Password: `password123`


### Navigation

- The sidebar provides access to different sections of the dashboard
- Use the top navigation bar for quick actions and notifications
- The dashboard displays verifier information with filtering and sorting options


## 📁 Project Structure

```plaintext
xpress-fe-assessment/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard pages
│   ├── signin/             # Authentication pages
│   ├── signup/             # Registration pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (redirects to signin)
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── context/                # React Context providers
│   └── auth-context.tsx    # Authentication context
├── public/                 # Static assets
├── styles/                 # Global styles
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile phones


The sidebar automatically collapses on smaller screens and can be toggled with the menu button.

## 🔒 Authentication Flow

1. **Sign In**:

1. Email and password authentication
2. Error handling for invalid credentials
3. Redirect to dashboard on successful authentication



2. **Sign Up**:

1. Two-step registration process
2. Step 1: Personal information
3. Step 2: Security credentials
4. Validation for all form fields





## 📊 Dashboard Features

### Verifiers Management

- View all verifiers in a sortable, filterable table
- Add new verifiers through a modal form
- Filter verifiers by status (Active, Pending, Inactive)
- Search verifiers by name, location, or email


### Notifications

- Real-time notification system
- Mark notifications as read
- View notification history


## 🛣️ Future Improvements

- Integration with a real backend API
- Advanced analytics and reporting
- User role management
- Export functionality for data
- Enhanced security features
- Theme customization options


## 📸 Screenshots

### Authentication Screens

![Step 1](<public/Screenshot 2025-03-21 124545.png>)

![Step 2](<public/Screenshot 2025-03-21 124557.png>)

![Pending Modal](<public/Screenshot 2025-03-21 124604.png>)

![Sign In](<public/Screenshot 2025-03-21 124617.png>)






### Dashboard

![Dashboard](<public/Screenshot 2025-03-21 124627.png>)



## 👨‍💻 Author

Created by [Kizito Ohani](https://github.com/kizitech)

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)