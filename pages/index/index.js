//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nav: ['未做事项', '已做事项'],
    activeNav: '未做事项',
    // 未做事件和已做事件
    contentData: [
      {
        id: 1,
        date: '09:25',
        content: 'test紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急紧急',
        leave: '紧急',
        flag: true,
      },
      {
        id: 2,
        date: '09:25',
        content: 'test',
        leave: '紧急',
        flag: true,
      },
      {
        id: 3,
        date: '09:25',
        content: 'test',
        leave: '紧急',
        flag: true,
      },
    ],
    dialogIsShow: false,
    buttText: [
      { text: '确定' },
      { text: '取消' },
    ],
    leaves: ['正常', '紧急'],
    rules: [
      {
        name: 'content',
        rules: {required: true, message: '内容不能为空'},
      },
    ],
    // 弹窗数据
    date: '',
    content: '',
    leave: '正常'
  },
  // 导航栏点击事件
  onNavTap(event){
    console.log();
    this.setData({
      activeNav: event.currentTarget.dataset.navName
    });
  },
  // 添加tap
  onAddTap(){
    this.setData({
      dialogIsShow: true
    });
  },
  // 弹窗单选变化
  radioChange(event){
    console.log(event.detail.value);
    this.setData({
      leave: event.detail.value
    });
  },
  // 添加新事项
  onTapDialogButton(event){
    let data = {};
    if(event.detail.index === 0 && this.data.content !== ''){
      // this.selectComponent('#form').validate((valid, errors) => {
      //   console.log('valid', valid, errors)
      //   if (!valid) {
      //       const firstError = Object.keys(errors)
      //       if (firstError.length) {
      //           this.setData({
      //               error: errors[firstError[0]].message
      //           })

      //       }
      //   } else {
      //       wx.showToast({
      //           title: '校验通过'
      //       })
      //   }
      // });
      let time = new Date();
      let newData = this.data.contentData;
      data = {
        id: Math.round(Math.random()*1000000000),
        date: time.getHours() + ':' + time.getMinutes(),
        leave: this.data.leave,
        content: this.data.content,
        flag: true
      };
      if(data.leave === '正常'){
        newData.push(data);
      }else{
        let i = newData.findIndex(item => item.leave === '紧急');
        if(i === -1 || i === 0){
          newData.unshift(data);
        }else{
          newData = newData.slice(0, i).concat([data]).concat(newData.slice(i))
        }
      }
      this.setData({
        contentData: newData,
        dialogIsShow: false,
        // leave: '正常',
        content: ''
      });
    }else{
      this.setData({
        dialogIsShow: false,
        leave: '正常',
        content: ''
      });
    }
  },
  // 事项被点击
  onCheckboxChange(event){
    let index = this.data.contentData.findIndex(item => item.id === +event.detail.value[0]);
    let key = `contentData[${index}].flag`;
    this.setData({
      [key]: !this.data.contentData[index].flag
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
})
