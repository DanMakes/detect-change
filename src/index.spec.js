import treeChanges from './index';

describe('tree-changes', () => {
  const A = {
    status: 'idle',
    hasData: false,
    data: { a: 1 },
    items: [{ name: 'test' }],
    ratio: 0.45,
    retries: 0,
    switch: false,
  };

  const B = {
    status: 'done',
    hasData: true,
    data: { a: 1 },
    items: [],
    ratio: 0.4,
    retries: 1,
  };

  const { changed, changedFrom, changedTo, increased, decreased } = treeChanges(A, B);

  it('should be a function', () => {
    expect(typeof treeChanges).toBe('function');
  });

  it('should identify changed', () => {
    expect(changed('status')).toBe(true);
    expect(changed('hasData')).toBe(true);
    expect(changed('data')).toBe(false);
    expect(changed('items')).toBe(true);
    expect(changed('switch')).toBe(true);
  });

  it('should identify changedFrom', () => {
    expect(changedFrom('status')).toBe(false);

    expect(changedFrom('status', 'idle', 'done')).toBe(true);
    expect(changedFrom('status', 'ready', 'done')).toBe(false);

    expect(changedFrom('hasData', true, false)).toBe(false);
    expect(changedFrom('hasData', false, true)).toBe(true);

    expect(changedFrom('data', { a: 1 }, {})).toBe(false);
    expect(changedFrom('data', { a: 1 }, true)).toBe(false);
    expect(changedFrom('data', 'a', { a: 1 })).toBe(false);

    expect(changedFrom('switch', false, undefined)).toBe(true);
    expect(changedFrom('switch', false, null)).toBe(false);
    expect(changedFrom('switch', true, undefined)).toBe(false);
  });

  it('should identify changedTo', () => {
    expect(changedTo('status')).toBe(false);

    expect(changedTo('status', 'idle')).toBe(false);
    expect(changedTo('status', 'done')).toBe(true);

    expect(changedTo('hasData', false)).toBe(false);
    expect(changedTo('hasData', true)).toBe(true);

    expect(changedTo('data', { a: 1 })).toBe(false);
    expect(changedTo('data', '')).toBe(false);

    expect(changedTo('items', [])).toBe(false);

    expect(changedTo('retries', 1)).toBe(true);
  });

  it('should identify increased', () => {
    expect(increased('status')).toBe(false);
    expect(increased('hasData')).toBe(false);
    expect(increased('data')).toBe(false);
    expect(increased('ratio')).toBe(false);
    expect(increased('retries')).toBe(true);
  });

  it('should identify decreased', () => {
    expect(decreased('status')).toBe(false);
    expect(decreased('hasData')).toBe(false);
    expect(decreased('data')).toBe(false);
    expect(decreased('ratio')).toBe(true);
    expect(decreased('retries')).toBe(false);
  });
});
