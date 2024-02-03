// Sidebar.js
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

function Sidebar() {
  const { setSortOption } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleSortByDate = (ascending) => {
    const sortOption = ascending ? 'dateAsc' : 'dateDesc';
    setSortOption({ type: 'date', ascending, sortOption });
    toggleSidebar(); // Toggle the sidebar after selecting an option
  };

  const handleSortAlphabetically = () => {
    setSortOption({ type: 'alphabetical', sortOption: 'alphabetical' });
    toggleSidebar(); // Toggle the sidebar after selecting an option
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'X' : 'X'}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Sort Options</h2>
        <ul>
          <li>
            <button onClick={() => handleSortByDate(true)}>
              Sort by Date (Old to Latest)
            </button>
          </li>
          <li>
            <button onClick={() => handleSortByDate(false)}>
              Sort by Date (Latest to Old)
            </button>
          </li>
          <li>
            <button onClick={handleSortAlphabetically}>
              Sort Alphabetically
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
