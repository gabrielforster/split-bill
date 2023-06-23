import { createContext, FC, useState } from "react";

type User = {
  username: string
  name: string
  email: string
  profileImage: string
}

export const AuthContext = createContext<{
  login: () => void,
  logout: () => void,
  isLoading: boolean,
  userToken: null | string,
}>({
    login: () => {},
    logout: () => {},
    isLoading: false,
    userToken: null,
});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState({
      username: "gabrielforster",
      name: "Gabriel Rocha",
      email: "rochafrgabriel@gmail.com",
      profileImage: "https://github.com/gabrielforster.png"
    });

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  async function login () {
    console.log("login");
    setUserToken("token");
    setIsLoading(false);
    console.log(userToken)
  }

  async function logout () {
    setUserToken(null);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      { children }
    </AuthContext.Provider>
  )
}
