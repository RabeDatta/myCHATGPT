import TimeAgo from "@/components/shared/TimeAgo";
import { cn } from "@/utils/classNames";

import "highlight.js/styles/github.css";
import "7.css/dist/gui/tabs.css";
import "7.css/dist/gui/dropdown.css";
import "7.css/dist/gui/window.css";
import "7.css/dist/gui/textbox.css";

type Props = {
  timestamp: string;
  data: string | Array<{ url: string }>;
  name: string;
};

function DisplayImg({ timestamp, data, name }: Props) {
  return (
    <div
      className="sm:w-[96%] flex 
flex-col overflow-y-auto"
    >
      <div
        className={cn(
          `w-[96%] h-auto  
          rounded-lg overflow-x-auto relative code-scrollbar`
        )}
      >
        <div className="window w-fit">
          <div className="title-bar">
            <div className="title-bar-text bg-transparent">{name}</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" disabled></button>
              <button aria-label="Maximize" disabled></button>
              <button aria-label="Close" disabled></button>
            </div>
          </div>

          <div className="window-body p-2 overflow-hidden">
            <div
              className={cn(
                "grid gap-2",
                Array.isArray(data) && data.length > 1 ? "sm:grid-cols-2" : null
              )}
            >
              {Array.isArray(data) ? (
                data.map(({ url }) => (
                  <img src={url} alt="image" height={250} width={250} />
                ))
              ) : (
                <img src={data} alt="image" height={250} width={250} />
              )}
            </div>
          </div>
        </div>
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

export default DisplayImg;
