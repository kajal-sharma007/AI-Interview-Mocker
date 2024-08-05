"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  // Define the handler function
  const handleButtonClick = () => {
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>hello</h1>
      <Button onClick={handleButtonClick}>Button</Button>
    </div>
  );
}
