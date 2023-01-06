import { createUploadLink } from "apollo-upload-client"; // 이미지 업로드 19강
import { useRecoilState } from "recoil";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache, // cache
  ApolloLink,
} from "@apollo/client";
import { AccessToken } from "../../../commons/store";

const ApolloSetting = (pr: any) => {
  const [accessToken] = useRecoilState(AccessToken);

  const uploadLink = createUploadLink({
    // 업로드에 관한 것을 특정 변수에 담아 ApolloClient에 연결하는 식으로 진행 => 설정을 확장하는 개념
    uri: "https://backend06.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]), // 여기가 배열인 이유는 추후에 다른 것들도 연결을 해줘야 하기 때문입니다.
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {/* 상위 파일에서 props를 날리지 않았는데 props로 받고 있습니다. 이것은 자동으로 받는 것입니다. */}
      {pr.children}
    </ApolloProvider>
  );
};

export default ApolloSetting;
