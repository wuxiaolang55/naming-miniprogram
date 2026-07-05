// utils/nameGenerator.js - 名字生成器

const { MALE_CHARS, FEMALE_CHARS, NEUTRAL_CHARS, CHAR_MEANINGS, FIVE_ELEMENTS, SURNAMES_INFO } = require('./nameData')

/**
 * 获取可用字符池
 */
function getCharPool(gender, wuxingPref = null) {
  let chars = []
  
  // 根据性别选择基础字符
  if (gender === 'male') {
    chars = [...MALE_CHARS]
  } else if (gender === 'female') {
    chars = [...FEMALE_CHARS]
  } else {
    chars = [...NEUTRAL_CHARS]
  }
  
  // 如果有五行偏好，优先选择对应五行的字
  if (wuxingPref && wuxingPref.length > 0) {
    const wuxingChars = chars.filter(char => {
      const charWuxing = FIVE_ELEMENTS[char]
      return wuxingPref.includes(charWuxing)
    })
    if (wuxingChars.length > 0) {
      chars = wuxingChars
    }
  }
  
  return chars
}

/**
 * 计算名字评分
 */
function calculateNameScore(givenName, surname) {
  let score = 60 // 基础分
  
  // 字义加分
  for (const char of givenName) {
    if (CHAR_MEANINGS[char]) {
      score += 5
    }
  }
  
  // 音韵加分（避免同音字）
  if (givenName.length > 1 && givenName[0] !== givenName[1]) {
    score += 10
  }
  
  // 笔画平衡加分
  const totalLen = surname.length + givenName.length
  if (totalLen === 3 || totalLen === 4) {
    score += 10
  }
  
  return Math.min(score, 100)
}

/**
 * 生成单个名字
 */
function generateSingleName(surname, gender, wuxingPref = null, length = 2) {
  const charPool = getCharPool(gender, wuxingPref)
  
  let givenName = ''
  
  if (length === 1) {
    // 单字名
    const char = charPool[Math.floor(Math.random() * charPool.length)]
    givenName = char
  } else {
    // 双字名
    const idx1 = Math.floor(Math.random() * charPool.length)
    let idx2 = Math.floor(Math.random() * charPool.length)
    
    // 避免重复字
    let attempts = 0
    while (idx2 === idx1 && charPool.length > 1 && attempts < 10) {
      idx2 = Math.floor(Math.random() * charPool.length)
      attempts++
    }
    
    givenName = charPool[idx1] + charPool[idx2]
  }
  
  const fullName = surname + givenName
  const score = calculateNameScore(givenName, surname)
  
  // 获取名字含义
  const meanings = []
  for (const char of givenName) {
    if (CHAR_MEANINGS[char]) {
      meanings.push({
        char,
        meaning: CHAR_MEANINGS[char]
      })
    }
  }
  
  // 获取五行属性
  const wuxingInfo = []
  for (const char of givenName) {
    if (FIVE_ELEMENTS[char]) {
      wuxingInfo.push({
        char,
        element: FIVE_ELEMENTS[char]
      })
    }
  }
  
  return {
    fullName,
    surname,
    givenName,
    score,
    meanings,
    wuxing: wuxingInfo
  }
}

/**
 * 生成多个候选名字
 */
function generateNames(surname, gender, wuxingPref = null, count = 10) {
  const names = []
  const usedNames = new Set()
  const maxAttempts = count * 10
  
  let attempts = 0
  while (names.length < count && attempts < maxAttempts) {
    attempts++
    const nameInfo = generateSingleName(surname, gender, wuxingPref)
    
    // 避免重复
    if (!usedNames.has(nameInfo.fullName)) {
      usedNames.add(nameInfo.fullName)
      names.push(nameInfo)
    }
  }
  
  // 按评分排序
  names.sort((a, b) => b.score - a.score)
  
  return names
}

/**
 * 获取姓氏信息
 */
function getSurnameInfo(surname) {
  return SURNAMES_INFO[surname] || null
}

/**
 * 计算五行（简化版）
 */
function calculateWuxing(birthDate) {
  // 简化的五行计算：根据出生日期的数字和
  const dateStr = birthDate.replace(/-/g, '')
  let sum = 0
  for (const char of dateStr) {
    sum += parseInt(char, 10)
  }
  
  // 根据数字和判断五行
  const elements = ['金', '木', '水', '火', '土']
  const counts = {}
  
  // 简化：随机分配五行缺失
  const idx = sum % 5
  const lacking = elements[idx]
  
  // 返回需要补充的五行
  const complementary = []
  complementary.push(elements[(idx + 2) % 5])
  if (Math.random() > 0.5) {
    complementary.push(elements[(idx + 3) % 5])
  }
  
  return {
    lacking,
    complementary
  }
}

module.exports = {
  generateNames,
  generateSingleName,
  getSurnameInfo,
  calculateWuxing,
  getCharPool,
  CHAR_MEANINGS,
  FIVE_ELEMENTS
}
