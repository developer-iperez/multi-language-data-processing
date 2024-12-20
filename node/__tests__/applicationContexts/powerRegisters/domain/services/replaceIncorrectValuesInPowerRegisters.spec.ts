import ReplaceIncorrectValuesInPowerRegisters from "../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/replaceIncorrectValuesInPowerRegisters"

describe('[Domain] Class ReplaceIncorrectValuesInPowerRegisters', () => {
    test('Should returns Empty array if the method receives no records', () => {
        // Arrange
        const service = new ReplaceIncorrectValuesInPowerRegisters()
        
        // Act
        const result = service.replaceIncorrectValues([], 0)

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(0)
    })

    test('Should returns a valid single register if the method receives an array with a single wrong register and with incorrect power value', () => {
        // Arrange
        const service = new ReplaceIncorrectValuesInPowerRegisters()
        
        // Act
        const defaultPowerValueToReplace = 0
        const result = service.replaceIncorrectValues([{
            result: false,
            register: null,
            wrongRegister: {
                name: 'DEVICE_1',
                power: 'wrong_power',
                dateTime: '2024-10-21T05:45:01.583Z'
            }
        }], defaultPowerValueToReplace)

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(1)
        expect(result[0]).not.toBeNull()
        expect(result[0].name).toBe('DEVICE_1')
        expect(result[0].power).toBe(defaultPowerValueToReplace)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-21T05:45:01.583Z'))
    })
})