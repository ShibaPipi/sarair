import React from 'react'

import { Dropdown, Popover, Row } from '@sarair/desktop/shared/ui'
import { QuestionCircleOutlined } from '@ant-design/icons'

interface ColumnTitleProps {
    text: string
    tipDescription: string
}

export const ColumnTitle: React.FC<ColumnTitleProps> = ({
    text,
    tipDescription
}) => {
    return (
        <Row justify="space-between">
            <div>{text}</div>
            <div>
                <Popover
                    content={tipDescription}
                    arrowPointAtCenter
                    overlayStyle={{ width: 360 }}
                    placement="bottom"
                >
                    <QuestionCircleOutlined />
                </Popover>
            </div>
        </Row>
    )
}
