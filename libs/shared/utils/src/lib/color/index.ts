const colors = [
    '#33B5E5',
    '#0099CC',
    '#AA66CC',
    '#9933CC',
    '#99CC00',
    '#669900',
    '#FFBB33',
    '#FF8800',
    '#FF4444',
    '#CC0000'
]

export const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)]
