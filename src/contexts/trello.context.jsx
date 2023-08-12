import {createContext, useContext, useEffect, useReducer} from "react";
import {addCard, changeTodos, deleteCard, dndCard, initialState, reducer} from "../reducers/trello.reducer.js";
import {data} from "../mock/data.js";
// reducer


export const TrelloContext = createContext();
export const TrelloProvider= ({children}) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);

    const handleDndCard = () => {
        dispatch(dndCard())
    }

    const handleAddList = (list) => {
        todos.columns.push(list.id)
        todos.lists[list.id]=list
        dispatch(changeTodos())
    }

    const handleDeleteList = (list) => {
        delete todos.lists[list.id]
        const index = todos.columns.indexOf(list.id);
        if (index !== -1) {
            todos.columns.splice(index, 1);
        }
        dispatch(changeTodos())
    }

    const handleAddCard = (dataForm, listItem) => {
       todos.lists[listItem.id].cards.push(dataForm.id);
       todos.cards[dataForm.id] = dataForm;
       dispatch(changeTodos())
    }

    const handleDeleteCard =  (card) => {
        delete todos.cards[card.id]
        Object.values(todos.lists).forEach(list => {
            const index = list.cards.indexOf(card.id);
            if (index !== -1) {
              list.cards.splice(index, 1);
            }
        });
        dispatch(changeTodos())
    }

    const handleUpdateCard = (card) => {
        todos.cards[card.id] = card;
        dispatch(changeTodos())
    }
    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(todos));
    }, [Object.values(todos || todos.lists)]);
    return (
        <TrelloContext.Provider
            value={{
                todos,
                //action
                handleAddList,
                handleDndCard,
                handleAddCard,
                handleDeleteCard,
                handleUpdateCard,
                handleDeleteList
            }}
        >
            {children}
        </TrelloContext.Provider>
    )
}
export const useTrelloContext= () => useContext(TrelloContext)
