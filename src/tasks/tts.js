/**
 * tts.js - Generate link for Google Translate Text-to-Speech
 * @param (string) code - CAPTCHA code to speak
 */
module.exports = code => `https://translate.google.com/translate_tts?q=${code.split('').join(' ')}&tl=en-US&total=1&idx=0&textlen=11&client=tw-ob&prev=input&ttsspeed=0`