import { FC } from 'react'

import { Popover, Row } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

interface ColumnTitleProps {
    text: string
    tipDescription: string
}

export const ColumnTitle: FC<ColumnTitleProps> = ({ text, tipDescription }) => {
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
