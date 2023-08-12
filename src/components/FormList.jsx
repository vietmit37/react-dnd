import ModalCustom from "./Modal.jsx";
import {Form, Input} from "antd";
import {v4 as uuidv4} from "uuid";
import {useTrelloContext} from "../contexts/trello.context.jsx";

const FormList = ({open, handleCancel}) => {
    const [form] = Form.useForm();
    const {handleAddList} = useTrelloContext()
    const handleSubmit =(values) => {
        const newValues= {
            ...values,
            id: uuidv4(),
            cards:[]
        }
        handleAddList(newValues)
        form.setFieldValue('title', '')
        handleCancel()
    }
    return (
        <ModalCustom
            title='Add List'
            open={open}
            handleCancel={handleCancel}
            // selected={selected}
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </ModalCustom>
    )
}
export default FormList
