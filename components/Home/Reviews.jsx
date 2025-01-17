'use client'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchReviews();
  }, []);

  return (
    <>
    <Carousel
    opts={{
      align: "start",
    }}
    className="w-[90vw] md:max-w-3xl lg:max-w-6xl mx-auto  relative"
  > 
   <h2 className="text-3xl text-center leading-none font-bold mb-6"> What Our Users Say</h2>
    <CarouselContent>
      {reviews?.map((review, index) => (
        <CarouselItem key={index} className="basis-full lg:basis-1/2">
          <div className="p-1">
            <Card>
              <CardContent className="flex p-2">
                <div className="dark:bg-slate-800 rounded-xl hover:-translate-y-1 h-full duration-300 p-6">
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <Image
                            src={review?.userId?.image}
                            alt={review?.userId?.firstname}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div>
                          <h5 className="text-md break-all font-semibold">
                            {`${review?.userId?.firstname} ${review?.userId?.lastname}`}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <p className="leading-[1.8] opacity-80 mb-6">{review.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  
    {/* Buttons */}
    <CarouselPrevious
      className="absolute -left-3 xl:-left-8 top-[55%] transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow-lg"
    />
    <CarouselNext
      className="absolute -right-3 xl:-right-8 top-[55%] transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow-lg"
    />
    </Carousel>
  </>
  )
  
}


 
