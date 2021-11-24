type Id = string | number

interface OriginData {
  id: Id
  parentId: Id

  [extraProps: string]: unknown
}

interface TreeData extends OriginData {
  children: TreeData[]
}

export const buildTree = <T extends OriginData>(data: T[]): TreeData[] => {
  const nodeData = data.map((item) => ({ ...item, children: [] }))
  const rootNodes = getRootNodes(nodeData)
  return rootNodes.map((rootData) => ({
    ...rootData,
    children: buildChildren(rootData, nodeData)
  }))
}

const buildChildren = (node: TreeData, data: TreeData[]): TreeData[] => {
  const children = getChildNodes(node, data)
  if (children.length) {
    children.forEach((child) => {
      buildChildren(child, data)
    })
    node.children = children
  }
  return children
}

const getChildNodes = (node: TreeData, data: TreeData[]) => {
  return data.filter(({ parentId }) => parentId === node.id)
}

const getRootNodes = <T extends OriginData>(data: T[]) => {
  return data.filter(({ parentId }) => idIsRoot(parentId))
}

const idIsRoot = (id: unknown) => id === 0 || id === ''
