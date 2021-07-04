import React, {
  ChangeEvent,
  MouseEvent,
  DragEvent,
  useState,
  useRef,
  useEffect
} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { Button, Modal } from 'antd'
import styles from './uploader.less';
import { useRecoilState } from 'recoil';
import Cropper from 'cropperjs'
import { pageBackgroundAtom } from '@/store/atorms/global'

type UploadStaus = 'ready' | 'loading' | 'success' | 'error';
type FileListType = 'picture' | 'text';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStaus;
  raw: File;
  resp?: any;
  url?: string | ArrayBuffer;
}

export interface SuccessProps {
  resp: any;
  file: UploadFile;
  list: UploadFile[];
}

export interface IProps {
  action: string;
  beforeUpload?: (file: File) => Promise<File> | boolean;
  listType?: FileListType;
  autoUpload?: boolean;
  success?: (value: SuccessProps) => void;
  fail?: Function;
}

interface CropDataProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Uploader: React.FC<IProps> = (props) => {
  const [pageBackground, setPageBackground] = useRecoilState(pageBackgroundAtom)
  // let [imageBase64, setImageBase64] = useState<string | ArrayBuffer>('')
  let [status, setStatus] = useState<UploadStaus>('ready');
  let [isDragOver, setIsDragOver] = useState<boolean>(false);
  let inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFlieList] = useState<UploadFile[]>([]);
  // const [respArr, setRespArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cropperImg = useRef(null)
  let cropper: Cropper
  let imageBase64: string | ArrayBuffer = ''
  let cropData: CropDataProps | null = null
  // let fileList = new Array() as UploadFile[]
  const beforeUploadCheck = (files: FileList | null) => {
    if (files) {
      // 上传所需文件
      const uploaderFile = files[0];
      if (props.beforeUpload) {
        const result = props.beforeUpload(uploaderFile);
        if (result && result instanceof Promise) {
          result
            .then((processFile) => {
              if (processFile instanceof File) {
                addFileToList(processFile);
              } else {
                throw new Error(
                  'beforeUpload Promise should return File object',
                );
              }
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (result === true) {
          addFileToList(uploaderFile);
        }
      } else {
        addFileToList(uploaderFile);
      }
    }
  };
  const handleFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    beforeUploadCheck(files);
  };

  useEffect(()=> {
    if(cropperImg.current) {
      cropper = new Cropper(cropperImg.current, {
        crop(event) {
          const { x, y, width, height } = event.detail
              cropData = {
                x: Math.floor(x),
                y: Math.floor(y),
                width: Math.floor(width),
                height: Math.floor(height)

              }
        }
      })
      console.log(cropper)
    }
  })
  // 点击div
  const handleClick = (e: MouseEvent) => {
    inputRef.current.click();
  };
  const addFileToList = async (uploadedFile: File) => {
    //  setFileObj()
    let fileObj: UploadFile = {
      uid: uuidv4(),
      name: uploadedFile.name,
      size: uploadedFile.size,
      raw: uploadedFile,
      status: 'ready',
    };
    // 如果是图片类型需要显示url
    // if (props.listType === 'picture') {
    //   try {
    //     fileObj.url = URL.createObjectURL(uploadedFile);
    //   } catch (err) {
    //     console.error('upload File error', err);
    //   }
    // }
     let reader = new FileReader()
    reader.readAsDataURL(uploadedFile)
    reader.addEventListener('load',function(e) {
        imageBase64 = e.target.result
        // fileObj.url = URL.createObjectURL(uploadedFile);
        fileObj.url = imageBase64
        setFlieList([...fileList, fileObj]);
        if (props.autoUpload) {
          postFile(fileObj);
        }
        reader = null
    })
   
    // 是否自动上传
    // fileLists.push(fileObj)
    
  };

  const postFile = (readyFile: UploadFile) => {
    const formData = new FormData();
    formData.append('file', readyFile.raw);
    axios
      .post(props.action, formData)
      .then(({data}) => {
        if (data) {
          readyFile.status = 'success';
          readyFile.resp = data;
          // setRespArr([data, ...respArr]);
          setPageBackground(`url(${readyFile.url}) no-repeat center / 100% 100%`)
          props.success({resp: data, file: readyFile, list: fileList});
        } else {
          readyFile.status = 'error';
          props.fail(new Error(data));
        }
      })
      .catch((err) => {
        readyFile.status = 'error';
        props.fail(new Error(err));
      })
      .finally(() => {
        if (inputRef.current && inputRef.current.value) {
          inputRef.current.value = '';
        }
      });
  };

  const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault();
    setIsDragOver(over);
  };
  const handleDrap = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer) {
      beforeUploadCheck(e.dataTransfer.files);
    }
  };

  const handleCropper = () => {
    setIsModalVisible(true)
    console.log(cropperImg.current)
    

  }
  const handleOk = () => {
    setIsModalVisible(false)
    if(cropData) {
      // console.log(cropData)
      let res = cropper.getCroppedCanvas().toDataURL()
      // console.log(res)
      fileList[0].url = res
      setPageBackground(`url(${res}) no-repeat center / 100% 100%`)
    }
  }
  const handleCancel =()=> {
    setIsModalVisible(false)
  }
  return (
    <div>
      {!fileList.length ? (
        <div
          className={styles.uploader_box}
          onClick={(e: MouseEvent) => handleClick(e)}
          onDragOver={(e: DragEvent) => {
            handleDrag(e, true);
          }}
          onDragLeave={(e: DragEvent) => {
            handleDrag(e, false);
          }}
          onDrop={(e: DragEvent) => handleDrap(e)}
        >
          {/* {props.children} */}
          <p className={styles.uploader_box_span}>
            <span>上传背景图片</span>
            <br />
            <span>可拖拽至此区域</span>
          </p>

          <input
            ref={inputRef}
            style={{display: 'none'}}
            type="file"
            onChange={(e: ChangeEvent) => handleFileChange(e)}
          />
        </div>
      ) : (
        <div className={styles.uploader_box_img}>
          <div
            style={{
              background: `url(${fileList[0] && fileList[0].url}) no-repeat center / 100% 100%`,
              width: '150px',
              height: '150px',
            }}
          ></div>
          <div>
            <Button onClick={handleCropper}>裁剪图片</Button><br></br>
            <Button>重新上传</Button><br></br>
            <Button>删除图片</Button>
          </div>
        </div>
      )}
      {/* modal */}
      <Modal width={700} title="裁剪图片" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{width: '100%'}}>
          <img ref={cropperImg} src={fileList[0] && fileList[0].url as string} alt="" style={{width: '100%', height: 'auto'}} />
        </div>
      </Modal>
    </div>
  );
};
export default Uploader;
