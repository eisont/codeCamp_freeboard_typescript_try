import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  AccessTokenState,
  RecoilLoginModal,
  restoreAccessTokenLoadable,
} from "../../../commons/store";

// {}, return 이 있지만 한 줄이라 생략
const withAuth = (Component) => (props) => {
  const [accessToken] = useRecoilState(AccessTokenState);
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  const [, setModalClose] = useRecoilState(RecoilLoginModal);

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
