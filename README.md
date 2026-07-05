# 👶 起名小程序 - 微信小程序版

一个功能完整的中文姓名生成器微信小程序，根据姓氏、性别、五行等条件生成寓意美好的中文名字。

## ✨ 功能特点

- 🎯 **智能起名**：根据性别智能选择字库
- 🔮 **五行分析**：根据出生日期计算五行，推荐补益五行
- 📖 **寓意丰富**：每个字都有详细的含义解释
- ⭐ **评分系统**：对生成的名字进行综合评分
- ❤️ **收藏功能**：收藏喜欢的名字，随时查看
- 📋 **一键复制**：快速复制名字到剪贴板

## 📁 项目结构

```
naming_miniprogram/
├── app.js                 # 小程序入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 站点地图
├── pages/
│   ├── index/             # 起名页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── result/            # 收藏页面
│       ├── result.js
│       ├── result.json
│       ├── result.wxml
│       └── result.wxss
└── utils/
    ├── nameData.js        # 名字数据库
    └── nameGenerator.js   # 名字生成器
```

## 🚀 部署步骤

### 1. 下载微信开发者工具

访问 [微信开发者工具下载页面](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，下载并安装对应系统的版本。

### 2. 注册小程序账号

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 点击"立即注册"，选择"小程序"
3. 按提示完成注册流程
4. 在"开发管理" → "开发设置"中获取 **AppID**

### 3. 导入项目

1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择 `naming_miniprogram` 目录
4. 填入你的 AppID（或使用测试号）
5. 点击"导入"

### 4. 修改 AppID

编辑 `project.config.json`，将 `appid` 改为你的 AppID：

```json
{
  "appid": "你的AppID",
  ...
}
```

### 5. 添加 TabBar 图标（可选）

在项目根目录创建 `images` 文件夹，添加以下图标：
- `tab-name.png` - 起名图标（未选中）
- `tab-name-active.png` - 起名图标（选中）
- `tab-fav.png` - 收藏图标（未选中）
- `tab-fav-active.png` - 收藏图标（选中）

图标尺寸建议：81×81 像素

**或者**，如果暂时没有图标，可以修改 `app.json`，删除 `tabBar` 配置：

```json
{
  "pages": [
    "pages/index/index",
    "pages/result/result"
  ],
  "window": {
    ...
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

### 6. 预览和调试

1. 在开发者工具中点击"编译"
2. 在模拟器中预览效果
3. 点击"预览"生成二维码，用微信扫码体验

### 7. 上传发布

1. 点击"上传"按钮
2. 填写版本号和项目备注
3. 登录微信公众平台，在"版本管理"中提交审核
4. 审核通过后点击"发布"即可上线

## 📱 界面预览

### 起名页面
- 输入姓氏，显示姓氏简介
- 选择性别（男孩/女孩）
- 可选输入出生日期进行五行分析
- 选择生成数量（5/10/20个）
- 点击生成，展示名字列表

### 收藏页面
- 查看所有收藏的名字
- 复制名字到剪贴板
- 删除单个收藏
- 清空全部收藏

## 🔧 自定义配置

### 修改主题颜色

编辑 `app.wxss` 中的 CSS 变量：

```css
page {
  --primary-color: #4A90D9;    /* 主色调 */
  --secondary-color: #5CB3CC;  /* 次色调 */
  --accent-color: #FF6B6B;     /* 强调色 */
  ...
}
```

### 添加更多字库

编辑 `utils/nameData.js`，在 `MALE_CHARS` 或 `FEMALE_CHARS` 数组中添加新字，并在 `CHAR_MEANINGS` 中添加含义解释。

## 📝 注意事项

1. **AppID**：正式发布需要真实的 AppID，开发测试可使用测试号
2. **域名配置**：本小程序为纯本地应用，无需配置服务器域名
3. **审核规范**：提交审核前请确保内容符合微信小程序运营规范
4. **数据存储**：收藏数据存储在用户本地，清除小程序数据会丢失

## 🙏 致谢

感谢使用本起名小程序，祝您的宝宝健康成长，前程似锦！

---

## 📄 License

MIT License
