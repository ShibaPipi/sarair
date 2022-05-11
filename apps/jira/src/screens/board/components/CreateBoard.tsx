import { FC, useState } from 'react'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useBoardCreate } from '../../../hooks/boards'
import { useProjectIdInRouteParams } from '../../../hooks/projects'

import { Input } from '@sarair/desktop/shared/ui'
import { ColumnContainer } from './ColumnContainer'

export const CreateBoard: FC = () => {
    const [name, setName] = useState('')

    const projectId = useProjectIdInRouteParams()
    const {
        methods: { create }
    } = useBoardCreate()
    const handleSubmit = useMemoizedFn(() => {
        create({ projectId, name }).then(() => setName(''))
    })

    return (
        <ColumnContainer>
            <Input
                size="large"
                placeholder="新建看板名称"
                onPressEnter={handleSubmit}
                value={name}
                onChange={({ target: { value } }) => setName(value)}
            />
        </ColumnContainer>
    )
}
