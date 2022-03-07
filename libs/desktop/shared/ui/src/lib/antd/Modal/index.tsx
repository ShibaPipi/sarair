import { PropsWithChildren } from 'react'

import BaseModal, { ModalProps } from 'antd/es/modal'
import 'antd/es/modal/style/css'

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    children,
    ...props
}) => <BaseModal maskClosable={false} {...props} children={children} />

const confirmModal = BaseModal.confirm
const errorModal = BaseModal.error
const infoModal = BaseModal.info
const successModal = BaseModal.success
const warningModal = BaseModal.warning

export {
    confirmModal,
    errorModal,
    infoModal,
    successModal,
    warningModal,
    Modal
}
