import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "Sign out successful", type: "success" });
    },
    onError: (error: Error) => {
      console.error("Sign out failed:", error.message);
      showToast({ message: error.message, type: "error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
