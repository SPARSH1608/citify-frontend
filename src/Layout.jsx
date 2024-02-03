import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function layout() {
  return (
    <main>
      <Header />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
}
