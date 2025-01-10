import AWS from "aws-sdk";

const getData = async () => {
  try {
    AWS.config.update({
      region: process.env.REACT_APP_region,
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // S3에서 파일 읽기
    const params = { Bucket: "chargers-list/chargers", Key: "chargers.json" };
    const result = await s3.getObject(params).promise();
    const fileContent = result.Body.toString("utf-8");
    const parsedData = JSON.parse(fileContent);
    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
export default getData;
