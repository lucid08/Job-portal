import React from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-6 mr-6 ml-6">
        <div>
          <h1 className="text-2xl font-bold">
            JOB <span className="text-blue-800">PORTAL</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-semibold items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">COMPANIES</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">JOBS</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/jobs">JOBS</Link>
                </li>
                <li>
                  <Link to="/browse">BROWSE</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="text-blue-800" variant="outline">
                  LOGIN
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-blue-500 rounded-lg">
                <div className="">
                  <div className="ml-3 p-3 flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer mb-3">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-white">{user?.fullName}</h4>
                      <p className="text-sm text-white t">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-6 cursor-pointer p-2">
                        <User2 className="ml-5" />
                        <Button variant="link" className="text-white">
                          <Link to="/profile">VIEW PROFILE</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-6 cursor-pointer p-2">
                      <LogOut className="ml-5" />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-white"
                      >
                        LOGOUT
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
