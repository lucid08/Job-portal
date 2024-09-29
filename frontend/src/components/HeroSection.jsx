import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobByText, setSearchText } from '@/redux/jobSlice';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    
    dispatch(setSearchText(searchTerm));
    navigate('/browse');
  };
  return (
      <div className='text-center'>
        <div className='flex flex-col gap-4 my-10'>
        <span className=' m-auto px-4 py-2 rounded-full bg-blue-300 font-medium'>It's Your life Make It Large</span>
        <h1 className='p-4 text-bold text-4xl'>Search, Apply & <br/>Get Your <span className='text-blue-700 font-bold'>Dream Job</span></h1>
        <p>This is just a dummy text</p>
        <div className='flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-3 mx-auto'>
        <input
            type='text'
            placeholder='Job Title, Location, Company'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='outline-none border-none w-full'
            // value={searchTerm}
        />
        <Button onClick={searchJobHandler} className="rounded-r-full bg-blue-700">
            <Search />
        </Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection