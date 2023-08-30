import { FC } from 'react';
import Modal from '../../components/Modal';

import { ModalEnum } from '../../store/Slices/modalSlice';
import { useLocation } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import FormTags from '../../components/FormTags';
import FormUpdatePost from '../../components/FormUpdate/FormUpdatePost';
import FormUpdateUser from '../../components/FormUpdate/FormUpdateUser';




const ModalLayout:FC = () => {
    const {modal} = useTypeSelector(state => state.modal);
    const location = useLocation();
    return (
        <>
            {
                modal.modalName === ModalEnum.CREATE_TAG ? (
                    <Modal children={<FormTags />}/>
                ) : modal.modalName === ModalEnum.UPDATE_POST ? (
                    <Modal children={<FormUpdatePost />}/>
                ) : modal.modalName === ModalEnum.USER_UPDATE ? (
                    <Modal children={<FormUpdateUser />}/>
                ) : null
            }
        </>
    );
};

export default ModalLayout;