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
    leave: '正常',
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
    this.setData({
      leave: event.detail.value
    });
  },
  // input输入发生变化
  onInputChange(event){
    this.setData({
      content: event.detail.value,
    });
  },
  // 添加新事项
  onTapDialogButton(event){
    let data = {};
    if(event.detail.index === 0 && this.data.content !== ''){
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
    }else if(this.data.content === ''){
      wx.showToast({
        title: '内容为必填项',
        icon: 'none'
      })
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
})
