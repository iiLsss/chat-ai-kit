'use client'

import React, {Suspense} from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
// import RemarkEmoji from 'remark-emoji'
// import RemarkToc from 'remark-toc'
// import RemarkSlug from 'remark-slug'
import CodeBlock from './CodeBlock'

import 'katex/dist/katex.min.css'


type MarkDownProps = {
  content: string
}

const MarkDown: React.FC<MarkDownProps> = ({ content }) => {
  return (
    <div className='text-xs markdown-body'>
      <Suspense >
        <ReactMarkdown 
          components={{code: CodeBlock}}
          remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
          rehypePlugins={[
            RehypeKatex
          ]}
        >
          {content}
        </ReactMarkdown>
      </Suspense>
    </div>
  )
}
export default MarkDown