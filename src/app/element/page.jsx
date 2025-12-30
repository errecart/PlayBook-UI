import { Suspense } from "react";
import Loader from "@/common/Loaders/Loader";
import ElementClient from "./ElementClient";

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ElementClient />
    </Suspense>
  );
}

export default Page;
