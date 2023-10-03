import { getBreakpointFromScreenWidth, getValueForBreakpoint, sortAndValidateBreakpoints } from './breakpoints'
import type { ScreenSize } from '../types'

describe('breakpoints', () => {
    describe('sortAndValidateBreakpoints', () => {
        it('should throw error for empty breakpoints', () => {
            const breakpoints = {}

            expect(() => sortAndValidateBreakpoints(breakpoints)).toThrow()
        })

        it('should throw error for breakpoints that don\'t start with 0', () => {
            const breakpoints = {
                sm: -1
            }

            expect(() => sortAndValidateBreakpoints(breakpoints)).toThrow()
        })

        it('should return same order for sorted elements', () => {
            const breakpoints = {
                sm: 0,
                md: 200,
                lg: 300,
                xl: 500
            }

            expect(sortAndValidateBreakpoints(breakpoints)).toEqual(breakpoints)
        })

        it('should sort the order of breakpoints', () => {
            const breakpoints = {
                md: 200,
                sm: 0,
                lg: 300,
                xl: 500
            }

            expect(sortAndValidateBreakpoints(breakpoints)).toEqual({
                sm: 0,
                md: 200,
                lg: 300,
                xl: 500
            })
        })

        it('should throw errors for duplicated values', () => {
            const breakpoints = {
                md: 200,
                sm: 0,
                lg: 300,
                xl: 300
            }

            expect(() => sortAndValidateBreakpoints(breakpoints)).toThrow()
        })
    })

    describe('getBreakpointFromScreenWidth', () => {
        it('should return correct breakpoints based on screen width', () => {
            const breakpoints = {
                xs: 0,
                sm: 300,
                md: 500,
                xl: 1200
            }

            expect(getBreakpointFromScreenWidth(0, breakpoints)).toEqual('xs')
            expect(getBreakpointFromScreenWidth(20, breakpoints)).toEqual('xs')
            expect(getBreakpointFromScreenWidth(100, breakpoints)).toEqual('xs')
            expect(getBreakpointFromScreenWidth(101, breakpoints)).toEqual('xs')
            expect(getBreakpointFromScreenWidth(250, breakpoints)).toEqual('xs')
            expect(getBreakpointFromScreenWidth(300, breakpoints)).toEqual('sm')
            expect(getBreakpointFromScreenWidth(499, breakpoints)).toEqual('sm')
            expect(getBreakpointFromScreenWidth(500, breakpoints)).toEqual('md')
            expect(getBreakpointFromScreenWidth(799, breakpoints)).toEqual('md')
            expect(getBreakpointFromScreenWidth(1200, breakpoints)).toEqual('xl')
            expect(getBreakpointFromScreenWidth(2000, breakpoints)).toEqual('xl')
        })
    })

    describe('getValueForBreakpoint', () => {
        it('should prioritize custom media query', () => {
            const breakpoint = 'sm'
            const breakpoints = {
                xs: 0,
                sm: 200,
                md: 500
            }
            const style: Record<string, string> = {
                ':w[, 200]': 'green',
                ':w[201]': 'orange',
                sm: 'pink'
            }
            const screenSize: ScreenSize = {
                width: 200,
                height: 800
            }

            expect(getValueForBreakpoint(style, breakpoint, screenSize, breakpoints)).toEqual('green')
        })
    })

    it('should match breakpoint if media query doesnt exist', () => {
        const breakpoint = 'md'
        const breakpoints = {
            xs: 0,
            sm: 200,
            md: 500
        }
        const style: Record<string, string> = {
            ':w[, 200]': 'green',
            ':w[201, 499]': 'orange',
            sm: 'pink',
            md: 'red'
        }
        const screenSize: ScreenSize = {
            width: 500,
            height: 1200
        }

        expect(getValueForBreakpoint(style, breakpoint, screenSize, breakpoints)).toEqual('red')
    })

    it('should match breakpoint even if value is undefined', () => {
        const breakpoint = 'md'
        const breakpoints = {
            xs: 0,
            sm: 200,
            md: 500
        }
        const style: Record<string, string | undefined> = {
            ':w[, 200]': 'green',
            ':w[201, 499]': 'orange',
            sm: 'pink',
            md: undefined
        }
        const screenSize: ScreenSize = {
            width: 500,
            height: 1200
        }

        expect(getValueForBreakpoint(style, breakpoint, screenSize, breakpoints)).toEqual(undefined)
    })

    it('should match lower breakpoint to match css cascading', () => {
        const breakpoint = 'xl'
        const breakpoints = {
            xs: 0,
            sm: 200,
            md: 500,
            xl: 600
        }
        const style: Record<string, string | undefined> = {
            ':w[, 200]': 'green',
            ':w[201, 499]': 'orange',
            sm: 'pink',
            md: 'red'
        }
        const screenSize: ScreenSize = {
            width: 500,
            height: 1200
        }

        expect(getValueForBreakpoint(style, breakpoint, screenSize, breakpoints)).toEqual('red')
    })
})