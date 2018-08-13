module.exports = {
  body: {
    accountList:[
      {
        money: "10000.00",
        name: "巴啦啦",
        accountNum: "6217000909090909095876",
        now: "1"
      },
      {
        money: "6000.00",
        name: "巴啦啦",
        accountNum: "6217000909090909096676",
        now: "0"
      },
      {
        money: "600000.00",
        name: "巴啦啦",
        accountNum: "62170009090909090958884444",
        now: "0"
      }
    ],
    branchesList: [
      {
        label: '北京',
        value: '01',
        children: [
          {
            label: '东城区',
            value: '01-1',
            children: [
              {
                label: '支行1',
                value: '01-1-1',
              },
              {
                label: '支行2',
                value: '01-1-2',
              },
              {
                label: '支行2',
                value: '01-1-3',
              },
            ],
          },
          {
            label: '西城区',
            value: '01-2',
          },
          {
            label: '崇文区',
            value: '01-3',
          },
          {
            label: '宣武区',
            value: '01-4',
          },
        ],
      },
      {
        label: '浙江',
        value: '02',
        children: [
          {
            label: '杭州',
            value: '02-1',
            children: [
              {
                label: '西湖区',
                value: '02-1-1',
              },
              {
                label: '上城区',
                value: '02-1-2',
              },
              {
                label: '江干区',
                value: '02-1-3',
              },
              {
                label: '下城区',
                value: '02-1-4',
              },
            ],
          },
          {
            label: '宁波',
            value: '02-2',
            children: [
              {
                label: 'xx区',
                value: '02-2-1',
              },
              {
                label: 'yy区',
                value: '02-2-2',
              },
            ],
          },
          {
            label: '温州',
            value: '02-3',
          },
          {
            label: '嘉兴',
            value: '02-4',
          },
          {
            label: '湖州',
            value: '02-5',
          },
          {
            label: '绍兴',
            value: '02-6',
          },
        ],
      },
    ]
  }
}