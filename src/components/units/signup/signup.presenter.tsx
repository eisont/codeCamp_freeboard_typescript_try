// Signup Presenter

import { ISignupUI } from "../../../../path/to/types/components/units/types";
import { Closesvg } from "../../../commons/styles/Iconsvg";
import LoginModal from "../../commons/layout/loginmodal";
import * as S from "./signup.styles";

const SignupUI = (pr: ISignupUI) => {
  return (
    <S.Wrapper>
      <LoginModal Title="회원가입을 축하합니다!" />
      <S.BackBt onClick={pr.onClickLogin}>
        <Closesvg width="22" height="22" fill="#fff" />
      </S.BackBt>
      <S.Contents>
        <S.Title>회원가입</S.Title>
        <form onSubmit={pr.handleSubmit(pr.onClickCreateUser)}>
          <S.Section>
            <S.InputTitle>이메일</S.InputTitle>
            <S.InputBox>
              <S.Input
                type="email"
                placeholder="이메일을 입력하세요."
                {...pr.register("email")}
              />
              <S.Errors>
                {String(pr.formState?.errors?.email?.message)}
              </S.Errors>
            </S.InputBox>
            <S.InputTitle>이름</S.InputTitle>
            <S.InputBox>
              <S.Input
                type="name"
                placeholder="이름을 입력하세요."
                {...pr.register("name")}
              />
              <S.Errors>{String(pr.formState?.errors?.name?.message)}</S.Errors>
            </S.InputBox>
            <S.InputTitle>비밀번호</S.InputTitle>
            <S.InputBox>
              <S.Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                {...pr.register("password")}
              />
              <S.Errors>
                {String(pr.formState?.errors?.password?.message)}
              </S.Errors>
            </S.InputBox>
            <S.InputTitle>비밀번호 확인</S.InputTitle>
            <S.InputBox>
              <S.Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                {...pr.register("passwordCh")}
              />
              <S.Errors>
                {String(pr.formState?.errors?.password?.message)}
              </S.Errors>
            </S.InputBox>
          </S.Section>

          <S.Button type="submit">회원가입하기</S.Button>
        </form>
      </S.Contents>
    </S.Wrapper>
  );
};

export default SignupUI;
