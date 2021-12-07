interface Item {
    id: string
    parentId: string
}

// type TreeItem<T> =
//     | {
//           [P in keyof T]: T[P]
//       }
//     | {
//           children: Array<
//               | T
//               | {
//                     [P in keyof T]: T[P]
//                 }
//           >
//       }

export const generateTreeData = <T extends Item>(list: T[], parentId = '') => {
    return list.reduce<T[]>((acc, node) => {
        if (node.parentId !== parentId) return acc
        const children = list.filter((item) => item.parentId === parentId)
        acc.push({
            ...node,
            children: children.length ? generateTreeData(list, node.id) : []
        })
        return acc
    }, [])
}
