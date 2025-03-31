require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const session = require('express-session');
const { sequelize } = require('./models');
const routes = require('./routes');
const { authenticateAdmin } = require('./middleware/auth');

// Register the Sequelize adapter
AdminJS.registerAdapter(AdminJSSequelize);

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// AdminJS configuration
const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: require('./models/User'),
      options: {
        navigation: {
          name: 'User Management',
          icon: 'User',
        },
      },
    },
    {
      resource: require('./models/Course'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'Book',
        },
      },
    },
    {
      resource: require('./models/Cohort'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'Users',
        },
      },
    },
    {
      resource: require('./models/Content'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'FileText',
        },
      },
    },
    {
      resource: require('./models/Assignment'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'File',
        },
      },
    },
    {
      resource: require('./models/Submission'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'Upload',
        },
      },
    },
    {
      resource: require('./models/Quiz'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'CheckSquare',
        },
      },
    },
    {
      resource: require('./models/Question'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'HelpCircle',
        },
      },
    },
    {
      resource: require('./models/QuizAttempt'),
      options: {
        navigation: {
          name: 'Course Management',
          icon: 'Activity',
        },
      },
    }
  ],
  branding: {
    companyName: 'The ThinkTank LMS',
    logo: false,
    favicon: '/favicon.ico',
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: authenticateAdmin,
    cookieName: 'adminjs',
    cookiePassword: process.env.JWT_SECRET,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
  }
);

// Mount AdminJS router first
app.use(adminJs.options.rootPath, adminRouter);

// Body parser middleware after AdminJS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Admin panel available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer(); 