import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  icon: any;
  text: string;
  head: string;
  className: string;
  variant?: "default" | "destructive" | null | undefined;
};

export function Banner({ icon, text, head, variant, className }: Props) {
  return (
    <Alert className={className} variant={variant ? variant : "default"}>
      {icon}
      <AlertTitle>{head}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
