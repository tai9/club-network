import { AuthController } from "@/controllers/authController";
import { createContext, useContext } from "react";

const useAuthContextValues = () => {
  return {
    isLoggedIn: AuthController.isAuthenticated,
  };
};
const useAppContext = () => {
  const contextValues = useAuthContextValues();
  return {
    ...contextValues,
  };
};

const AppContext = createContext<ReturnType<typeof useAppContext>>({} as any);

export const AuthenProvider: React.FC<any> = ({ children }) => {
  const contextValues = useAppContext();
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used inside an AuthenProvider");
  }
  return ctx;
};
