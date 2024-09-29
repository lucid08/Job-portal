import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div  onClick={() => navigate(`/description/${job._id}`)} className='p-8 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-semibold text-lg'>{job?.companyId?.name}</h1>
            <p className='text-gray-600 text-sm'>India</p>
        </div>
        <div>
            <h1 className='text-lg my-2 font-bold'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job.jobType}</Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards