import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOBS_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const companyArray = [];

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectCompanyHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({...input, companyId: selectedCompany._id });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${JOBS_API_END_POINT}/post`,input,{
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        if(res.data.success) {
            toast.success(res.data.message);
            navigate(`/admin/jobs`);

        }
    } catch (error) {
        console.log(error.message);
        toast.error(error.response.data.message);
        
    }
    finally {
        setLoading(false);
    }
    
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-300 shadow-lg rounded-lg">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Descripiton</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Number Of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0  focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length >= 0 && (
              <Select onValueChange={selectCompanyHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {
            loading ? 
            <Button className="w-full my-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
            :
            <Button type="submit" className="w-full my-6">
            Post New Job
          </Button>
          }
          {companies.length === 0 && (
            <p className="text-sm text-red-600 font-bold text-center my-4">
              *PLEASE REGISTER A COMPANY BEFORE POSTING A JOB
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
