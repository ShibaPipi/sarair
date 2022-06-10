export const CELL_SIZE_DESKTOP = '10rem'
export const GRID_CONTAINER_SIZE_DESKTOP = '46rem'
export const BORDER_RADIUS_DESKTOP = '0.6rem'
export const FONT_SIZE_DESKTOP = '6rem'

export const documentWidth = window.screen.availWidth
export const GRID_CONTAINER_SIZE_MOBILE = 0.92 * documentWidth
export const CELL_SIZE_MOBILE = 0.18 * documentWidth
export const CELL_GUTTER_MOBILE = 0.04 * documentWidth
export const BORDER_RADIUS_MOBILE = 0.02 * GRID_CONTAINER_SIZE_MOBILE

export const isMobile = documentWidth <= 576

export const fontSizeCoefficient = (value: number) => {
    if (value < 128) {
        return 0.6
    }
    if (value < 1024) {
        return 0.5
    }
    return 0.4
}
