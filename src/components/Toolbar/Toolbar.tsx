import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/admin" className="navbar-brand">
          Turtle Pizza Admin
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
          <li className="nav-item">
            <NavLink to="dishes" className="nav-link">
              Dishes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="orders" className="nav-link">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
