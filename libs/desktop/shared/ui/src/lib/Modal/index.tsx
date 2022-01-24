import { PropsWithChildren } from 'react'

import BaseModal, { ModalProps } from 'antd/es/modal'
import 'antd/es/modal/style/css'

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    children,
    ...props
}) => <BaseModal maskClosable={false} {...props} children={children} />

const ConfirmModal = BaseModal.confirm
const ErrorModal = BaseModal.error
const InfoModal = BaseModal.info
const SuccessModal = BaseModal.success
const WarningModal = BaseModal.warning

export {
    ConfirmModal,
    ErrorModal,
    InfoModal,
    SuccessModal,
    WarningModal,
    Modal
}
