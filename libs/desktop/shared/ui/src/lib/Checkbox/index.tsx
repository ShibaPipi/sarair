import React, { useMemo, useCallback } from 'react'
import Checkbox from 'antd/es/checkbox'
import { CheckboxGroupProps } from 'antd/es/checkbox/Group'
import 'antd/es/checkbox/style/css'
export { Checkbox }

type StringCheckboxGroupProps = Omit<
    CheckboxGroupProps,
    'value' | 'onChange'
> & {
    value?: string
    onChange?: (v: string) => void
}
// export const StringCheckboxGroup: React.FC<StringCheckboxGroupProps> = ({
//     value,
//     onChange,
//     ...restProps
// }) => {
//     const v = useMemo(() => {
//         console.log('value =>', value)
//         if (!value) return []
//         return value.split(',')
//     }, [value])
//     const handleChange = useCallback(
//         (list: string[]) => {
//             console.log('list =>', list)
//             onChange && onChange(list.join(','))
//         },
//         [onChange]
//     )
//
//     return <Checkbox.Group value={v} onChange={handleChange} {...restProps} />
// }
