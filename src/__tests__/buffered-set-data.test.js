import { setData } from '../buffered-set-data';  // Adjust the import to the correct path

jest.useFakeTimers();

describe('bufferedSetData', () => {
  it('should buffer data updates and call cb with aggregated state', () => {
    const cbMock = jest.fn();
    global.console.error = cbMock;

    setData({ a: 1 });
    setData({ b: 2 });

    // Fast-forward time to trigger the callback
    jest.advanceTimersByTime(200);

    expect(cbMock).toHaveBeenCalledWith('data:', { a: 1, b: 2 });
  });

  it('should reset state after calling cb', () => {
    const cbMock = jest.fn();
    global.console.error = cbMock;

    setData({ a: 1 });
    
    jest.advanceTimersByTime(200);
    expect(cbMock).toHaveBeenCalledWith('data:', { a: 1 });

    cbMock.mockClear();

    setData({ b: 2 });
    
    jest.advanceTimersByTime(200);
    expect(cbMock).toHaveBeenCalledWith('data:', { b: 2 });
  });

  it('should handle multiple rapid calls correctly', () => {
    const cbMock = jest.fn();
    global.console.error = cbMock;

    setData({ a: 1 });
    jest.advanceTimersByTime(100);
    setData({ b: 2 });
    jest.advanceTimersByTime(100);

    expect(cbMock).toHaveBeenCalledWith('data:', { a: 1, b: 2 });
  });

  it('should not call cb before 200ms', () => {
    const cbMock = jest.fn();
    global.console.error = cbMock;

    setData({ a: 1 });
    setData({ b: 2 });

    jest.advanceTimersByTime(199);

    expect(cbMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(cbMock).toHaveBeenCalledWith('data:', { a: 1, b: 2 });
  });
});
