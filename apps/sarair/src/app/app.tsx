import React, { useCallback, useMemo, useState } from 'react'
import { intersection } from 'ramda'

import { Checkbox, Tree } from '@sarair/desktop/shared/ui'

interface Item {
    id: string
    key: string
    parentId: string
    name: string
}

interface IdMapResult {
    childrenIdsOfIdMap: Record<string, string[]>
    itemOfIdMap: Record<string, Item>
}

const list: Item[] = [
    {
        id: '1',
        key: '1',
        name: '高级 CFT1',
        parentId: '8'
    },
    {
        id: '2',
        key: '2',
        name: 'CFT',
        parentId: ''
    },
    {
        id: '3',
        key: '3',
        name: '普通 CFT2',
        parentId: '5'
    },
    {
        id: '4',
        key: '4',
        name: '普通 CFT1',
        parentId: '5'
    },
    {
        id: '5',
        key: '5',
        name: '普通 CFT',
        parentId: '2'
    },
    {
        id: '6',
        key: '6',
        name: '中级 CFT',
        parentId: '2'
    },
    {
        id: '7',
        key: '7',
        name: '高级 CFT2',
        parentId: '8'
    },
    {
        id: '8',
        key: '8',
        name: '高级 CFT',
        parentId: '2'
    },
    {
        id: '9',
        key: '9',
        name: '高级 CFT2+',
        parentId: '7'
    },
    {
        id: '10',
        key: '10',
        name: '高级 CFT3',
        parentId: '8'
    },
    {
        id: '12',
        key: '12',
        name: 'Initiated',
        parentId: ''
    },
    {
        id: '11',
        key: '11',
        name: '高级 CFT2++',
        parentId: '7'
    }
]
const getResult = (list: Item[]) => {
    return list.reduce<IdMapResult>(
        ({ childrenIdsOfIdMap, itemOfIdMap }, item) => {
            childrenIdsOfIdMap[item.parentId] = [
                ...(childrenIdsOfIdMap[item.parentId] || []),
                item.id
            ]
            itemOfIdMap[item.id] = item
            return {
                childrenIdsOfIdMap,
                itemOfIdMap
            }
        },
        { childrenIdsOfIdMap: {}, itemOfIdMap: {} }
    )
}

interface TreeItem {
    id: string
    key: string
    parentId: string
    name: string
    isRoot?: boolean
    values: Item[]
    children: TreeItem[]
}

const getChildrenIds = (
    id: string,
    childrenIdsOfIdMap: IdMapResult['childrenIdsOfIdMap']
): string[] => {
    return childrenIdsOfIdMap[id]?.reduce<string[]>((acc, childId) => {
        if (childrenIdsOfIdMap[childId]) {
            return [
                ...acc,
                childId,
                ...getChildrenIds(childId, childrenIdsOfIdMap)
            ]
        }
        return [...acc, childId]
    }, [])
}

const getParentIds = (
    id: string,
    itemOfIdMap: IdMapResult['itemOfIdMap']
): string[] => {
    const parentIds: string[] = []
    const parentId = itemOfIdMap[id]?.parentId
    if (itemOfIdMap[parentId]?.parentId) {
        return [...parentIds, parentId, ...getParentIds(parentId, itemOfIdMap)]
    }
    return [...parentIds, parentId]
}

const renderTreeData = (
    parentId: string,
    childrenIdsOfIdMap: IdMapResult['childrenIdsOfIdMap'],
    itemOfIdMap: IdMapResult['itemOfIdMap']
): Array<TreeItem> => {
    const childrenIds =
        childrenIdsOfIdMap[parentId]?.filter(
            (id) => !parentId || childrenIdsOfIdMap[id]
        ) || []
    return childrenIds.map((id) => {
        const item = itemOfIdMap[id]
        const values = childrenIdsOfIdMap[id]?.map((id) => itemOfIdMap[id])
        return {
            ...item,
            key: item.id,
            values,
            children: renderTreeData(id, childrenIdsOfIdMap, itemOfIdMap)
        }
    })
}

export function App() {
    const { childrenIdsOfIdMap, itemOfIdMap } = useMemo(() => {
        return getResult(list)
    }, [])

    const [expandedKeys, setExpandedKeys] = useState<Array<string | number>>([])
    const [tagIdsMap, setTagIdsMap] = useState<Record<string, boolean>>({})
    const tagIds = useMemo(() => {
        return Object.keys(tagIdsMap).filter((id) => tagIdsMap[id])
    }, [tagIdsMap])

    const treeData = useMemo(() => {
        const data = renderTreeData('', childrenIdsOfIdMap, itemOfIdMap)
        return data.reduce<TreeItem[]>((acc, curr) => {
            const node: TreeItem = {
                ...curr,
                key: `${curr.id}+`,
                isRoot: true,
                values: [{ ...curr }],
                children: childrenIdsOfIdMap[curr.id] ? [curr] : []
            }
            return [...acc, node]
        }, [])
    }, [childrenIdsOfIdMap, itemOfIdMap])

    const handleExpandNode = useCallback(
        (key: string) => setExpandedKeys((prevState) => [...prevState, key]),
        []
    )

    const changeSelfCheckState = useCallback(
        (id: string, checked: boolean) =>
            setTagIdsMap((prevState) => ({ ...prevState, [id]: checked })),
        []
    )

    const checkParentsById = useCallback(
        (id: string) =>
            setTagIdsMap((prevState) => ({
                ...prevState,
                ...getParentIds(id, itemOfIdMap)?.reduce(
                    (acc, id) => ({ ...acc, [id]: true }),
                    {}
                )
            })),
        [itemOfIdMap]
    )

    const uncheckChildrenById = useCallback(
        (id: string) => {
            setTagIdsMap((prevState) => ({
                ...prevState,
                ...getChildrenIds(id, childrenIdsOfIdMap)?.reduce(
                    (acc, id) => ({ ...acc, [id]: false }),
                    {}
                )
            }))
        },
        [childrenIdsOfIdMap]
    )

    const changeSiblingCheckState = useCallback(
        (id: string, checked: boolean, isUnlimited = true) => {
            if (!isUnlimited) {
                !checked &&
                    setTagIdsMap((prevState) => ({
                        ...prevState,
                        [itemOfIdMap[id].parentId]: true
                    }))
                return
            }
            // 选中不限
            checked && uncheckChildrenById(id)
            // 反选不限
            !checked &&
                setTagIdsMap((prevState) => ({
                    ...prevState,
                    [childrenIdsOfIdMap[id][0]]: true
                }))
            return
        },
        [childrenIdsOfIdMap, itemOfIdMap, uncheckChildrenById]
    )

    const handleTagValueChange = useCallback(
        (id: string, key: string, checked: boolean) => {
            checked && handleExpandNode(key)
            changeSelfCheckState(id, checked)
            checkParentsById(id)
            changeSiblingCheckState(id, checked, false)
            !checked && uncheckChildrenById(id)
        },
        [
            changeSelfCheckState,
            changeSiblingCheckState,
            checkParentsById,
            handleExpandNode,
            uncheckChildrenById
        ]
    )

    const handleUnlimitedTagValueChange = useCallback(
        (id: string, checked: boolean) => {
            changeSelfCheckState(id, checked)
            checkParentsById(id)
            changeSiblingCheckState(id, checked)
        },
        [changeSelfCheckState, changeSiblingCheckState, checkParentsById]
    )

    const handleRootTagValueChange = useCallback(
        (id: string, key: string, checked: boolean) => {
            checked && handleExpandNode(key)
            changeSelfCheckState(id, checked)
            !checked && uncheckChildrenById(id)
        },
        [changeSelfCheckState, handleExpandNode, uncheckChildrenById]
    )

    const renderChildren = useCallback(
        (treeData: TreeItem[]) => {
            return treeData.map((item) => {
                return (
                    <Tree.TreeNode
                        key={item.key}
                        title={
                            !item.isRoot ? (
                                <>
                                    <span>{item.name}: </span>
                                    <Checkbox
                                        checked={
                                            tagIds.includes(item.id) &&
                                            !intersection(
                                                childrenIdsOfIdMap[item.id],
                                                tagIds
                                            )?.length
                                        }
                                        onChange={({ target: { checked } }) =>
                                            handleUnlimitedTagValueChange(
                                                item.id,
                                                checked
                                            )
                                        }
                                    >
                                        {'不限'}
                                    </Checkbox>
                                    {item.values?.map((child) => {
                                        return (
                                            <Checkbox
                                                key={child.key}
                                                checked={tagIdsMap[child.id]}
                                                onChange={({
                                                    target: { checked }
                                                }) =>
                                                    handleTagValueChange(
                                                        child.id,
                                                        item.key,
                                                        checked
                                                    )
                                                }
                                            >
                                                {child.name}
                                            </Checkbox>
                                        )
                                    })}
                                </>
                            ) : (
                                <label>
                                    <span>{item.values[0].name}: </span>
                                    <Checkbox
                                        checked={
                                            tagIds.includes(item.id) ||
                                            (childrenIdsOfIdMap[item.id] &&
                                                !!intersection(
                                                    childrenIdsOfIdMap[item.id],
                                                    tagIds
                                                ).length)
                                        }
                                        onChange={({ target: { checked } }) =>
                                            handleRootTagValueChange(
                                                item.id,
                                                item.key,
                                                checked
                                            )
                                        }
                                    />
                                </label>
                            )
                        }
                    >
                        {renderChildren(item.children)}
                    </Tree.TreeNode>
                )
            })
        },
        [
            childrenIdsOfIdMap,
            handleRootTagValueChange,
            handleTagValueChange,
            handleUnlimitedTagValueChange,
            tagIds,
            tagIdsMap
        ]
    )

    return (
        <div>
            <Tree
                defaultExpandAll
                expandedKeys={expandedKeys}
                onExpand={setExpandedKeys}
                showLine={{ showLeafIcon: false }}
                selectable={false}
            >
                {renderChildren(treeData)}
            </Tree>
        </div>
    )
}

export default App
