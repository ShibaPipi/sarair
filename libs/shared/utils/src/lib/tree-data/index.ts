interface Item {
    id: string
    parentId: string
}

interface TreeItem extends Item {
    children: TreeItem[]
}

export const generateTreeData = (list: Item[], parentId = '') => {
    return list.reduce((acc, node) => {
        if (node.parentId !== parentId) {
            return acc
        }
        const children = list.filter((item) => item.parentId === parentId)
        acc.push({
            ...node,
            children: children.length ? generateTreeData(list, node.id) : []
        })
        return acc
    }, [] as TreeItem[])
}
