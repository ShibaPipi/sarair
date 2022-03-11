import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { Draggable, DraggableProps } from 'react-beautiful-dnd'

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }

export const Drag: React.FC<DragProps> = ({ children, ...props }) => {
    return (
        <Draggable {...props}>
            {provided =>
                isValidElement(children) ? (
                    cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef
                    })
                ) : (
                    <div />
                )
            }
        </Draggable>
    )
}
