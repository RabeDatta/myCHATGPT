export type contextType = {
  currentUser: currentUserType | null;
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  login: (logindata: loginData) => Promise<string>;
  logout: () => Promise<void>;
};

type loginData = {
  email: string;
  password: string;
};

export type currentUserType = {
  username: string;
  email: string;
};
