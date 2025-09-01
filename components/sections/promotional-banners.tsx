'use client';

import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function PromotionalBanners() {
  return (
    <div className="py-12 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* === Left Banner === */}
          <motion.div
            className="relative col-span-1 md:col-span-1 h-80 md:h-full rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <Image
              src="/banners/masala.jpg"
              alt="Ginger"
              fill
              className="object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-6 text-white h-full flex flex-col items-center justify-evenly">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-2 font-serif">
                  পাহাড়ি আদা
                </h2>
                <p className="text-sm font-serif">মাথা ব্যথার পরামর্শ</p>
                <p className="text-sm font-serif">সুস্বাস্থ্যের জন্যও</p>
              </div>
              <div>
                <Button className="mt-4 bg-transparent px-4 py-2" variant={"outline"}>
                  SHOP NOW →
                </Button>
                <div className="mt-4 flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>09613821316</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* === Right Column === */}
          <div className="col-span-1 md:col-span-2 grid grid-rows-2 gap-2 lg:gap-6">
            {/* Top Banner */}
            <motion.div
              className="relative h-40 md:h-full rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <Image
                src="/banners/all-masala.jpg"
                alt="Woman Cooking"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative flex flex-col items-center justify-center z-10 p-6 text-white">
                <h2 className="text-xl font-bold">পাহাড়ি মসলা কক্ষ্যে</h2>
                <Button className="mt-2 bg-transparent px-4 py-1" variant={"outline"}>
                  SHOP NOW →
                </Button>
              </div>
            </motion.div>

            {/* Bottom 2 Banners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Organic Products */}
              <motion.div
                className="relative h-40 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <Image
                  src="/banners/tomato.jpg"
                  alt="Organic"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 p-4 text-white">
                  <h3 className="text-sm sm:text-base font-semibold">
                    The best Organic Products Online
                  </h3>
                  <Button className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                    SHOP NOW →
                  </Button>
                </div>
              </motion.div>

              {/* Kitchen Products */}
              <motion.div
                className="relative h-40 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <Image
                  src="/banners/makeup.jpg"
                  alt="Makeup"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 p-4 text-white">
                  <h3 className="text-sm sm:text-base font-semibold">
                    Everyday Fresh & Clean with Our Products
                  </h3>
                  <Button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded">
                    SHOP NOW →
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
