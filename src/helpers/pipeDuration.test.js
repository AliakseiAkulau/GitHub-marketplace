import {pipeDuration} from "./index";

describe('pipeDuration', () => {
    test('should display duration equal minute', () => {
        expect(pipeDuration(60)).toBe("1:00");
    })
    test('should display duration more than minute', () => {
        expect(pipeDuration(61)).toBe("1:01");
    })
    test('should display duration less then minute', () => {
        expect(pipeDuration(40)).toBe("0:40");
    })
})
