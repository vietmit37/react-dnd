import { Modal } from "antd";
const ModalCustom = ({open, handleCancel, children, styleDisplayOk, title, handleOk}) => {
    return(
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                okButtonProps={styleDisplayOk}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
    )
}
export default ModalCustom
