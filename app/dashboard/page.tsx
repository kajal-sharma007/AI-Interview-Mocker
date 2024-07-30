import React from 'react';

interface DashboardProps {
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default Dashboard;
