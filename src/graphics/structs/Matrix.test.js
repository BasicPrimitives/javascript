import Matrix from './Matrix';

test('Matrix - 2 by 2 matrix', () => {
    var m = new Matrix(6, 2, 5, 3);

    expect(m.determinant()).toBe(8);
});