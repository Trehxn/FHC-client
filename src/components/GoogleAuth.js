import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
  const authStatus = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    if (auth.isDetermined === false) {
      window.gapi.load("client:auth2", () => {
        dispatch(signIn());
        window.gapi.client
          .init({
            clientId:
              "767468479266-pqtk42nlivkiboecdravhi8jgbf51q8m.apps.googleusercontent.com",
            scope: "email",
          })
          .then(() => {
            authStatus.current = window.gapi.auth2.getAuthInstance();
            onAuthChange(authStatus.current.isSignedIn.get());
            authStatus.current.isSignedIn.listen(onAuthChange);
          });
      });

      const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
          dispatch(signIn(authStatus.current.currentUser.get().getId()));
        } else {
          dispatch(signOut());
        }
      };
    }
  }, [isSignedIn, auth.isDetermined, dispatch]);

  const onSignInClick = () => {
    authStatus.current.signIn();
  };

  const onSignOutClick = () => {
    authStatus.current.signOut();
  };

  const renderAuthButton = () => {
    if (auth.loading && !auth.isDetermined) {
      return (
        <button className="sign-in-button btn float-right">Logging In</button>
      );
    } else if (auth.isDetermined && auth.isSignedIn) {
      return (
        <button
          onClick={onSignOutClick}
          className="sign-in-button btn float-right"
        >
          Sign Out
        </button>
      );
    } else if (auth.isDetermined && !auth.isSignedIn) {
      return (
        <button
          onClick={onSignInClick}
          className="sign-in-button btn float-right"
        >
          Sign In with<i className="fab fa-google"></i>
        </button>
      );
    }
  };

  return <>{renderAuthButton()}</>;
};

export default GoogleAuth;
