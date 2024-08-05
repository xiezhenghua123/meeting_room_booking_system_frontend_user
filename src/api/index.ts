import { Http } from "../utils/http";

const httpInstance = new Http();

export const login = httpInstance.post('/user/login', { loading: true, successMessage: '登录成功' });

export const register = httpInstance.post('/user/register', { loading: true, successMessage: '注册成功' });

export const registerCaptcha = httpInstance.get('/user/register-captcha', { loading: true, successMessage: '发送成功' });

export const updatePassword = httpInstance.post('/user/password', { loading: true, successMessage: '修改成功' });

export const updatePasswordCaptcha = httpInstance.get('/user/password-captcha', { loading: true, successMessage: '发送成功' });

// 获取用户信息
export const getUserInfo = httpInstance.get('/user/info', { loading: true });

// 更改用户信息邮箱验证码
export const updateUserInfoCaptcha = httpInstance.get('/user/update-captcha', {loading: true, successMessage: '发送成功'})

// 更新用户信息
export const updateUserInfo = httpInstance.post('user/update',{loading:true, successMessage: '更新成功'})

// 上传图片
export const uploadImage = httpInstance.upload('/user/upload');

// 检查是否登录
export const checkLogin = httpInstance.get('/user/check-login', { loading: true });