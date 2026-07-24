export function isWeb(): boolean {
  const consoleWithStreams = console as Partial<{
    _stderr: WritableStream;
    _stdout: WritableStream;
  }>;
  const { _stderr: stderr, _stdout: stdout } = consoleWithStreams;
  return stderr == null || stdout == null;
}
