// pages/result/result.js
const app = getApp()

Page({
  data: {
    favorites: []
  },

  onLoad() {
    this.loadFavorites()
  },

  onShow() {
    this.loadFavorites()
  },

  // 加载收藏
  loadFavorites() {
    const favorites = app.globalData.favorites || []
    
    // 格式化时间
    favorites.forEach(item => {
      if (item.favoriteTime) {
        const date = new Date(item.favoriteTime)
        item.favoriteTimeStr = this.formatTime(date)
      }
    })
    
    this.setData({ favorites })
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
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
  },

  // 删除收藏
  onRemoveFavorite(e) {
    const index = e.currentTarget.dataset.index
    const name = e.currentTarget.dataset.name
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          app.removeFavorite(name)
          this.loadFavorites()
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  // 清空全部
  onClearAll() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空全部收藏吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          app.globalData.favorites = []
          wx.setStorageSync('favorites', [])
          this.setData({ favorites: [] })
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  }
})
