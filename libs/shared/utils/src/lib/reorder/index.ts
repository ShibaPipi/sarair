/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = <TData extends { id: number }>({
    fromId,
    type,
    referenceId,
    list
}: {
    list: TData[]
    fromId: number
    type: 'after' | 'before'
    referenceId: number
}) => {
    const copiedList = [...list]
    // 找到fromId对应项目的下标
    const movingItemIndex = copiedList.findIndex(item => item.id === fromId)
    if (!referenceId) {
        return insertAfter(
            [...copiedList],
            movingItemIndex,
            copiedList.length - 1
        )
    }
    const targetIndex = copiedList.findIndex(item => item.id === referenceId)
    return (type === 'after' ? insertAfter : insertBefore)(
        [...copiedList],
        movingItemIndex,
        targetIndex
    )
}

/**
 * 在list中，把from放在to的前边
 * @param list
 * @param from
 * @param to
 */
const insertBefore = <TData = unknown>(
    list: TData[],
    from: number,
    to: number
) => {
    const toItem = list[to]
    const removedItem = list.splice(from, 1)[0]
    const toIndex = list.indexOf(toItem)
    list.splice(toIndex, 0, removedItem)
    return list
}

/**
 * 在list中，把from放在to的后面
 * @param list
 * @param from
 * @param to
 */
const insertAfter = <TData = unknown>(
    list: TData[],
    from: number,
    to: number
) => {
    const toItem = list[to]
    const removedItem = list.splice(from, 1)[0]
    const toIndex = list.indexOf(toItem)
    list.splice(toIndex + 1, 0, removedItem)
    return list
}
