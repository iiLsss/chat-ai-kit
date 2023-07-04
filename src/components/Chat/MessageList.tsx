
import { Role,  MessageItem } from "@/types/openai";
import Message from "./Message";

interface Props{
  list: MessageItem[]
  onStopResponse: (id: string) => void
  onRetry: (id: string) => void
}

const MessageList = ({ list, onStopResponse, onRetry }: Props) => {
	return (
		<div className='w-full mx-auto my-3 md:w-9/12 md:max-w-4xl'>
			{list.map((item) => (
				<Message item={item} key={item.id} onRetry={onRetry} onStopResponse={onStopResponse} />
			))}
		</div>
	)
}


export default MessageList