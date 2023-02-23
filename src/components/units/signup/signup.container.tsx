import SignupUI from "./signup.presenter";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { RecoilModal } from "../../../commons/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_USER } from "./signup.query";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { IData } from "./signup.types";

const schema = yup.object({
  email: yup.string().required("이메일은 필수 입력사항입니다."),
  password: yup.string().required("비밀번호는 필수 입력사항입니다. "),
  name: yup.string().required("이름은 필수 입력사항입니다."),
});

const Signup = () => {
  const router = useRouter();
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [, setModal] = useRecoilState(RecoilModal);
  const [createUser] = useMutation(CREATE_USER);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickCreateUser = async (data: IData) => {
    try {
      if (data?.password === data?.passwordCh) {
        await createUser({
          variables: {
            createUserInput: {
              email: data?.email,
              password: data?.password,
              name: data?.name,
            },
          },
        });
        setModal(true);
      } else {
        setErrPassword("비밀번호가 일치하지 않습니다.");
      }
    } catch (errors: any) {
      setErrEmail(errors.message);
      console.log("error", errors.message);
    }
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  return (
    <SignupUI
      errEmail={errEmail}
      errPassword={errPassword}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickCreateUser={onClickCreateUser}
      onClickLogin={onClickLogin}
    />
  );
};

export default Signup;
