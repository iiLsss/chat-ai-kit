import './index.css'

const Analyzing = [
	'Extracting Exact Quotes',
	'Discussing an Essay',
	'Summarizing a News Article',
	'Prescreening User Queries',
	'Contrasting Perspectives in Three Articles',
	'Explaining the Constitutional Al Paper',
	'Summarize Product Reviews',
	'Summarize Terms of Service',
]

const Writing = [
	'Write a Blog Post',
	'Reply to Emails',
	'Flash Fiction',
	'Construct and Fill Templates',
	'Continue the Story',
	'Text from Bullet Points',
	'Three Character Script',
	'Handling a Difficult Conversation',
]

const Learning = [
	'English Dialogues for Spanish Speakers',
	'Teach Me About GANs',
	'Sentence-by-Sentence Critique',
	'Learning French Dialogue',
]

const Welcome = () => {
	return (
		<div className='w-full h-full p-6 text-stone-600'>
			<p className='text-lg font-bold'>Example Capabilities</p>
			<p className='sub-title'>Analyzing Documents</p>
			<div className='flex flex-wrap mb-4'>
				{Analyzing.map((item, index) => {
					return (
						<div className='item-text' key={index}>
							{item}
						</div>
					)
				})}
			</div>
			<p className='sub-title'>Writing and Conversation</p>
			<div className='flex flex-wrap mb-4'>
				{Writing.map((item, index) => {
					return (
						<div className='item-text' key={index}>
							{item}
						</div>
					)
				})}
			</div>
			<p className='sub-title'>Learning</p>
			<div className='flex flex-wrap'>
				{Learning.map((item, index) => {
					return (
						<div className='item-text' key={index}>
							{item}
						</div>
					)
				})}
			</div>
			
		</div>
	)
}

export default Welcome
