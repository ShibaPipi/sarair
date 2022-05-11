import { ComponentProps, FC } from 'react'

import { useUserList } from '../../hooks/useUserList'

import { IdSelector } from '@sarair/desktop/shared/ui'

type UserSelectorProps = ComponentProps<typeof IdSelector>

export const UserSelector: FC<UserSelectorProps> = ({ ...props }) => {
    const { list } = useUserList()

    return <IdSelector options={list} {...props} />
}
