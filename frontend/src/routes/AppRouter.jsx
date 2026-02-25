// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy loading for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const References = lazy(() => import('../pages/References'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Contact = lazy(() => import('../pages/Contact'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    color: '#002a54'
  }}>
    Loading...
  </div>
);

/**
 * Routes with lazy loading for better performance
 * Router is placed in src/main.jsx (single BrowserRouter)
 */
export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Main pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/references" element={<References />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Fallback - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
