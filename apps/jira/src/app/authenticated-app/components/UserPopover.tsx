import { FC } from 'react'

import { useUserList } from '../../../hooks/useUserList'

import {
    List,
    ListItem,
    ListItemMeta,
    Popover,
    TypographyText
} from '@sarair/desktop/shared/ui'
import { PopoverContentContainer } from '../../../components'

export const UserPopover: FC = () => {
    const { list } = useUserList()

    return (
        <Popover
            placement="bottom"
            content={
                <PopoverContentContainer>
                    <TypographyText type="secondary">组员列表</TypographyText>
                    <List>
                        {list.map(({ id, name }) => (
                            <ListItem key={id}>
                                <ListItemMeta title={name}></ListItemMeta>
                            </ListItem>
                        ))}
                    </List>
                </PopoverContentContainer>
            }
        >
            <span>组员</span>
        </Popover>
    )
}
