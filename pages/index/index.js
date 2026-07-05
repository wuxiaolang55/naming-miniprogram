// pages/index/index.js
const { generateNames, getSurnameInfo, calculateWuxing } = require('../../utils/nameGenerator')
const app = getApp()

Page({
  data: {
    surname: '',
    surnameInfo: null,
    gender: 'male',
    birthDate: '',
    count: 10,
    names: [],
    generating: false,
    wuxingResult: null
  },

  onLoad() {
    // 页面加载
  },

  // 跳转到收藏页
  goToFavorites() {
    wx.navigateTo({
      url: '/pages/result/result'
    })
  },

  // 姓氏输入
  onSurnameInput(e) {
    const surname = e.detail.value
    const surnameInfo = getSurnameInfo(surname)
    
    this.setData({
      surname,
      surnameInfo
    })
  },

  // 性别选择
  onGenderSelect(e) {
    const gender = e.currentTarget.dataset.gender
    this.setData({ gender })
  },

  // 日期选择
  onDateChange(e) {
    const birthDate = e.detail.value
    this.setData({ birthDate })
  },

  // 数量选择
  onCountSelect(e) {
    const count = parseInt(e.currentTarget.dataset.count)
    this.setData({ count })
  },

  // 是否可以生成
  get canGenerate() {
    return this.data.surname.length > 0 && !this.data.generating
  },

  // 生成名字
  onGenerate() {
    const { surname, gender, birthDate, count, generating } = this.data
    
    // 验证
    if (!surname) {
      wx.showToast({
        title: '请输入姓氏',
        icon: 'none'
      })
      return
    }
    
    if (generating) return
    
    // 开始生成
    this.setData({ generating: true })
    
    // 计算五行
    let wuxingPref = null
    let wuxingResult = null
    if (birthDate) {
      wuxingResult = calculateWuxing(birthDate)
      wuxingPref = wuxingResult.complementary
    }
    
    // 生成名字
    setTimeout(() => {
      const names = generateNames(surname, gender, wuxingPref, count)
      
      // 标记收藏状态
      names.forEach(name => {
        name.isFavorite = app.isFavorite(name.fullName)
      })
      
      this.setData({
        names,
        wuxingResult,
        generating: false
      })
      
      wx.showToast({
        title: `生成${names.length}个名字`,
        icon: 'success'
      })
    }, 500)
  },

  // 点击名字
  onNameTap(e) {
    const index = e.currentTarget.dataset.index
    const name = this.data.names[index]
    
    wx.showModal({
      title: name.fullName,
      content: this.formatNameDetail(name),
      showCancel: true,
      cancelText: '关闭',
      confirmText: '收藏',
      success: (res) => {
        if (res.confirm) {
          this.toggleFavorite(index)
        }
      }
    })
  },

  // 格式化名字详情
  formatNameDetail(name) {
    let content = `评分：${name.score}分\n\n`
    
    if (name.meanings.length > 0) {
      content += '寓意：\n'
      name.meanings.forEach(m => {
        content += `${m.char}：${m.meaning}\n`
      })
    }
    
    if (name.wuxing.length > 0) {
      content += '\n五行：'
      content += name.wuxing.map(w => `${w.char}(${w.element})`).join(' ')
    }
    
    return content
  },

  // 切换收藏
  onToggleFavorite(e) {
    const index = e.currentTarget.dataset.index
    this.toggleFavorite(index)
  },

  toggleFavorite(index) {
    const names = this.data.names
    const name = names[index]
    
    if (name.isFavorite) {
      app.removeFavorite(name.fullName)
      name.isFavorite = false
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    } else {
      app.addFavorite(name)
      name.isFavorite = true
      wx.showToast({
        title: '已收藏',
        icon: 'success'
      })
    }
    
    this.setData({ names })
  },

  // 复制名字
  onCopyName(e) {
    const name = e.currentTarget.dataset.name
    wx.setClipboardData({
      data: name,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        })
      }
    })
  }
})
