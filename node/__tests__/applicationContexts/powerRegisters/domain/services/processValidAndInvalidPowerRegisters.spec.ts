import ProcessValidAndInvalidPowerRegisters from "../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/processValidAndInvalidPowerRegisters"

describe('[Domain] Class ProcessValidAndInvalidPowerRegisters', () => {
    test('Should returns Empty array if the method receives no records', () => {
        // Arrange
        const service = new ProcessValidAndInvalidPowerRegisters()
        
        // Act
        const result = service.processValidAndInvalidPowerRegisters([])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(0)
    })

    test('Should returns single element array if the method receives a single wrong record', () => {
        // Arrange
        const service = new ProcessValidAndInvalidPowerRegisters()
        
        // Act
        const result = service.processValidAndInvalidPowerRegisters([{
            result: false,
            register: null,
            wrongRegister: {
                name: 'DEVICE1',
                power: 'wrong value',
                dateTime: '2024-10-21T05:45:01.583Z'
            }
        }])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('DEVICE1')
        expect(result[0].power).toBe(NaN)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-21T05:45:01.583Z'))
    })

    test('Should returns single element array if the method receives a single valid record', () => {
        // Arrange
        const service = new ProcessValidAndInvalidPowerRegisters()
        
        // Act
        const result = service.processValidAndInvalidPowerRegisters([{
            result: true,
            register: {
                name: 'DEVICE1',
                power: 42.5,
                dateTime: new Date('2024-10-21T05:45:01.583Z')
            },
            wrongRegister: null
        }])

        // Assert
        expect(result).not.toBeNull()
        expect(result.length).toBe(1)
        expect(result[0].name).toBe('DEVICE1')
        expect(result[0].power).toBe(42.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-21T05:45:01.583Z'))
    })

    test('Should returns two elements array if the method receives a valid and invalid records', () => {       
       // Arrange
       const service = new ProcessValidAndInvalidPowerRegisters()
        
       // Act
       const result = service.processValidAndInvalidPowerRegisters([{
           result: true,
           register: {
               name: 'DEVICE1',
               power: 42.5,
               dateTime: new Date('2024-10-21T05:45:00.000Z')
           },
           wrongRegister: null
        }, {
            result: false,
            register: null,
            wrongRegister: {
                name: 'DEVICE1',
                power: 'wrong value',
                dateTime: '2024-10-21T05:50:00.000Z'
            }
        }])

       // Assert
       expect(result).not.toBeNull()
       expect(result.length).toBe(2)
       expect(result[0].name).toBe('DEVICE1')
       expect(result[0].power).toBe(42.5)
       expect(result[0].dateTime).toStrictEqual(new Date('2024-10-21T05:45:00.000Z'))
       expect(result[1].name).toBe('DEVICE1')
       expect(result[1].power).toBe(NaN)
       expect(result[1].dateTime).toStrictEqual(new Date('2024-10-21T05:50:00.000Z'))
    })
})