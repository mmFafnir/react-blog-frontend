import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export enum ModalEnum {
    CREATE_TAG = 'create_tag',
    UPDATE_POST = 'update_post',
    USER_UPDATE = 'form_update'
}

interface IActionPayload {
    modalName: ModalEnum,
    context?: any
}

interface IState {
    modalOpen: boolean,
    modal: {
        modalName: ModalEnum|null,
        context?: any
    }
}

const initialState:IState = {
    modalOpen: false,
    modal: {
        modalName: null
    } 
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.modalOpen = false;
            state.modal.modalName = null;
        }, 

        modalOpen: (state, action: PayloadAction<IActionPayload>) => {
            state.modalOpen = true;
            state.modal.modalName = action.payload.modalName;
            if(action.payload.context) {
                state.modal.context = action.payload.context;
            }
        }
    }
})


export const {closeModal, modalOpen} = modalSlice.actions;

export default modalSlice.reducer;