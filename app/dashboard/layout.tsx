import React, { ReactNode } from 'react';
import Header from './_components/Header';
import { Toaster } from 'sonner';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <Toaster />
            <div className='mx-5 md:mx-20 lg:mx-36'>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
