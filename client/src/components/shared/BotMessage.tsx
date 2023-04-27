import TimeAgo from "@/components/shared/TimeAgo";

type Props = {
  timestamp: string;
  content: string;
};

function BotMessage({ timestamp, content }: Props) {
  return (
    <div className="sm:w-[92%]">
      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
        <p className="text-sm">{content}</p>
      </div>
      <div className="flex py-1 items-end justify-start gap-2 w-full">
        <span className="text-xs text-gray-500 leading-none">BuddhiBot •</span>
        <span className="text-xs text-gray-500 leading-none">
          <TimeAgo timestamp={timestamp} />
        </span>
      </div>
    </div>
  );
}

export default BotMessage;
