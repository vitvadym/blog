import imageKit from 'imagekit';
import 'dotenv/config';

const ik = new imageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_API_URL_ENDPOINT,
});

export default ik;
