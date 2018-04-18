const listHelper = require('../utils/list_helper')

test('dummy return always 1', () => {
    const list = []
    const result = listHelper.dummy(list)
    expect(result).toBe(1)
})