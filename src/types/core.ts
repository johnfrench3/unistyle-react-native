import type {
    MatrixTransform,
    PerpectiveTransform,
    RotateTransform,
    RotateXTransform,
    RotateYTransform,
    RotateZTransform,
    ScaleTransform,
    ScaleXTransform,
    ScaleYTransform,
    SkewXTransform,
    SkewYTransform,
    TranslateXTransform,
    TranslateYTransform
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { UnistylesBreakpoints, UnistylesThemes } from '../global'
import type { MediaQuery } from './mq'

export type ShadowOffset = {
    width: number,
    height: number
}

export type TransformStyles =
    & PerpectiveTransform
    & RotateTransform
    & RotateXTransform
    & RotateYTransform
    & RotateZTransform
    & ScaleTransform
    & ScaleXTransform
    & ScaleYTransform
    & TranslateXTransform
    & TranslateYTransform
    & SkewXTransform
    & SkewYTransform
    & MatrixTransform

export type ScreenSize = {
    width: number,
    height: number
}

export type RNStyle = ViewStyle | TextStyle | ImageStyle
export type RNValue = number | string | undefined
export type NestedStyle = Record<keyof UnistylesBreakpoints | MediaQuery, RNValue>
export type NestedStylePairs = Array<[keyof UnistylesBreakpoints | MediaQuery, RNValue]>
export type UnistylesTheme = UnistylesThemes[keyof UnistylesThemes]
export type CreateStylesFactory<ST> = (theme: UnistylesTheme) => ST