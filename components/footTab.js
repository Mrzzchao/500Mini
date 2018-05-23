// pages/kaijiang/comp/footTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    kjPath: {
      type: String,
      value: ''
    },
    datachartPath: {
      type: String,
      value: ''
    },
    helpPath: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '500彩票'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select: 'kj'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(type) {
      console.log(type)
      this.setData({
        select: type
      })
    }
  }
})
