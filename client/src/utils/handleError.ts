import { toast } from "react-hot-toast";
const wait = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export const handleUnauthorized = async (
  statusCode: number,
  checkAuthStatus: Function,
  navigate: (name: string) => void,
  path: string
) => {
  if (statusCode === 403) {
    toast.error("You are not logged in.");
    await wait(2000);
    toast.error("Redirecting...");

    await checkAuthStatus();
    navigate(`/${path}`);
  } else if (statusCode === 429) {
    toast.error(
      "You have exceeded the rate limit. Please wait a moment and try again."
    );
  } else if (statusCode === 500) {
    toast.error("An internal server error occurred. Please try again later.");
    await checkAuthStatus();
    navigate(`/${path}`);
  }
};
