import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useSearch } from '../context/searchContext';

function Navbar() {
  const { searchTerm, setSearchTerm, setSearchResults } = useSearch();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmedQuery = searchTerm.trim();

      if (trimmedQuery) {
        axios
          .get(`/api/projects/search?query=${trimmedQuery}`)
          .then((res) => setSearchResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
<div className="w-[calc(100%+24px)] bg-white px-4 py-5 flex items-center justify-between shadow-sm -ml-6">
      <h2 className="text-xl font-semibold tracking-wide">Timetable Management </h2>
      <div className="flex items-center gap-4 relative">
        <SearchBar className="w-full md:w-3/4 lg:w-[300px]" onChange={setSearchTerm} />
        <img
          src="https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E="
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Navbar;
