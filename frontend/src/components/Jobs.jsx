import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job2 from "./Job2";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    console.log(searchText);
    
    if (searchText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          job?.description?.name
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchText.toLowerCase()))
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchText]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span className="font-bold text-8xl">Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{opacity:0,x:100}} 
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:-100}}
                    transition={{duration:0.5}}
                  key={job?._id}>
                    <Job2 job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
