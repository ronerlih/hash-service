import sorter from '../api/sorter';

let data = [1,2,2];

describe('testing a test suit', () => {
    it('Should log data', () => {
        expect(typeof sorter( data )).toBe('object');
    });
});
