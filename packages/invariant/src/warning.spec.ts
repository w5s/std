import { describe, it, expect, vi } from 'vitest';
import { warning } from './warning.js';

describe('warning', () => {
  it('should not call warning.print when condition is true', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(true, 'message');
    expect(printSpy).not.toHaveBeenCalled();
  });
  it('should call warning.print when condition is false', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(false, 'message');
    expect(printSpy).toHaveBeenCalledWith('Warning: message');
  });
  it('should call warning.print with an empty string when message is not defined', () => {
    const printSpy = vi.spyOn(warning, 'current').mockImplementationOnce(() => {
      // do nothing
    });
    warning(false, undefined);
    expect(printSpy).toHaveBeenCalledWith('Warning: ');
  });
});
