import { addTodo, removeTodo, completeTodo } from "../../main"
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

const App: React.FC = () => {

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const todosNow = useSelector((state: any) => state.todosSlice.todosNow);
    const todosCompleted = useSelector((state: any) => state.todosSlice.todosCompleted);

    const getDate = () => {
        const date = new Date();
        const [year, month, day, hours, minutes] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    return (
        <>
            <div className="wrapper">
                <div className="form">
                    <input
                        type="text"
                        placeholder="Введите задачу..."
                        className="input"
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                    <button 
                        className="btn btn_add"
                        onClick={() => {
                            if(inputValue != ''){
                                dispatch(addTodo(inputValue));
                            }
                        }}
                    >Добавить</button>
                </div>
                <div className="todos">
                    <div className="todos__section">
                        <div className="todos__title">Текущие задачи</div>
                        <div className="todos__items">
                            {
                                todosNow.length ? todosNow.map((item: any, index: any) => (
                                    <div key={index} className="todo">
                                        <input
                                            type="checkbox"
                                            className="todo__checkbox"
                                            onChange={() => {
                                                const date = getDate();
                                                dispatch(completeTodo({
                                                    name: item,
                                                    date
                                                }))
                                            }}
                                        />
                                        <div className="todo__title">{item}</div>
                                        <button
                                            className="btn btn_remove"
                                            onClick={() => dispatch(removeTodo(index))}   
                                        >Удалить</button>
                                    </div>
                                )) : <div className="todos__empty">У вас нет текущих задач</div>
                            }
                        </div>
                    </div>
                    <div className="todos__section">
                        <div className="todos__title">Выполненые задачи</div>
                        <div className="todos__items">
                        {
                                todosCompleted.length ? todosCompleted.map((item: any, index: any) => (
                                    <div key={index} className="todo">
                                        <div className="todo__title">{item.name}</div>
                                        <div className="todo__datecomplete">Выполнено {item.date}</div>
                                    </div>
                                )) : <div className="todos__empty">У вас нет выполненых задач</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;