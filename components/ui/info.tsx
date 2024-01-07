export const Info = ({ title, content }: any) => {
  return (
    <div className="">
      <p className="text-sm font-semibold leading-6 text-gray-800 pb-1">
        {title}
      </p>
      <p className={`${content ? "text-gray-600" : "text-red-400"} text-sm `}>
        {content || "please fill"}
      </p>
    </div>
  );
};
