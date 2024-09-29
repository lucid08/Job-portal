import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Mumbai", "Hyderabad", "Delhi", "Bangolore", "Gurugram"],
  },
  {
    filterType: "Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Scientist",
      "Product Manager",
      "UI / UX Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-20k", "20-40k", "40-60k", "60-80k", "80-1 lakh", "1 lakh+"],
  },
];
const FilterCard = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setValue(value);
    console.log(value);
  }
  useEffect(() => {
    dispatch(setSearchText(value))
  }, [value])
  return (
    <div className="mr-5 w-full bg-white p-5 rounded-md border border-gray-200">
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className="mt-4"/>
      <RadioGroup value={value} onValueChange={changeHandler} >
        {
          filterData.map((data, index) => (
            <div>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index} - ${idx}`;
                  return (
                    <div className="flex items-center space-x-2 my-3">
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>

    </div>
  );
};

export default FilterCard;
