export const signIn = (user) => {
  return {
    type: "SIGN_IN_START",
  };
  if (user) {
    return {
      type: "SIGN_IN_SUCCESS",
      payload: user,
    };
  }
  return {
    type: "SIGN_IN_ERROR",
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
