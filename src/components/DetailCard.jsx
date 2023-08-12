import ModalCustom from "./Modal.jsx";
import {Descriptions} from "antd";

const DetailCard = ({open, handleCancel, selected}) => {
    return (
        <ModalCustom
            title='Detail Card'
            open={open}
            handleCancel={handleCancel}
            styleDisplayOk={{ style: { display: 'none' } }}
        >
            <Descriptions bordered>
                <Descriptions.Item label="Title" span={3}>{selected?.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{selected?.description}</Descriptions.Item>
            </Descriptions>
        </ModalCustom>
    )
}
export default DetailCard
