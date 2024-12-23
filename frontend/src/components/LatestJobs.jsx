import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const randomJobs = [1,2,3,4,5,6,7,8,9,10]

const LatestJobs = () => {

  const {allJobs} = useSelector(store => store.job);
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-3xl font-bold'><span className='text-blue-600'>Latest</span> Jobs Openings</h1>
        {/* Add job cards here */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
            {

            allJobs.length > 0 ?  allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job}/>) : <span>No Jobs Available</span>
            }
        </div>
    </div>
  )
}

export default LatestJobs