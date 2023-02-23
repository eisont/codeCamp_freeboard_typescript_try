import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LoginUI from "./login.presenter";
import * as yup from "yup";
import { LOGIN_USER } from "./login.query";
import { useMutation } from "@apollo/client";
import { AccessTokenState } from "../../../commons/store";
import { useRecoilState } from "recoil";
import { IData } from "./login.types";

const schema = yup.object({
  email: yup.string().required("이메일은 필수 입력사항입니다."),
  password: yup.string().required("비밀번호는 필수 입력사항입니다."),
});

const Login = () => {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [, setAccessToken] = useRecoilState(AccessTokenState);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickHome = () => {
    router.push(`./boards`);
  };
  const onClickSignup = () => {
    router.push(`./signup`);
  };

  const onClickLogin = async (data: IData) => {
    try {
      const result = await loginUser({
        variables: {
          email: data?.email,
          password: data?.password,
        },
      });
      const accessToken = result.data.loginUser.accessToken;
      setAccessToken(accessToken);
      router.push("./boards");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickHome={onClickHome}
      onClickSignup={onClickSignup}
      onClickLogin={onClickLogin}
    />
  );
};

export default Login;
