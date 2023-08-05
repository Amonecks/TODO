import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './styles/styles.scss'
import { configureStore, combineReducers, createSlice} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

type Todos = {
  todosNow: any[];
  todosCompleted: any[];
}

const local = localStorage.getItem('store');

const initialState: Todos = local ? JSON.parse(local) : {
  todosCompleted: [],
  todosNow: []
};

const todosSlice = createSlice({
  name: 'todosSlice',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todosNow.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todosNow.splice(action.payload);
    },
    completeTodo: (state, action) => {
      state.todosNow.splice(action.payload.name);
      state.todosCompleted.push({
        name: action.payload.name,
        date: action.payload.date
      });
    }
  }
});

export const { addTodo, removeTodo, completeTodo } = todosSlice.actions;

const rootReducer = combineReducers({
  todosSlice: todosSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState().todosSlice));
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
