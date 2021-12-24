import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react'

import { Button } from '@sarair/desktop/shared/ui'

interface ChildrenRefProps {
    callByParent: () => string
}

export const LearnRef: React.FC = () => {
    const ref = useRef<ChildrenRefProps>(null)
    const handleClick = useCallback(() => {
        ref.current && alert(ref.current.callByParent())
    }, [])

    return (
        <div>
            <Children ref={ref} />
            <Button onClick={handleClick}>click</Button>
        </div>
    )
}

const Children = forwardRef<ChildrenRefProps, unknown>((_, ref) => {
    const [value, setValue] = useState<string>('')
    const handleChange = useCallback(({ target: { value } }) => {
        setValue(value)
    }, [])
    useImperativeHandle(
        ref,
        () => ({
            callByParent: () => value
        }),
        [value]
    )

    return (
        <div>
            <input onChange={handleChange} value={value} />
        </div>
    )
})

// export const LearnRef: React.FC = () => {
//     const ref = useRef<HTMLInputElement>(null)
//     const handleClick = useCallback(() => {
//         ref.current && console.log(ref.current)
//     }, [])
//
//     return (
//         <div>
//             <Children ref={ref} />
//             <Button onClick={handleClick}>click</Button>
//         </div>
//     )
// }
//
// const Children = forwardRef<HTMLInputElement, unknown>((_, ref) => {
//     return (
//         <div>
//             <input ref={ref} />
//         </div>
//     )
// })
