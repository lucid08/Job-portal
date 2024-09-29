import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "JavaScript", "reactJs"];
const isResume = true;
const Profile2 = () => {
  useGetAppliedJobs();
  

    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-7">
            <Avatar className="h-24 w-24 ">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-6">
          <div className="flex items-center gap-5 mt-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-4">
          <h1 className="font-semibold mb-3">Skills</h1>
          <div className="flex items-center gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index} className={"bg-blue-600"}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
            <Label className="font-bold text-lg">Resume</Label>
            {
                isResume? (
                    <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>
                ) : (
                    <span>NA</span>
                )
            }
        </div>
      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-3">Applied Jobs</h1>
            <AppliedJobsTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile2;
