interface HeadingProps {
  title: string;
  description: string;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className="">
      <h2
        className={`text-3xl tracking-light ${
          className ? className : "font-bold"
        }`}
      >
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
