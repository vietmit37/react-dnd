import ModalCustom from "./Modal.jsx";
import {Form, Input} from "antd";
import {useEffect} from "react";
import {useTrelloContext} from "../contexts/trello.context.jsx";

const { TextArea } = Input;
const FormEditCard = ({open, handleCancel, selected}) => {
    const [form] = Form.useForm();
    const {handleUpdateCard} = useTrelloContext()

    const handleSubmit = (values) => {
        handleUpdateCard(values)
        handleCancel()
    }
    useEffect(() => {
        form.setFieldValue('title', selected?.title)
        form.setFieldValue('description', selected?.description)
        form.setFieldValue('id', selected?.id)
    }, [selected]);
    return(
        <ModalCustom
            title='Edit Card'
            open={open}
            handleCancel={handleCancel}
            handleOk={form.submit}
        >
            <Form
                form={form}
                initialValues={{ status: 'new' }}
                onFinish={handleSubmit}
                autoComplete="off"
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                wrapperCol={{ flex: 1 }}
            >
                <Form.Item
                    label="Id"
                    name="id"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </ModalCustom>
    )
}

export default FormEditCard
