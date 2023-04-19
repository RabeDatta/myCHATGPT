export type contextType = {
  currentUser: currentUserType | null;
  login: (logindata: loginData) => Promise<string>;
  logout: () => Promise<void>;
};

type loginData = {
  email: string;
  password: string;
};

export type currentUserType = {
  id: string;
  username: string;
  email: string;
};
