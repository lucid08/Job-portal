import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobByText } from "@/redux/jobSlice";

const category = [
  "FullStack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (text) => {
    dispatch(setSearchJobByText(text));
    navigate('/browse');
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {
          category.map((category, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                <Button onClick={() => searchJobHandler(category)} className="bg-blue-600">
                    {category}
                </Button>
            </CarouselItem>
          ))
          }
          
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
