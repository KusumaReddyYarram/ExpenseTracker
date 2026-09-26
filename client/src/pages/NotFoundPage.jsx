import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <h1 className="text-6xl font-extrabold text-aura-charcoal">404</h1>
      <h2 className="text-xl font-bold text-slate-700">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-md">
        The financial module or page route you are looking for does not exist or has been relocated.
      </p>
      <Link to="/">
        <Button variant="emerald" icon={Home}>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
