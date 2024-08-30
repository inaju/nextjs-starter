import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";
// import { MongoClient } from "mongodb";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


const connectMongoDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'base-db',
    });
    console.info("Connected to MongoDB.");
    return mongo;
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;


export const genericTryCatch = (code) => {
  try {
    return code
  } catch (err) {
    console.error(err, 'thats the error')
  }
}


export function generateEventCode() {
  let randomNumbers = '';
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 9);
    randomNumbers += randomNumber;
  }
  return randomNumbers;

}

export const handleDownload = (fileUrl, fileName) => {
  fetch(fileUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + ".png");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading the file:', error));
};
