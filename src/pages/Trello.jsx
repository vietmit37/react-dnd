import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import React from "react";
import ListCards from "../components/ListCards.jsx";
import {useTrelloContext} from "../contexts/trello.context.jsx";
import FormList from "../components/FormList.jsx";
import {useModalWithData} from "../hooks/useModalWithData.js";
const Trello = () => {
    const {todos, handleDndCard} = useTrelloContext()
    const {
        modalOpen,
        setModalState,
        setSelected,
        selected
    } = useModalWithData()
    const onDragEnd = (result) => {
        console.log('onDragEnd',result)
        const {destination, type, source} = result
        console.log(type)
        // the only one that is required
        if(!destination) {
            alert('Not happend!');


            return
        }
        if(type === 'LIST'){
            if(source.droppableId === destination.droppableId){
                const listColumn = todos.columns.splice(source.index, 1)[0];
                todos.columns.splice(destination.index, 0, listColumn)
                console.log(listColumn)
            }
            return;
        }

        if(type === 'CARD'){
            if(source.droppableId !== destination.droppableId){
                const listIdSource = source.droppableId;
                const listItemSource = todos.lists[listIdSource];
                const cardsSource = listItemSource.cards;
                const removeCard= cardsSource.splice(source.index,1)[0];

                const listIdDes = destination.droppableId;
                const listItemDes = todos.lists[listIdDes];
                const cardsDes = listItemDes.cards;
                cardsDes.splice(destination.index,0 , removeCard);
                handleDndCard()
            }
        }

        if(source.droppableId === destination.droppableId) {
            {/* Moving */}
            // const listId = destination.droppableId;
            // const listItem = todos.lists[listId];
            // const cardItem= listItem.cards.splice(source.index, 1)[0];
            // listItem.cards.splice(destination.index, 0, cardItem)
            // setTodos(prevState => ({
            //     ...prevState,
            //     lists: {
            //         ...prevState.lists,
            //         [listId]: {
            //             ...prevState.lists[listId],
            //             cards: listItem.cards
            //         }
            //     }
            // }))
            {/* Swap */}
            const listId = destination.droppableId;
            const listItem = todos.lists[listId];
            const cards = listItem.cards;
            [cards[source.index], cards[destination.index]] = [cards[destination.index], cards[source.index]];
            handleDndCard()
            return;
        }

    };
    return (
            <div className= 'container'>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <Droppable droppableId="droppable" direction='horizontal' type="LIST">
                        {(provided, snapshot) =>
                            (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='listContainer'
                                >

                                    {todos?.columns?.map((listId,listIndex)=>{
                                        const listItem = todos.lists[listId];
                                        const cards = listItem.cards.map(cardId => todos.cards[cardId]);
                                        return (
                                            <ListCards
                                                key={listItem.id}
                                                index={listIndex}
                                                listItem={listItem}
                                                cards={cards}
                                            />
                                        )
                                    })}
                                    {provided.placeholder}
                                    <Button type="text" danger icon={<PlusOutlined />} onClick={() => {
                                        setModalState(true)
                                    }}>
                                        Add another list
                                    </Button>
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
                <FormList open={modalOpen} handleCancel={()=> setModalState(false)}/>
            </div>
    )
}

export default Trello
