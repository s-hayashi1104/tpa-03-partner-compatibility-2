const { calculateBestMatch, points, selectNear } = require('./compatibility-calculator');
const { candidates } = require('./data/candidates-data.js');

describe('selectNear', () => {
  it('should return true', () => {
    expect(selectNear(1, 2)).toBeTruthy();
    expect(selectNear(2, 1)).toBeTruthy();
  });

  it('should return false', () => {
    expect(selectNear(2, 2)).toBeFalsy();
    expect(selectNear(1, 4)).toBeFalsy();
  });
});

describe('points', () => {
  it('should return 2 if equal', () => {
    expect(points(1, 1)).toBe(2);
  });

  it('should return 1 if 1 point difference', () => {
    expect(points(2, 1)).toBe(1);
    expect(points(1, 2)).toBe(1);
  });

  it('should return 0 if 2 or more different', () => {
    expect(points(1, 3)).toBe(0);
    expect(points(3, 1)).toBe(0);
    expect(points(0, 4)).toBe(0);
  });
});

describe('compatibility-caculator', () => {
  it('should be equal', () => {
    expect(calculateBestMatch(candidates[0])).toEqual(candidates[0]);
    expect(calculateBestMatch(candidates[1])).toEqual(candidates[1]);
    expect(calculateBestMatch(candidates[2])).toEqual(candidates[2]);
  });
});
