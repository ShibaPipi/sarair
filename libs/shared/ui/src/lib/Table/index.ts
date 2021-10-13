import Table, {
  ColumnProps as ColumnPropsType,
  TableProps as TablePropsType
} from 'antd/es/table'
import 'antd/es/table/style/css'

export type ColumnProps<T> = ColumnPropsType<T>
export type TableProps<T> = TablePropsType<T>
export { Table }
