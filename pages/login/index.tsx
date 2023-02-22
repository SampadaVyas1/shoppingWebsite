import Button from "@/components/button";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const Login = () => {
  const context = useContext(AuthContext);

  const router = useRouter();

  const handleClick = () => {
    context.handleLogin();
    router.replace("/");
  };

  return (
    <div>
      <Button onClick={handleClick}>Login</Button>
    </div>
  );
};
export default Login;
