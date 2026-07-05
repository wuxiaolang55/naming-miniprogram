// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const favorites = wx.getStorageSync('favorites') || []
    this.globalData.favorites = favorites
  },

  globalData: {
    favorites: [],
    userInfo: null
  },

  // 添加收藏
  addFavorite(name) {
    const favorites = this.globalData.favorites
    const exists = favorites.find(item => item.fullName === name.fullName)
    if (!exists) {
      favorites.unshift({
        ...name,
        favoriteTime: new Date().getTime()
      })
      wx.setStorageSync('favorites', favorites)
      return true
    }
    return false
  },

  // 移除收藏
  removeFavorite(fullName) {
    let favorites = this.globalData.favorites
    favorites = favorites.filter(item => item.fullName !== fullName)
    this.globalData.favorites = favorites
    wx.setStorageSync('favorites', favorites)
  },

  // 检查是否已收藏
  isFavorite(fullName) {
    return this.globalData.favorites.some(item => item.fullName === fullName)
  }
})
