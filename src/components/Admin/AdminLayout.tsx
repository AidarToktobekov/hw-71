import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import { Routes, Route, Outlet } from 'react-router-dom';

const AdminPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
        <header>
        <Toolbar />
        </header>
        <main className="container-fluid">
            <Outlet />
      </main>
    </>
  );
};

export default AdminPage;