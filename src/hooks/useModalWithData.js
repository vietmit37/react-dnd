import {useState} from "react";

export const useModalWithData  = (
    initialMode = false,
    initialSelected = null
) => {
    const [modalOpen, setModalOpen] = useState(initialMode)
    const [selected, setSelected] = useState(initialSelected)
    const setModalState = state => {
        setModalOpen(state)
        if (state === false) {
            setSelected(null)
        }
    }
    return { modalOpen, setModalOpen, selected, setSelected, setModalState }
}
