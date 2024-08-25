import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  icon: any;
  text: string;
  head: string;
  className: string;
  variant?: "default" | "destructive" | null | undefined;
  onClick?: () => void;
  buttonText?: string;
  href?: string;
};

export function Banner({
  icon,
  text,
  head,
  variant,
  className,
  onClick,
  href,
  buttonText,
}: Props) {
  return (
    <Alert className={className} variant={variant ? variant : "default"}>
      <div className="flex gap-2">
        <div className="">{icon}</div>
        <div className="">
          <AlertTitle>{head}</AlertTitle>
          <AlertDescription className="max-w-4xl">{text}</AlertDescription>
        </div>
      </div>

      <Link href={href ?? "#"} className="">
        {buttonText && (
          <Button className="" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </Link>
    </Alert>
  );
}
