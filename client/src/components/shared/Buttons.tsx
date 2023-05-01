import { cn } from "@/utils/classNames";

type prop = {
  hasValue: boolean;
  isAssistantTyping: boolean;
  content: string;
  classes?: string;
  handleClick: () => void;
};

export function SubmitButton({
  hasValue,
  isAssistantTyping,
  handleClick,
  content,
  classes,
}: prop) {
  return (
    <button
      disabled={!hasValue || isAssistantTyping}
      onClick={handleClick}
      className={cn(
        `border-2 bg-green-500 border-none z-10 text-white
      py-2 px-5 rounded-lg cursor-pointer
     hover:bg-green-500/70 hover:text-white transition-all`,
        isAssistantTyping ? "cursor-not-allowed bg-green-300" : null,
        classes
      )}
    >
      {content}
    </button>
  );
}
