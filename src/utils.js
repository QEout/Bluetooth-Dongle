export function formatMsg(msg) {
  // 7E7E7E5A0606E07EA5变成7E 7E 7E 5A 06 06 E0 7E A5
  const length = msg.length;
  let str = '';
  for (let i = 0; i < length; i++) {
    if (i % 2 == 0) {
      str += msg[i];
    } else {
      if (i == length - 1)
        str += msg[i];
      else
        str += msg[i] + ' ';
    }
  }
  return str;
}