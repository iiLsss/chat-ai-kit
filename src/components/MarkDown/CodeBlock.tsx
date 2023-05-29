'use client'

import { CodeProps } from 'react-markdown/lib/ast-to-react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	oneLight,
	oneDark,
  dracula,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from '@/components/CopyButton'

import './index.css'

const CodeBlock: React.FC<CodeProps> = ({
	node,
	inline,
	className,
	children,
	...props
}) => {
	const match = /language-(\w+)/.exec(className || '')
 
	
	return !inline && match ? (
		<div className='relative code-wrap'>
			<SyntaxHighlighter
				{...props}
				style={oneLight}
				language={match[1]}
				wrapLongLines={true}
				PreTag='div'>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
      <div className='hidden copy-wrap' >
        <CopyButton text={String(children)} />
      </div>
		</div>
	) : (
		<code {...props} className={className} style={{
			whiteSpace: 'pre-wrap',
			wordSpacing: 'normal',
			wordBreak: 'normal',
		}}>
			{children}
		</code>
	)
}

export default CodeBlock
