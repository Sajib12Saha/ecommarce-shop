"use client";

import { useRef } from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { BlogCard } from "@/app/blogs/_components/blog-card";
import { dbBlog } from "@/types/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const BlogsSection = () => {
  const { data: blogs, isLoading } = useBlogs(1);

  const autoplay = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false })
  );

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col overflow-hidden rounded-xl">
                <Skeleton className="h-48 w-full sm:h-56 md:h-64" />
                <CardContent className="space-y-3 p-4">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!blogs?.data || blogs.data.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          className="w-full p-1"
        >
          <CarouselContent>
            {blogs.data.map((blog: dbBlog) => (
              <CarouselItem
                key={blog.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <BlogCard blog={blog} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};