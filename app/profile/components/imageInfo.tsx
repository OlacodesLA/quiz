import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type Props = {};

const ImageInfo = ({ firstName, lastName, picture }: any) => {
  return (
    <div className="bg-white h-40 rounded-xl">
      <div className="bg-gradient-to-r from-gray-950 to-black h-24 w-full rounded-t-xl" />
      <div className="flex gap-4 items-start md:px-10">
        <div className="w-28 h-28 border-4 border-white rounded-full flex -translate-y-14">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-full">
            <Image
              src={picture || ""}
              alt={firstName + " " + lastName + "`s profile picture"}
              fill
              className="rounded-full object-cover"
            />
          </AspectRatio>
        </div>
        <div className="">
          <p className="text-gray-900 text-lg font-bold">
            {firstName} {lastName}
          </p>
          <p className="text-sm  text-gray-700">Student</p>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
