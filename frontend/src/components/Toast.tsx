import { useEffect } from "react";

type Props = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: Props) => {
  const styles =
    type === "success"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : type === "error"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-yellow-600 text-white max-w-md";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
