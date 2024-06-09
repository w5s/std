import { describe, it, expect, vi, beforeEach } from 'vitest';
import { warning } from './warning.js';

describe('warning', () => {
  let warnSpy = vi.spyOn(console, 'warn');

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => {
      // do nothing
    });
  });

  it('should not call warning.print when condition is true', () => {
    warning(true, 'message');
    expect(warnSpy).not.toHaveBeenCalled();
  });
  it('should call warning.print when condition is false', () => {
    warning(false, 'message');
    expect(warnSpy).toHaveBeenCalledWith('Warning: message');
  });
  it('should call warning.print with an empty string when message is not defined', () => {
    warning(false, undefined);
    expect(warnSpy).toHaveBeenCalledWith('Warning: ');
  });
});
