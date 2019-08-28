/**
 * Readme:
 * 自定义 ‘上传文件（到fanink的oss端）’的方法
 */
import Taro from '@tarojs/taro';
import { getUploadSign as ApiGetUploadSign } from '@/api/document';
import Tips from './tips';

// [type] 上传配置
type SignConfig = {
  category: string;
  ocr_type?: "id_front" | "id_back" | "bank_card" | undefined;
};

/**
  * 上传证件照到oss服务器
  * @params imageType: string ( oss配置的路径 )
  * @params imagePath: string
  */
async function uploadPhotoToOss(imageType: 'id_front' | 'id_back' | 'bank_card' | string, imagePath: string): Promise<any> {
  console.info('上传photo到oss:', imageType, imagePath);
  const { url, formData } = await getUploadSign(imageType);
  return uploadFile(url, imagePath, formData);
}

/**
 * 获取上传配置
 * @param imageType 
 * @return Promise  (.then返回上传到oss的formData) 
 *    res: {
 *      url: '',
 *      formData: {}
 *    }
 * @example
 * 
 *  ```
 *    getUploadSign('id_front')
 *       .then( res=>{
 *          console.log(res);
 *        } )
 *  ``` 
 */
function getUploadSign(imageType: 'id_front' | 'id_back' | 'bank_card' | string): Promise<any> {
  const signConfig = ['id_front', 'id_back', 'bank_card'].includes(imageType) ? { category: imageType, ocr_type: imageType } : { category: imageType };
  return ApiGetUploadSign(signConfig as SignConfig)
    .then(res => {
      let ossFormData = {};// 上传到oss的配置
      const ossUrl = `https://${res.data.host}`
      Object.keys(res.data.sign).forEach(key => {
        ossFormData[key] = res.data.sign[key];
      });
      return {
        url: ossUrl,
        formData: ossFormData,
      };
    })
    .catch(error => {
      Tips.toast('获取上传配置失败,' + JSON.stringify(error));
      console.error(error);
    });
}

/**
 * 上传文件
 * @param url 
 * @param filePath 
 * @param formData 
 */
function uploadFile(url: string, filePath: string, formData: object): Promise<any> {
  return Taro.uploadFile({
    url: url, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    header: {
      'content-Type': 'application/x-www-form-urlencoded'
    },
    name: 'file', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    formData: formData,
  })
}

// export
export {
  uploadPhotoToOss,
  getUploadSign,
  uploadFile,
}
export default {
  uploadPhotoToOss,
  getUploadSign,
  uploadFile,
}