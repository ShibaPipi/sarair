import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop: React.FC<DropProps> = ({ children, ...props }) => {
    return (
        <Droppable {...props}>
            {provided =>
                isValidElement(children) ? (
                    cloneElement(children, {
                        ...provided.droppableProps,
                        ref: provided.innerRef,
                        provided
                    })
                ) : (
                    <div />
                )
            }
        </Droppable>
    )
}
