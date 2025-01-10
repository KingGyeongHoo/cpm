import AWS from "aws-sdk";

const getUsageData = async () => {
  try {
    // AWS 설정
    AWS.config.update({
      region: process.env.REACT_APP_region,
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // S3에서 파일 읽기
    const params = {
      Bucket: "chargers-list/useage-record",
      Key: "ChargerUseData.json",
    };

    const result = await s3.getObject(params).promise();
    const fileContent = result.Body.toString("utf-8");
    const data = JSON.parse(fileContent);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getUsageData;
