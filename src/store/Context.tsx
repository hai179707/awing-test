import { createContext, useReducer } from "react";
import reducer from "./reducer";

export interface ViewsType {
  id: number;
  template: number;
  values?: 
    {
      name: string;
      value: string;
      valid: boolean;
    }[]
  
}

export interface InitStateType {
  step: number;
  formInputValues: {
    name: {
      value: string;
      valid: boolean;
    };
    title: {
      value: string;
      valid: boolean;
    };
  };
  views: ViewsType[];
  currentView: number;
}

const initState = {
  step: 0,
  formInputValues: {
    name: {
      value: '',
      valid: true
    },
    title: {
      value: '',
      valid: true
    },
  },
  views: [
    {
      id: 0,
      template: 0
    }
  ],
  currentView: 0
};

const AppContext = createContext<{
  state: InitStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initState,
  dispatch: () => null,
});

function AppProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
