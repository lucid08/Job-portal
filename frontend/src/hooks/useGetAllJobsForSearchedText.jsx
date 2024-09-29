import { setAllJobs } from '@/redux/jobSlice';
import { JOBS_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobsForSearchedText = () => {
    const dispatch = useDispatch();
    const {searchText} = useSelector(store => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOBS_API_END_POINT}/get?keyword=${searchText}`, {withCredentials: true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error.message);
            
        }
    };
    fetchAllJobs();
  },[])
}

export default useGetAllJobsForSearchedText;