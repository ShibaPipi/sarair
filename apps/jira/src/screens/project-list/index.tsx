import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import { useDebounce } from '@sarair/shared/hooks'
import { useProjectList } from '../../hooks/useProjectList'
import { useUserList } from '../../hooks/useUserList'
import { useProjectUrlState } from '../../hooks/useProjectUrlState'
import { showProjectDrawer } from '../../store/project.slice'

import {
    ButtonNoPadding,
    SarairRow,
    Typography
} from '@sarair/desktop/shared/ui'
import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

export const ProjectListScreen: React.FC = () => {
    const dispatch = useDispatch()

    const [param, setParam] = useProjectUrlState()
    const debouncedParam = useDebounce(param, { wait: 500 })
    const {
        list,
        loading,
        error,
        methods: { updatePin }
    } = useProjectList(debouncedParam)

    const { list: users, loading: usersLoading } = useUserList()

    return (
        <Container>
            <SarairRow between>
                <h1>项目列表</h1>
                <ButtonNoPadding
                    type="link"
                    onClick={() => dispatch(showProjectDrawer())}
                >
                    创建项目
                </ButtonNoPadding>
            </SarairRow>
            <SearchPanel param={param} setParam={setParam} />
            {error ? (
                <Typography.Text type="danger">{error.message}</Typography.Text>
            ) : null}
            <List
                dataSource={list}
                loading={loading || usersLoading}
                users={users}
                onPinChange={updatePin}
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
