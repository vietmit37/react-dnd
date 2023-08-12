import React, {useState} from 'react'
import {Avatar, Card, Popconfirm, Tooltip} from "antd";
import {
    AntDesignOutlined, DeleteOutlined,
    EditOutlined,
    FileTextOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Draggable} from "react-beautiful-dnd";
import {useTrelloContext} from "../contexts/trello.context.jsx";
import {useModalWithData} from "../hooks/useModalWithData.js";
import FormEditCard from "./FormEditCard.jsx";
import DetailCard from "./DetailCard.jsx";

const { Meta } = Card;

const CardCustom = ({ card, index }) => {
    const {handleDeleteCard} = useTrelloContext()
    const [openDetail, setOpenDetail] = useState(false)
    const {
        modalOpen,
        setModalState,
        setSelected,
        selected
    } = useModalWithData()
    return (
        <>
            <Draggable
                draggableId={String(card.id)}
                index={index}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='card'
                    >
                        <Card
                            className="cardItem"
                            cover={
                                <img
                                    alt="example"
                                    src="https://picsum.photos/265/160"
                                />
                            }
                            actions={[
                                <Tooltip title="View">
                                    <FileTextOutlined key="view" onClick={() => {
                                        setOpenDetail(true)
                                        setSelected(card)
                                    }} />
                                </Tooltip>,
                                <Tooltip title="Edit">
                                    <EditOutlined key="edit" onClick={() => {
                                        setSelected(card)
                                        setModalState(true)
                                    }} />
                                </Tooltip>,
                                <Popconfirm
                                    title="Delete the card"
                                    description="Are you sure to delete this card?"
                                    onConfirm={() => {
                                        handleDeleteCard(card)
                                    }}
                                    onCancel={() => {}}
                                    okText="Yes"
                                    cancelText="No"
                                    className="ml-10"
                                >
                                    <Tooltip title="Delete">
                                        <DeleteOutlined key="ellipsis" onClick={() => {
                                        }}/>
                                    </Tooltip>
                                </Popconfirm>
                            ]}
                        >
                            <Meta
                                title={card.title}
                                description={
                                    <>
                                        <div>{card.description}</div>
                                        <Avatar.Group
                                            maxCount={2}
                                            maxPopoverTrigger="click"
                                            size="large"
                                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                            className="avatarGroup"
                                        >
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                            <Tooltip title="Ant User" placement="top">
                                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            </Tooltip>
                                            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                                        </Avatar.Group>

                                    </>
                                }
                            />
                        </Card>
                    </div>
                )}
            </Draggable>
            <FormEditCard open={modalOpen} handleCancel={()=> setModalState(false)} selected={selected}/>
            <DetailCard open={openDetail} handleCancel={()=> setOpenDetail(false)} selected={selected}/>
        </>

    )
}
export default CardCustom
