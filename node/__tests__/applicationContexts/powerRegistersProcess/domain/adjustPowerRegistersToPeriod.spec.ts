import AdjustPowerRegistersToPeriod from "../../../../src/applicationContexts/powerRegistersProcess/domain/services/adjustPowerRegistersToPeriod"
import PeriodInMinutesValueObject from "../../../../src/applicationContexts/shared/domain/valueObjects/periodInMinutesValueObject"

describe('[Domain] Class AdjustPowerRegistersToPeriod', () => {
    test('Should returns empty array if the input registers array is empty', () => {
        // Arrange
        const service = new AdjustPowerRegistersToPeriod()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.adjustToPeriod(periodInMinutes, [])

        // Assert
        expect(result.length).toBe(0)
    })

    test('Should returns single element array if the input collection has a single item', () => {
        // Arrange
        const service = new AdjustPowerRegistersToPeriod()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.adjustToPeriod(periodInMinutes, [{
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:00:00.000Z'),
        }])

        // Assert
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('d1')
        expect(result[0].power).toBe(30)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00.000Z'))
    })

    test('Should returns single element array if the input collection has two register in the same input period', () => {
        // Arrange
        const service = new AdjustPowerRegistersToPeriod()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.adjustToPeriod(periodInMinutes, [{
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:01:00.000Z'),
        }, {
            name: 'd1',
            power: 32,
            dateTime: new Date('2024-10-01T00:05:00.000Z'),
        }])

        // Assert
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('d1')
        expect(result[0].power).toBe(31)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00.000Z'))
    })

    test('Should returns two elements array if the input collection has registers in the two different period groups', () => {
        // Arrange
        const service = new AdjustPowerRegistersToPeriod()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.adjustToPeriod(periodInMinutes, [{
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:01:00.000Z'),
        }, {
            name: 'd1',
            power: 32,
            dateTime: new Date('2024-10-01T00:05:00.000Z'),
        }, {
            name: 'd1',
            power: 25,
            dateTime: new Date('2024-10-01T00:16:00.000Z'),
        }, {
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:20:00.000Z'),
        }])

        // Assert
        expect(result.length).toBe(2)
        expect(result[0].name).toBe('d1')
        expect(result[0].power).toBe(31)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00.000Z'))
        expect(result[1].name).toBe('d1')
        expect(result[1].power).toBe(27.5)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T00:15:00.000Z'))
    })

    test('Should returns three non date consecutive elements array if the input collection has registers in the three non consecutive period groups', () => {
        // Arrange
        const service = new AdjustPowerRegistersToPeriod()

        // Act
        const periodInMinutes = new PeriodInMinutesValueObject(15)
        const result = service.adjustToPeriod(periodInMinutes, [{
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:01:00.000Z'),
        }, {
            name: 'd1',
            power: 32,
            dateTime: new Date('2024-10-01T00:05:00.000Z'),
        }, {
            name: 'd1',
            power: 25,
            dateTime: new Date('2024-10-01T00:16:00.000Z'),
        }, {
            name: 'd1',
            power: 30,
            dateTime: new Date('2024-10-01T00:20:00.000Z'),
        }, {
            name: 'd1',
            power: 33,
            dateTime: new Date('2024-10-01T00:50:00.000Z'),
        }])

        // Assert
        expect(result.length).toBe(3)
        expect(result[0].name).toBe('d1')
        expect(result[0].power).toBe(31)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00.000Z'))
        expect(result[1].name).toBe('d1')
        expect(result[1].power).toBe(27.5)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T00:15:00.000Z'))
        expect(result[2].name).toBe('d1')
        expect(result[2].power).toBe(33)
        expect(result[2].dateTime).toStrictEqual(new Date('2024-10-01T00:45:00.000Z'))
    })
})