
1. 安装依赖

```bash
npm install react-markdown
```

2. 声明组件

```tsx
import ReactMarkdown from 'react-markdown'
type MarkDownProps = {
  content: string
}

const MarkDown: React.FC<MarkDownProps> = ({ content = '# Hello, World! \n\nThis is **Markdown**.' }) => {
  return (
    <ReactMarkdown>{content}</ReactMarkdown>
  )
}
export default MarkDown
```

3. 完成渲染，页面预览如下

# Hello, World! \n\nThis is **Markdown**.

4. 代码语法高亮
  
```bash
npm install react-syntax-highlighter
```

5. 修改代码

```tsx
import ReactMarkdown from 'react-markdown'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type MarkDownProps = {
  content: string
}


const MarkDown: React.FC<MarkDownProps> = ({ content }) => {
  return (
    <div className='text-sm markdown'>
      <ReactMarkdown 
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={oneLight}
                language={match[1]}
                PreTag="div"
              >
                {
                  String(children).replace(/\n$/, '')
                }
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
      }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
export default MarkDown
```

参考资料
https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
