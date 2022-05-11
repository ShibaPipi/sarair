import { FC } from 'react'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useTaskSearchParams } from '../../../hooks/tasks'

import { Button, Input, SarairRow } from '@sarair/desktop/shared/ui'
import { TaskTypeSelector, UserSelector } from '../../../features'

export const SearchPanel: FC = () => {
    const [{ name, typeId, processorId }, setUrlState] = useTaskSearchParams()
    const reset = useMemoizedFn(() =>
        setUrlState({
            name: undefined,
            typeId: undefined,
            processorId: undefined
        })
    )

    return (
        <SarairRow marginBottom={4} gap>
            <Input
                style={{ width: '20rem' }}
                placeholder="任务名"
                value={name}
                onChange={({ target: { value } }) =>
                    setUrlState({ name: value })
                }
            />
            <UserSelector
                defaultOptionLabel="经办人"
                value={processorId}
                onChange={value => setUrlState({ processorId: value })}
            />
            <TaskTypeSelector
                defaultOptionLabel="类型"
                value={typeId}
                onChange={value => setUrlState({ typeId: value })}
            />
            <Button onClick={reset}>重置</Button>
        </SarairRow>
    )
}
