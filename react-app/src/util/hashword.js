//Hexstring and digestMessage comes from documentation for Mozilla's SubtleCrypto API
//hexstring function converts value of digest arraybuffer into a hex representation

export function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
  
    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });
  
    return hexCodes.join('');
  }
  
const text = 'An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.';

//encodes text string into a 256 bit digest using SHA-256.
export function digestMessage(message) {
const encoder = new TextEncoder();
const data = encoder.encode(message);
return window.crypto.subtle.digest('SHA-256', data);
}

digestMessage(text).then(digestValue => {
console.log(hexString(digestValue));
});