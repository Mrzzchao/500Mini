// components/home/quanguo/quanguo.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获得全国彩种
    getQuanguo() {
      app.Ajax.getQuanguo().then((data) => {
        const list = this.formatQuanguo(data)
        this.setData(list)
        console.log(list)
      })
    }
  },

  attached() {
    this.getQuanguo()
  }
});
