import React from 'react';
import Header from './_components/Header';
import { UserButton } from '@clerk/nextjs';

interface DashboardProps {
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = () => {
    return <div>
        <Header />
        <UserButton />
    </div>;
};

export default Dashboard;
