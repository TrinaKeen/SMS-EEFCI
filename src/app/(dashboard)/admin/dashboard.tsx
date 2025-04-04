// pages/dashboard.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../../utils/auth';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Add dashboard content */}
    </div>
  );
};

export default Dashboard;
