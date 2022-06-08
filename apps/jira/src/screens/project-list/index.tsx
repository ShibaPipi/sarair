import { FC } from 'react'
import styled from '@emotion/styled'
import { useDebounce, useTitle } from 'ahooks'

import {
    useProjectList,
    useProjectDrawer,
    useProjectSearchParams
} from '../../hooks/projects'
import { useUserList } from '../../hooks/useUserList'

import { ButtonNoPadding, ErrorBox, SarairRow } from '@sarair/desktop/shared/ui'
import { SearchPanel } from './components/SearchPanel'
import { List } from './components/List'

export const ProjectListScreen: FC = () => {
    useTitle('项目列表', { restoreOnUnmount: true })

    const {
        methods: { showCreate, showEdit }
    } = useProjectDrawer()

    const [param, setParam] = useProjectSearchParams()
    const debouncedParam = useDebounce(param, { wait: 500 })
    const {
        list,
        isLoading,
        error,
        methods: { updatePin, remove }
    } = useProjectList(debouncedParam)

    const { list: users, isLoading: isUsersLoading } = useUserList()

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
                loading={isLoading || isUsersLoading}
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
    width: 100%;
`
