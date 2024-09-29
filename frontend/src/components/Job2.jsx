import React from "react";
import { Button } from "./ui/button";
import {  Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";

const Job2 = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "qwertyuiofjhbvcb";
  const postedData = (mongodbtime) => {
    const createdAt = new Date(mongodbtime);
    const currentTime = new Date();
    const diffTime = Math.abs(currentTime - createdAt);
    return Math.floor(diffTime / (1000 *24 * 60 * 60));
  }
  return (
    <div className="p-7 bg-white border border-gray-200 rounded-md shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{postedData(job?.createdAt) === 0 ? "Today" : `${postedData(job?.createdAt)} days Ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.companyId?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-bold">{job?.title}</h1>
          <p className="text-md text-gray-600">{job?.companyId?.name}</p>
        </div>
      </div>
      <div>
        <p className="text-md text-gray-600">{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job?.jobType}</Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">{job?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
          <Button>Save for later</Button>
        </div>
    </div>
  );
};

export default Job2;
