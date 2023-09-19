import { createContext, useReducer } from 'react';

interface StateType {
  likesCount: string;
  status: boolean;
};

interface ActionType {
  type: 'UPDATE_LIKES';
  payload: {
    count: string;
    status: boolean;
  };
}


const INITIAL_STATE: StateType = {
  likesCount: '0',
  status: false
};

export const LikesContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

export const LikesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
    reducer,
    INITIAL_STATE
  );
    
  return (
    <LikesContext.Provider value={{ state, dispatch }}>
      {children}
    </LikesContext.Provider>
  );
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
      case 'UPDATE_LIKES': 
          return {
            likesCount: action.payload?.count,
            status: action.payload?.status
          }
    default:
      return state;
  }
};