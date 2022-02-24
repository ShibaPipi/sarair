import React, { ComponentProps } from 'react'

import { Raw } from '@sarair/shared/types'
import { Select } from '@sarair/desktop/shared/ui'

const convertToNumber = (value: unknown) =>
    isNaN(Number(value)) ? 0 : Number(value)

interface IdSelectorProps
    extends Omit<
        ComponentProps<typeof Select>,
        'value' | 'onChange' | 'options'
    > {
    value?: Raw | null | undefined
    onChange?: (value?: number) => void
    defaultOptionLabel?: string
    options?: Array<{ id: number; name: string }>
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true 的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange 会回调 undefined
 *
 * @param value
 * @param onChange
 * @param defaultOptionLabel
 * @param options
 * @param extraProps
 * @constructor
 */
export const IdSelector: React.FC<IdSelectorProps> = ({
    value,
    onChange,
    defaultOptionLabel,
    options,
    ...extraProps
}) => {
    return (
        <Select
            value={options?.length ? convertToNumber(value) : 0}
            onChange={value => onChange?.(convertToNumber(value) || undefined)}
            {...extraProps}
        >
            {defaultOptionLabel ? (
                <Select.Option value={0}>{defaultOptionLabel}</Select.Option>
            ) : null}
            {options?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                    {name}
                </Select.Option>
            ))}
        </Select>
    )
}
