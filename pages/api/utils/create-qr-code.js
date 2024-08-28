import QRCode from 'qrcode'

// With async/await
export const generateQR = async text => {
  try {
    const qrCode=QRCode.toDataURL(text,{ version: 6 })
    return await qrCode;
  } catch (err) {
    console.error(err)
  }
}