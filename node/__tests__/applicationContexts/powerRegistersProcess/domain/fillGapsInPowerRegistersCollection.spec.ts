import FillGapsInPowerRegistersCollection from "../../../../src/applicationContexts/powerRegistersProcess/domain/services/fillGapsInPowerRegistersCollection"
import PeriodInMinutesValueObject from "../../../../src/applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject"

describe('[Domain] Class FillGapsInPowerRegistersCollection, fillGaps method', () => {
    test('Should returns empty array if input powerRegisters are empty', () => {
        // Arrange
        const service = new FillGapsInPowerRegistersCollection()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.fillGaps(periodInMinutes, [])

        // Assert
        expect(result.length).toBe(0)
    })

    test('Should returns a single element array if input powerRegisters has a single element', () => {
        // Arrange
        const service = new FillGapsInPowerRegistersCollection()

        // Act
        const dateTime = new Date()
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.fillGaps(periodInMinutes, [{
            name: 'device',
            power: 15,
            dateTime
        }])

        // Assert
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('device')
        expect(result[0].power).toBe(15)
        expect(result[0].dateTime).toStrictEqual(dateTime)
    })

    test('Should returns the same input array if input records are spaced to the same period as indicated by parameter', () => {
        // Arrange
        const service = new FillGapsInPowerRegistersCollection()

        // Act
        const dateTime1 = new Date('2024-10-01T00:00:00.000Z')
        const dateTime2 = new Date('2024-10-01T00:15:00.000Z')
        const dateTime3 = new Date('2024-10-01T00:30:00.000Z')
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.fillGaps(periodInMinutes, [{
            name: 'device',
            power: 10,
            dateTime: dateTime1
        }, {
            name: 'device',
            power: 20,
            dateTime: dateTime2
        }, {
            name: 'device',
            power: 30,
            dateTime: dateTime3
        }])

        // Assert
        expect(result.length).toBe(3)
        expect(result[0].name).toBe('device')
        expect(result[0].power).toBe(10)
        expect(result[0].dateTime).toStrictEqual(dateTime1)
        expect(result[1].name).toBe('device')
        expect(result[1].power).toBe(20)
        expect(result[1].dateTime).toStrictEqual(dateTime2)
        expect(result[2].name).toBe('device')
        expect(result[2].power).toBe(30)
        expect(result[2].dateTime).toStrictEqual(dateTime3)
    })

    test('Should returns the interpolated array if the input records has a gap', () => {
        // Arrange
        const service = new FillGapsInPowerRegistersCollection()

        // Act
        const dateTime1 = new Date('2024-10-01T00:00:00.000Z')
        const dateTime2 = new Date('2024-10-01T00:30:00.000Z')
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.fillGaps(periodInMinutes, [{
            name: 'device',
            power: 10,
            dateTime: dateTime1
        }, {
            name: 'device',
            power: 30,
            dateTime: dateTime2
        }])

        // Assert
        expect(result.length).toBe(3)
        expect(result[0].name).toBe('device')
        expect(result[0].power).toBe(10)
        expect(result[0].dateTime).toStrictEqual(dateTime1)
        expect(result[1].name).toBe('device')
        expect(result[1].power).toBe(20)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T00:15:00.000Z'))
        expect(result[2].name).toBe('device')
        expect(result[2].power).toBe(30)
        expect(result[2].dateTime).toStrictEqual(dateTime2)
    })
})