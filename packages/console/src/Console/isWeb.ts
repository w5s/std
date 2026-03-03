export function isWeb(): boolean {
  const consoleWithStreams = console as Partial<{
    _stdout: NodeJS.WriteStream;
    _stderr: NodeJS.WriteStream;
  }>;
  const { _stdout: stdout, _stderr: stderr } = consoleWithStreams;
  return stderr == null || stdout == null;
}
