export default function truncate(s: string, length = 24): string {
  return s.length > length ? `${s.substr(0, length / 2)}…${s.substr(s.length - length / 2)}` : s;
}
