import { Button } from "@/components/ui/button";
import Image from "next/image";
import Signup from "../accounts/signup/page";
import Sidebar from "../sidebar/page";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Sidebar />
      {/* <Signup /> */}
    </div>
  );
}
