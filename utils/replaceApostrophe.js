export default function replaceApostrophe(string) {
  if (string.includes(`'`)){
    return string.replace(/'/g, `’`)
  } else return string
}