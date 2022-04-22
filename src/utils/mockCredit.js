import dayjs from 'dayjs'
const nowDay = dayjs().format('YYYY-MM-DD');
export const listData = [
    {
      uuid: '001',
      type: '外贸',
      name: '玉环市鑫宝达金属制品有限公司',
      area: '芦蒲镇',
      currnode: '签约反馈',
      time: '2021/11/08 13:24:06',
      state: '1'
    },
    {
      uuid: '002',
      type: '外贸',
      name: '台州德隆泰机械有限公司',
      area: '玉城街道',
      currnode: '出运申请',
      time: '2021/11/06 10:24:06',
      state: '2'
    },
    {
      uuid: '003',
      type: '外贸',
      name: '浙江怡泛科技有限公司',
      area: '楚门镇',
      currnode: '等待批复',
      time: '2021/11/15 10:20:06',
      state: '3'
    },  
    {
      uuid: '004',
      type: '外贸',
      name: '浙江金硕阀门股份有限公司',
      area: '经济开发区',
      currnode: '限额申请',
      time: '2021/11/02 9:54:06',
      state: '2'
    },
    {
      uuid: '005',
      type: '内贸',
      name: '玉环津力汽车配件有限公司',
      area: '玉城街道',
      currnode: '出运申请',
      time: '2021/11/09 9:20:06',
      state: '2'
    },
    {
      uuid: '006',
      type: '外贸',
      name: '浙江环日洁具有限公司',
      area: '芦蒲镇',
      currnode: '限额申请',
      time: '2021/11/05 9:05:06',
      state: '2'
    },
    {
      uuid: '007',
      type: '外贸',
      name: '浙江玉兴进出口有限公司',
      area: '楚门镇',
      currnode: '投保申请',
      time: '2021/11/03 9:01:06',
      state: '2'
    }
];

export const listDetails = {
    '001':{
      name: '玉环市鑫宝达金属制品有限公司',  
      process:[
          {
            imgIndex: 4,
            count: '投保申请',
            countText: nowDay,
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 1,
            count: '受理批复',
            countText: nowDay,
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 2,
            count: '限额申请',
            countText: nowDay,
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 3,
            count: '签约反馈',
            countText: nowDay,
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 5,
            count: '投保申请',
            countText: nowDay,
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            isNoCount: true,
            lastCount: 3,
            rate: '56%'
          },
          {
            imgIndex: 6,
            count: 26.599,
            countText: '保单融资(万元)',
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            isNoBottom: true,
            rate: '56%'
          },
          {
            imgIndex: 6,
            count: 6.4,
            countText: '保单补助(万元)',
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            isNoBottom: true,
            rate: '56%'
          }
      ],
      value1: 392.35,
      value2: 1.33,
      value3: 3,
      value4: '圣彼得堡',
      value5: '--',
      value6: '--',
      value7: '--',
      value8: '--',
      value9: 30,
      value10: 26.599,
      value11: 8,
      value12: 6.4,

      valuea: '是',
      valueb: '否',
      valuec: '是',
      valued: '是',
    },
    '005':{
      name: '玉环津力汽车配件有限公司',  
      process:[
          {
            imgIndex: 4,
            count: '投保申请',
            countText: '2021-11-09',
            oldTime: '48小时',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 1,
            count: '受理批复',
            countText: '2021-11-09',
            oldTime: '96小时',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 2,
            count: '限额申请',
            countText: '2021-11-10',
            oldTime: '48小时',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 3,
            count: '签约反馈',
            countText: '2021-11-11',
            oldTime: '96小时',
            newTime: '1小时',
            layoutTwo: false,
            rate: '56%'
          },
          {
            imgIndex: 5,
            count: '投保申请',
            countText: nowDay,
            oldTime: '12小时',
            newTime: '5分钟',
            layoutTwo: false,
            isNoCount: true,
            lastCount: 3,
            rate: '56%'
          },
          {
            imgIndex: 6,
            count: 800,
            countText: '保单融资(万元)',
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            isNoBottom: true,
            rate: '56%'
          },
          {
            imgIndex: 6,
            count: 22.1,
            decimals: true,
            countText: '保单补助(万元)',
            oldTime: '2天',
            newTime: '1小时',
            layoutTwo: false,
            isNoBottom: true,
            rate: '56%'
          }
      ],
      value1: 1240,
      value2: 4.00,
      value3: 3,
      value4: '法兰克福',
      value5: '3150',
      value6: '18.9',
      value7: '0',
      value8: '广州',
      value9: 800,
      value10: 360,
      value11: 22.1,
      value12: 22.1,

      valuea: '是',
      valueb: '是',
      valuec: '是',
      valued: '是',
    }
  }