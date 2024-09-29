import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job2 from "./Job2";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchText(""))
    }
  }, [])
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-8">Search Results {allJobs.length}</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {allJobs.map((job) => {
            return <Job2 key={job._id} job={job}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
