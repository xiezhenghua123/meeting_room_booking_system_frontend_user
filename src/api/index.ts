import { Http } from "../utils/http";

const httpInstance = new Http();

export const login = httpInstance.post('/user/login', { loading: true, successMessage: '登录成功' });

export const register = httpInstance.post('/user/register', { loading: true, successMessage: '注册成功' });

export const registerCaptcha = httpInstance.get('/user/register-captcha', { loading: true, successMessage: '发送成功' });
