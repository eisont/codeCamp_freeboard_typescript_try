import styled from "@emotion/styled";
import { IPagination01UIStyle } from "../../../../../path/to/types/components/commons/types";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Page = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: ${(props: IPagination01UIStyle) =>
    props.isActive ? "#ffd600" : "#4f4f4f"};
  font-weight: ${(props: IPagination01UIStyle) =>
    props.isActive ? "700" : "400"};
  cursor: ${(props: IPagination01UIStyle) =>
    props.isActive ? "default" : "pointer"};
  border-bottom: ${(props: IPagination01UIStyle) =>
    props.isActive ? "1px solid #ffd600" : ""};
  transform: ${(props: IPagination01UIStyle) => props.rotate};
`;

export const Img = styled.img`
  width: 7.41px;
`;
