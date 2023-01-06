import { useMutation } from "@apollo/client";
import LoginUI from "./login.presenter";
import { LOGIN_USER } from "./login.query";

const Login = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          email: "d@n.com",
          password: "1234",
        },
      });
      console.log("result", result);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return <LoginUI onClickLogin={onClickLogin} />;
};

export default Login;
