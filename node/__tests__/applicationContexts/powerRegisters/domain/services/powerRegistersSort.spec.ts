import PowerRegistersSort from "../../../../../src/applicationContexts/powerRegistersPreprocess/domain/services/powerRegistersSort";

describe('[Domain] Class PowerRegistersSort', () => {
    test('Should returns empty Array if input is null', () => {
        // Arrange
        var service = new PowerRegistersSort();

        // Act
        var result = service.sort(null as any);

        // Assert
        expect(result).toEqual([]);
    })   

    test('Should returns empty Array if input is empty array', () => {
        // Arrange
        var service = new PowerRegistersSort();

        // Act
        var result = service.sort([]);

        // Assert
        expect(result).toEqual([]);
    })

    test('Should returns single element Array if input has a single element', () => {
        // Arrange
        var service = new PowerRegistersSort();

        // Act
        var result = service.sort([{
            name: 'device1',
            power: 34.5,
            dateTime: new Date('2024-10-01T00:00:00Z')
        }]);

        // Assert
        expect(result?.length).toEqual(1);
        expect(result[0].name).toEqual('device1')
        expect(result[0].power).toEqual(34.5)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
    })

    test('Should returns a sorted two elements Array if input has no sorted two elements', () => {
        // Arrange
        var service = new PowerRegistersSort();

        // Act
        var result = service.sort([{
            name: 'device1',
            power: 34.5,
            dateTime: new Date('2024-10-01T01:00:00Z')
        }, {
            name: 'device1',
            power: 23.4,
            dateTime: new Date('2024-10-01T00:00:00Z')
        }]);

        // Assert
        expect(result?.length).toEqual(2);
        expect(result[0].name).toEqual('device1')
        expect(result[0].power).toEqual(23.4)
        expect(result[0].dateTime).toStrictEqual(new Date('2024-10-01T00:00:00Z'))
        expect(result[1].name).toEqual('device1')
        expect(result[1].power).toEqual(34.5)
        expect(result[1].dateTime).toStrictEqual(new Date('2024-10-01T01:00:00Z'))
    })
})