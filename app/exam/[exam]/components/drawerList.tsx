import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HelpCircle } from "lucide-react";

const DrawerList = ({ questions, current, api }: any) => {
  const setSlide = (number: number) => {
    api.scrollTo(number);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild className="fixed bottom-24 right-2 ">
        <Button
          variant="outline"
          size="icon"
          className="group h-10 w-10 shrink-0 rounded-full bg-gray-200 hover:bg-gray-800"
        >
          <HelpCircle className="text-gray-800 group-hover:text-gray-200 h-6 w-6" />
          <span className="sr-only">Decrease</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Questions</DrawerTitle>
            <DrawerDescription>
              Select a question to navigate to.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mt-3  grid grid-cols-5 gap-4  rounded-lg">
              {questions.map((_: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setSlide(index)}
                  className={`flex hover:bg-slate-800 border-2 border-gray-800 group ${
                    current === index + 1 && "bg-slate-800"
                  } rounded-md transition-all items-center justify-center py-2 px-[22px] cursor-pointer`}
                >
                  <span
                    className={`text-lg text-gray-800 group-hover:text-white ${
                      current === index + 1 && "text-white"
                    } font-semibold`}
                  >
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerList;
