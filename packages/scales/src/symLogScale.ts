import { scaleSymlog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleSymLog, ScaleSymLogSpec } from './types'

export const createSymLogScale = (
    { constant = 1, min = 'auto', max = 'auto' }: ScaleSymLogSpec,
    data: ComputedSerieAxis<number>,
    size: number,
    axis: ScaleAxis
) => {
    let minValue: number
    if (min === 'auto') {
        minValue = data.min
    } else {
        minValue = min
    }

    let maxValue: number
    if (max === 'auto') {
        maxValue = data.max
    } else {
        maxValue = max
    }

    const scale = scaleSymlog<number, number>()
        .domain([minValue, maxValue])
        .constant(constant)
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .nice()

    const typedScale = scale as ScaleSymLog
    typedScale.type = 'symlog'

    return typedScale
}
