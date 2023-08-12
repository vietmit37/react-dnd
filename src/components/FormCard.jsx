import ModalCustom from "./Modal.jsx";
import {Form, Input} from "antd";
import {v4 as uuidv4} from "uuid";
import {useTrelloContext} from "../contexts/trello.context.jsx";

const { TextArea } = Input;
const FormCard = ({open, handleCancel, selected}) => {
    const [form] = Form.useForm();
    const {handleAddCard} = useTrelloContext()
    const handleSubmit = async (values) => {
        try{
            const newValues= {
                ...values,
                id: uuidv4()
            }
            await handleAddCard(newValues, selected)
            console.log(selected)
            form.setFieldValue('title', '')
            form.setFieldValue('description', '')
            handleCancel()
        }catch (err){
            return err;
        }

    };
    return (
        <ModalCustom
            title='Add Card'
            open={open}
            handleCancel={handleCancel}
            selected={selected}
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
export default FormCard
