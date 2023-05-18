import ReactMarkdown from 'react-markdown'
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RemarkEmoji from 'remark-emoji'
import RemarkToc from 'remark-toc'
import RemarkSlug from 'remark-slug'
import 'katex/dist/katex.min.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type MarkDownProps = {
  content: string
}


const MarkDown: React.FC<MarkDownProps> = ({ content }) => {
  return (
    <div className='text-xs markdown-body'>
      <ReactMarkdown 
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex
        ]}
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

        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
export default MarkDown