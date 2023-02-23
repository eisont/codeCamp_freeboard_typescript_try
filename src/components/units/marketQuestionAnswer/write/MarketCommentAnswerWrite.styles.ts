// 중고마켓 댓글 등록 styles

import styled from "@emotion/styled";
import { QuestionOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

export const PencilIcon = styled(QuestionOutlined)`
  font-size: 25px;
  color: #ffd600;
  margin: 20px 14px;
`;

export const ContentsWrapper = styled.div`
  border: 1px solid lightgray;
`;

export const Contents = styled.textarea`
  width: 100%;
  min-height: 108px;
  padding: 20px;
  border: none;
  border-bottom: 1px solid lightgray;
`;

export const BottomWrapper = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentsLength = styled.div`
  width: 100%;
  height: 51px;
  line-height: 51px;
  padding-left: 20px;
  color: gray;
`;

export const Button = styled.button`
  margin: 0 0 0 5px;
  width: 91px;
  height: 51px;
  background-color: black;
  border-radius: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background: #dbdbdb;
    color: #000;
    font-weight: 900;
  }
`;
