import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetSIngleJob from "@/hooks/useGetSingleJob";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOBS_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const {user} = useSelector(store => store.auth)
  
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicants === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,  {
        withCredentials: true,
      });
      if(res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]};
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications?.some(application => application.applicants === user?._id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"font-bold text-blue-600"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"font-bold text-blue-600"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <div>
          <Button
          onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Already Applied " : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-bold py-4">{singleJob?.description}</h1>
      <div className="my-5">
        <h1 className="font-bold my-2">Role : <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-2">Location : <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-2">Description : <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-2">Experience : <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} Years</span></h1>
        <h1 className="font-bold my-2">Salary : <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-2">Total Applicants : <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-2">Posted Date : <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
