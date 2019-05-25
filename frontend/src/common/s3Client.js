import AWS from 'aws-sdk';

const BUCKET = process.env.REACT_APP_S3_BUCKET;
const ACCESS_KEY_ID = process.env.REACT_APP_S3_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

AWS.config.update({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

const s3Client = new AWS.S3({
  params: { Bucket: BUCKET }
});

const uploadFile = file => {
  return new Promise((resolve, reject) =>
    s3Client.upload(
      {
        Key: file.title,
        Body: file.rawFile,
        ContentType: file.rawFile.type
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    )
  );
};

export default {
  upload(files) {
    return Promise.all(files.map(file => uploadFile(file)));
  }
};
