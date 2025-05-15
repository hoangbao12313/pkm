import { getApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Alert } from "react-native";
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// Kiểu dữ liệu cho user
interface User {
  email: string;
  password: string;
  fullName: string;
}

interface State {
  userLogin: User | null;
  jobs: any[];
}

type Action =
  | { type: "USER_LOGIN"; value: User }
  | { type: "LOGOUT" };

const MyContext = createContext<[State, Dispatch<Action>] | undefined>(undefined);
MyContext.displayName = "My store";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT":
      return { ...state, userLogin: null };
    default:
      throw new Error("Action không tồn tại");
  }
};

interface ProviderProps {
  children: ReactNode;
}

const MyContextControllerProvider = ({ children }: ProviderProps) => {
  const initialState: State = {
    userLogin: null,
    jobs: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch] as [State, Dispatch<Action>], [controller]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContextProvider = (): [State, Dispatch<Action>] => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContextProvider phải đặt trong MyContextControllerProvider");
  }
  return context;
};

// Modular Firebase API usage
const app = getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const USERS = collection(db, "USERS");

// Tạo tài khoản mới
const createAccount = async (email: string, password: string, fullName: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert("Tạo tài khoản thành công với email: " + email);
    // set tài liệu
    await setDoc(doc(USERS, email), {
      email,
      password,
      fullName,
    });
  } catch (e: any) {
    console.log(e.message);
  }
};

// Đăng nhập
const login = async (dispatch: Dispatch<Action>, email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(USERS, email);
    // Lắng nghe snapshot
    onSnapshot(userDocRef, (u) => {
      if (u.exists()) {
        const data = u.data() as User;
        console.log("Đăng nhập thành công với: " + u.id);
        dispatch({ type: "USER_LOGIN", value: data });
      }
    });
  } catch (e) {
    Alert.alert("Sai email và mật khẩu");
  }
};

// Đăng xuất
const logout = async (dispatch: Dispatch<Action>) => {
  try {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  } catch (e) {
    console.log("Lỗi đăng xuất:", e);
  }
};

export {
  MyContextControllerProvider,
  useMyContextProvider,
  createAccount,
  login,
  logout,
};
