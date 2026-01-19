"use client";
import { Suspense } from "react";
import PlayBookClient from "./PlayBookClient";
import Loader from "@/common/Loaders/Loader";


const PlayBook = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <PlayBookClient />
    </Suspense>
  );
};

export default PlayBook;
