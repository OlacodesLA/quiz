import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  show: boolean;
  onClick: () => void;
};

export function StartModal({ show, onClick }: Props) {
  return (
    <>
      {show && (
        <Dialog open={show}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start Exam</DialogTitle>
              <DialogDescription>buifb.</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button type="button" onClick={onClick}>
                Start Exam
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
