import React from 'react'

interface MarkTextProps {
    name: string
    keyword?: string
}

export const MarkText: React.FC<MarkTextProps> = ({ name, keyword }) => {
    if (!keyword) return <>{name}</>

    const arr = name.split(keyword)

    return (
        <>
            {arr.map((item, index) => (
                <span key={index}>
                    {item}
                    {index === arr.length - 1 ? null : (
                        <span style={{ color: '#257AFD' }}>{keyword}</span>
                    )}
                </span>
            ))}
        </>
    )
}
