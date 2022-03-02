import React from 'react'
import styled from '@emotion/styled'

import { useDebounce } from '@sarair/shared/hooks'
import {
    useProjectList,
    useProjectDrawer,
    useProjectUrlState
} from '../../hooks/projects'
import { useUserList } from '../../hooks/useUserList'

import { ButtonNoPadding, ErrorBox, SarairRow } from '@sarair/desktop/shared/ui'
import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

export const ProjectListScreen: React.FC = () => {
    const {
        methods: { showCreate, showEdit }
    } = useProjectDrawer()

    const [param, setParam] = useProjectUrlState()
    const debouncedParam = useDebounce(param, { wait: 500 })
    const {
        list,
        isLoading,
        error,
        methods: { updatePin, remove }
    } = useProjectList(debouncedParam)

    const { list: users, loading: usersLoading } = useUserList()

    return (
        <Container>
            <SarairRow between>
                <h1>项目列表</h1>
                <ButtonNoPadding type="link" onClick={showCreate}>
                    创建项目
                </ButtonNoPadding>
            </SarairRow>
            <SearchPanel param={param} setParam={setParam} />
            <ErrorBox error={error} />
            <List
                dataSource={list}
                loading={isLoading || usersLoading}
                users={users}
                onPinChange={updatePin}
                showEdit={showEdit}
                remove={remove}
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
