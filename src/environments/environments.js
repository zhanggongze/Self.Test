/*
 * @Author: zgz
 * @Date: 2019-09-06 16:33:36
 * @LastEditTime: 2020-04-20 14:15:19
 * @LastEditors: zgz
 * @Description: file conten
 */
let configtUrl = window.location.search.split('=')[1]//活动配置文件地址

//开发环境
const environment = {
    FILEBASEURL: "https://qcloud.resource.dev.hygeian.com.cn/activity/"+configtUrl
};

//预发布环境
// const environment = {
//     FILEBASEURL: "https://pre-public-1300222288.cos.ap-chengdu.myqcloud.com/"+configtUrl
// };


//生产环境
// const environment = {
//     FILEBASEURL: "https://qcloud.resource.pro.hygeian.com.cn/"+configtUrl
// };

export default environment;