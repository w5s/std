export function isWeb(): boolean {
  const consoleWithStreams = console as Partial<{
    _stdout: WritableStream;
    _stderr: WritableStream;
  }>;
  const { _stdout: stdout, _stderr: stderr } = consoleWithStreams;
  return stderr == null || stdout == null;
}
