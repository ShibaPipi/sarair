import React, { forwardRef, HTMLAttributes } from 'react'
import { DroppableProvided, DroppableProvidedProps } from 'react-beautiful-dnd'

type DropChildProps = Partial<
    { provided: DroppableProvided } & DroppableProvidedProps
> &
    HTMLAttributes<HTMLDivElement>

export const DropChild = forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, ...props }, ref) => {
        return (
            <div ref={ref} {...props}>
                {children}
                {props.provided?.placeholder}
            </div>
        )
    }
)
