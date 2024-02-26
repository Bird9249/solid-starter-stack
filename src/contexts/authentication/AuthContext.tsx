import {
  ParentComponent,
  ParentProps,
  createContext,
  onMount,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import getAuthApi from "./get-auth.api";

type AuthContextState = {
  data?: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  };
  loading: boolean;
};

type AuthContextValue = [
  AuthContextState,
  SetStoreFunction<AuthContextState> | undefined
];

const AuthContext = createContext<AuthContextValue>([
  {
    data: undefined,
    loading: false,
  },
  undefined,
]);

export const AuthProvider: ParentComponent = (props: ParentProps) => {
  const [auth, setAuth] = createStore<AuthContextState>({
    data: undefined,
    loading: false,
  });

  onMount(async () => {
    setAuth("loading", true);

    const res = await getAuthApi();

    setAuth("data", res.data);

    setAuth("loading", false);
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
