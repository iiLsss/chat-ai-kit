
import { Role,  MessageItem } from "@/types/openai";
import Message from "./Message";

interface Props{
  list: MessageItem[]
  onStopResponse: (id: string) => void
  onRetry: (id: string) => void
}

const MessageList = ({ list, onStopResponse, onRetry }: Props) => {
	return (
		<div className='w-9/12 max-w-4xl mx-auto my-3'>
			{list.map((item) => (
				<Message item={item} key={item.id} onRetry={onRetry} onStopResponse={onStopResponse} />
			))}
		</div>
	)
}


export default MessageList