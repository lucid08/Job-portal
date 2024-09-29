import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const appliedJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // Add your logic to fetch and display applied jobs
            // For demonstration purposes, let's assume we have an array of objects representing applied jobs
            allAppliedJobs.length <= 0 ? (
              <span>You Haven't Applied For Any Job Yet...</span>
            ) : (
              allAppliedJobs.map((item) => (
                <TableRow key={item?._id}>
                  <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{item?.jobs?.title}</TableCell>
                  <TableCell>{item?.jobs?.companyId?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${item?.status === "rejected" ? "bg-red-600" : item?.status ===  "pending" ?  'bg-gray-500' : "bg-blue-600"}`}> {item?.status.toUpperCase()}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
