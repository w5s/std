import { Result, Task } from '@w5s/core';
// @ts-ignore do not depend on definition
import { v4 as uuidV4 } from 'uuid';
import { UUID } from './data.js';
import { randomUUID } from './random.js';

describe('randomUUID', () => {
  test('should return a valid UUID', () => {
    const uuidResult = Result.getOrThrow(Task.unsafeRun(randomUUID));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  test('should use uuid v4', () => {
    expect(randomUUID.ref.current).toBe(uuidV4);
  });
  test('should use ref', () => {
    const uuidMock = UUID.empty();
    const randomUUIDMock = jest.spyOn(randomUUID.ref, 'current');
    randomUUIDMock.mockReturnValue(uuidMock);
    const uuidResult = Task.unsafeRun(randomUUID);

    expect(randomUUIDMock).toHaveBeenCalledTimes(1);
    expect(uuidResult).toEqual(Result.Ok(uuidMock));
  });
});
