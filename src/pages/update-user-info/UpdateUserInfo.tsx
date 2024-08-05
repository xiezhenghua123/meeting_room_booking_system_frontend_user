import SendCaptcha from '@/components/send-captcha/SendCpatcha'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Upload,
  UploadFile
} from 'antd'
import { FormProps, useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import './index.scss'
import {
  getUserInfo,
  updateUserInfo,
  updateUserInfoCaptcha,
  uploadImage
} from '@/api'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useNavigate } from 'react-router-dom'
import { addPrefixToPath, removePrefixToPath } from '@/utils/utils'

type InfoField = {
  headPic: string
  nickName: string
  email: string
  phoneNumber: string
  captcha: string
}

const UploaderUserInfo = () => {
  const [form] = useForm<InfoField>()
  const navigate = useNavigate()
  useEffect(() => {
    // 获取用户信息
    async function getUserInfoData() {
      const { data } = await getUserInfo<InfoField, null>()
      if (data) {
        // 头像
        if (data.headPic) {
          const file: UploadFile = {
            uid: Math.random().toString(),
            name: 'image.png',
            status: 'done',
            url: addPrefixToPath(data.headPic)
          }
          setFileList([file])
          form.setFieldValue('headPic', addPrefixToPath(data.headPic))
        }
        form.setFieldValue('nickName', data.nickName)
        form.setFieldValue('email', data.email)
        form.setFieldValue('phoneNumber', data.phoneNumber)
      }
    }
    getUserInfoData()
  }, [])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish: FormProps<InfoField>['onFinish'] = async values => {
    if (fileList.length && fileList[0]?.response) {
      values.headPic = removePrefixToPath(fileList[0]?.response)
    } 
    await updateUserInfo<string, InfoField>(values)
    navigate('/')
  }

  const customRequest = async ({
    file,
    onSuccess = () => {},
    onError = () => {}
  }: UploadRequestOption<string>) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      setLoading(true)
      const { data } = await uploadImage<string, FormData>(formData)
      const dataUrl = addPrefixToPath(data)
      const newFile: UploadFile = {
        uid: Math.random().toString(),
        name: 'image.png',
        status: 'done',
        url: dataUrl
      }
      form.setFieldValue('headPic', dataUrl)
      setFileList([newFile])
      onSuccess(dataUrl)
    } catch (error) {
      onError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  const beforeUpload = (file: File) => {
    // 限制图片大小
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2MB')
    }
    return isLt2M
  }

  const removeChange = () => {
    setFileList([])
  }

  const sendCaptcha = async () => {
    await updateUserInfoCaptcha<string, { email: string }>({
      email: form.getFieldValue('email')
    })
  }

  const uploadButton = (
    <button className="border-0 bg-transparent" type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload</div>
    </button>
  )

  return (
    <div className="mt-12">
      {' '}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="w-2xl ma"
        size="large"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<InfoField>
          label="头像"
          name="headPic"
          className="avatar-uploader"
          rules={[
            {
              required: true,
              message: '请选择头像',
              validator() {
                if (!fileList.length) {
                  return Promise.reject('请选择头像')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Upload
            accept="image/*"
            listType="picture-circle"
            maxCount={1}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            // showUploadList={false}
            fileList={fileList}
            onRemove={removeChange}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            {fileList.length ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item<InfoField>
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="昵称" />
        </Form.Item>
        <Form.Item<InfoField>
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            {
              type: 'email',
              message: '邮箱格式不正确'
            }
          ]}
        >
          <Input placeholder="邮箱" disabled />
        </Form.Item>
        <Form.Item<InfoField>
          label="手机号"
          name="phoneNumber"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式不正确'
            }
          ]}
        >
          <Input placeholder="手机号" />
        </Form.Item>
        <Form.Item<InfoField>
          label="验证码"
          name="captcha"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Row className="flex flex-justify-between">
            <Col span={16}>
              <Input placeholder="验证码" />
            </Col>
            <Col span={6}>
              <SendCaptcha sendCaptcha={sendCaptcha} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button className="w-full" type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UploaderUserInfo
