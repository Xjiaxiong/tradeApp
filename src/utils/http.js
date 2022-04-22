
import axios from 'axios'
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.error('请求错误---error---', error)
    return Promise.reject(error); 
});
const preFix = '/api';

export const trade_InfosRequest = (tag) => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface1?tag=${tag}`)
}
export const trade_KnowledgeRequest = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface2`)
}
export const trade_ShowRequest = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface3`)
}
export const trade_ShowChartRequest = (tag) => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface4?tag=${tag}`)
}
export const trade_GovRequest = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface5`)
}
export const trade_PartCodeRequest = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface6`)
}
export const trade_interface7Request = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface7`)
}
export const trade_interface8Request = () => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface8`)
}
export const trade_interface9Request = (uuid,uuid1) => {
    return axios.get(`${preFix}/ForeigntradeHomePage/interface9?uuid=${uuid}&uuid1=${uuid1}`)
}
export const trade_interfaceMapData = uuid => {
    return axios.get(`https://menheyoss.oss-cn-hangzhou.aliyuncs.com/boundry/331083.json`)
}