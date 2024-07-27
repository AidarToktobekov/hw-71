import Toolbar from '../../components/Toolbar/Toolbar';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
        <header>
        <Toolbar />
        </header>
        <main className="container">
            <div className='my-3'>
              Turtle Pizza - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi porro officia delectus quo consequuntur, molestias tenetur earum temporibus, qui quisquam ipsum nostrum quibusdam est! Vel exercitationem doloribus voluptatibus repellendus quod.
            </div>
            <Outlet />
        </main>
    </>
  );
};

export default AdminPage;