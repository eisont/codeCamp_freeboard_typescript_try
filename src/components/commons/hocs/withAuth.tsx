import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  AccessTokenState,
  RecoilModal,
  restoreAccessTokenLoadable,
} from "../../../commons/store";

// {}, return 이 있지만 한 줄이라 생략
// @ts-ignore
const withAuth = (Component) => (props) => {
  const [accessToken] = useRecoilState(AccessTokenState);
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  const [, setModalClose] = useRecoilState(RecoilModal);

  useEffect(() => {
    if (!accessToken) {
      restoreAccessToken.toPromise().then((newAccessToken) => {
        if (!newAccessToken) {
          setModalClose(true);
        }
      });
    }
  }, []);

  return <Component {...props} />;
};

export default withAuth;
