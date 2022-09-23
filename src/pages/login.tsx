import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user.context";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

function LoginPage() {
  const user = useUserContext();

  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
