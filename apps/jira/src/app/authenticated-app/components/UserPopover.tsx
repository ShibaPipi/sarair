import { FC } from 'react'

import { useUserList } from '../../../hooks/useUserList'

import { List, Popover, Typography } from 'antd'
import { PopoverContentContainer } from '../../../components'

export const UserPopover: FC = () => {
    const { list } = useUserList()

    return (
        <Popover
            placement="bottom"
            content={
                <PopoverContentContainer>
                    <Typography.Text type="secondary">组员列表</Typography.Text>
                    <List>
                        {list.map(({ id, name }) => (
                            <List.Item key={id}>
                                <List.Item.Meta title={name}></List.Item.Meta>
                            </List.Item>
                        ))}
                    </List>
                </PopoverContentContainer>
            }
        >
            <span>组员</span>
        </Popover>
    )
}
