import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

export default function Option({
  path,
  title,
  description,
  Icon,
}: {
  path: string;
  title: string;
  description: string;
  Icon: IconType;
}) {
  return (
    <Link
      to={path}
      className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-gray-100 p-4 pt-6 hover:border-gray-200/90 md:p-6"
    >
      <h2 className="text-green-400 text-2xl font-bold tracking-tight group-hover:underline">
        {title}
      </h2>
      <p>{description}</p>
      <div className="absolute top-[-35px] right-[-3px] bg-gray-100 group-hover:bg-gray-200/90 p-4 rounded-full">
        <Icon size={60} className="text-green-400" />
      </div>
    </Link>
  );
}
