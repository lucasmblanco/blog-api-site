import { createContext, useReducer } from 'react';

interface StateType {
  likes: any[];
};

interface ActionType {
  type: 'CONTENT_LIKES';
  payload: {
    likes: any[];
  };
}


const INITIAL_STATE: StateType = {
  likes: []
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
      case 'CONTENT_LIKES': 
          return {
            likes: action.payload?.likes
          }
    default:
      return state;
  }
};