import { RemoveInvalidPowerRegisters } from "../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/removeInvalidPowerRegisters"

describe('[Domain] Class RemoveInvalidPowerRegisters', () => {
    test('Should returns Empty array if the method receives no records', () => {
        // Arrange
        const service = new RemoveInvalidPowerRegisters()
        
        // Act
        const result = service.removeInvalidRegisters([])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(0)
    })

    test('Should returns Empty array if the method receives a single wrong record', () => {
        // Arrange
        const service = new RemoveInvalidPowerRegisters()
        
        // Act
        const result = service.removeInvalidRegisters([{
            result: false,
            register: null,
            wrongRegister: {
                name: 'DEVICE1',
                power: 'wrong value',
                dateTime: 'wrong datetime'
            }
        }])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(0)
    })

    test('Should returns a single item array if the method receives a single correct record', () => {
        // Arrange
        const service = new RemoveInvalidPowerRegisters()
        
        // Act
        const now = new Date()
        const result = service.removeInvalidRegisters([{
            result: true,
            register: {
                name: 'DEVICE1',
                power: 34.78,
                dateTime: now
            },
            wrongRegister: null
        }])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(1)
        expect(result[0]).not.toBeNull()
        expect(result[0].name).toBe('DEVICE1')
        expect(result[0].power).toBe(34.78)
        expect(result[0].dateTime).toBe(now)
    })
})