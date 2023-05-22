// 复制到剪切板
export async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      // TODO: 复制成功
    }).catch(() => {
      clipboard(text)
    })
  } else {
    clipboard(text)
  }
}

// 复制到剪切板
function clipboard (text:string) {
  const tempElement = document.createElement('textarea');
  tempElement.style.position = 'fixed'
  tempElement.style.opacity = '0'
  tempElement.value = text
  document.body.appendChild(tempElement)
  tempElement.select()
  document.execCommand('copy')
  document.body.removeChild(tempElement)
}