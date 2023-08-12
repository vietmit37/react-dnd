import React from  'react'
import CardCustom from "./CardCustom.jsx";
import {Button, Card, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useModalWithData} from "../hooks/useModalWithData.js";
import FormCard from "./FormCard.jsx";
import {useTrelloContext} from "../contexts/trello.context.jsx";

const ListCards = ({ index, listItem, cards }) => {
    const {
        modalOpen,
        setModalState
    } = useModalWithData()
    const {handleDeleteList} = useTrelloContext()
    return (
        <>
            <Draggable draggableId={String(listItem.id)} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='todoList'
                    >
                        <Card title={listItem.title}
                              className="cardList"
                              extra={
                            <>
                                <Tooltip title="Add a card">
                                    <Button shape="circle" icon={<PlusOutlined />} onClick={() => {
                                        setModalState(true)
                                    }} />
                                </Tooltip>
                                <Popconfirm
                                    title="Delete the list"
                                    description="Are you sure to delete this list?"
                                    onConfirm={() => {
                                        handleDeleteList(listItem)
                                    }}
                                    onCancel={() => {}}
                                    okText="Yes"
                                    cancelText="No"
                                    className="ml-10"
                                >
                                    <Tooltip title="Delete this list">
                                        <Button shape="circle" icon={<DeleteOutlined />} />
                                    </Tooltip>
                                </Popconfirm>
                            </>
                        }
                        >
                            <Droppable droppableId={String(listItem.id)} type="CARD">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {cards.map((card, cardIndex) => (
                                            <CardCustom
                                                key={card.id}
                                                index={cardIndex}
                                                card={card}
                                            />
                                        ))}
                                        {provided.placeholder}
                                </div>
                                )}
                            </Droppable>
                        </Card>

                    </div>
                )}
            </Draggable>
            <FormCard open={modalOpen} handleCancel={()=> setModalState(false)} selected={listItem}/>
        </>
    )
}
export default ListCards
