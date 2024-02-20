import { useNavigate } from "@solidjs/router";
import axios, { AxiosError, AxiosStatic } from "axios";
import {
  ParentComponent,
  ParentProps,
  createContext,
  useContext,
} from "solid-js";
import { useMessage } from "../message/MessageContext";

type AxiosContextValue = { axios: AxiosStatic };

const AxiosContext = createContext<AxiosContextValue>({ axios });

export const AxiosProvider: ParentComponent = (props: ParentProps) => {
  const [, actions] = useMessage();
  const navigator = useNavigate();

  const token = localStorage.getItem("token");
  const auth = token ? `Bearer ${token}` : "";

  axios.defaults.headers.common.Authorization = auth;
  axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status >= 400 && err.response.status < 500) {
          if (err.response.status === 401) navigator("/login");
          actions.showMessage({ level: "warning", message: err.message });
        } else if (err.response.status >= 500) {
          actions.showMessage({ level: "danger", message: err.message });
        }
      }
    }
  );

  return (
    <AxiosContext.Provider value={{ axios }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export function useAxios() {
  return useContext(AxiosContext);
}
