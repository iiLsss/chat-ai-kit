
/**
 * 生产力提示
 * 1. 更好的决策：我正在尝试决定是否应该（决定）。 你能列出优点吗和做出这个决定的缺点？
 * 2. 创建任何形式的内容：格式：演讲模式，教育、鼓舞人心。目标：为观众撰写有效的句子。其他指示：演讲不超过15分钟。
 * 3. 向最好的学习：在插入您的工作领域中分析表现最好的人。 您可以从这些表现最好的人那里学到哪些最重要的经验教训，以提高您的工作效率？
 * 4. 向最优秀的人学习：我想学习一项技能。请创建一个为期30天的学习计划，帮助我从零开始作为初学者学会这项技能。
 * 5. 请让ChatGPT提供写作提示：我是（填入职业），你能否列举一些最有效的写作提示，帮助我在我的职业中更高效地完成工作并节省时间。
 * 6. 创建个性化的指导者：我目前正在学习（主题）。我希望有一系列问题来测试我的知识水平，我会在答案中找出知识的空缺并提供更好的答案来填补这些空缺。
 * 7. 用80/20规则学习更快： 我对想学的（主题）很感兴趣。请确定覆盖80％的关键学习内容中最重要的20％点，我们一起分享它。
 * 8. 向大师学习技巧：我要像拥有高智商的企业家一样表现出色，结合埃隆马斯克和阿尔伯特·爱因斯坦的特点。我会收到很多商业请求，因此必须回答所有的问题。
 */

const tips = [
	{
		title: '更好的决策',
		content: '我正在尝试决定是否应该（决定）。 你能列出优点吗和做出这个决定的缺点？',
    en: 'I am trying to decide if if I should make a (decision). Could you list the pros and cons of making this decision?'
	},
	{
		title: '创建任何形式的内容',
		content:
			'格式：演讲模式，教育、鼓舞人心。目标：为观众撰写有效的句子。其他指示：演讲不超过15分钟。',
    en: 'Format: speech tone of voice, educational, inspirational. Goal: write effective sentences for the audience. Other instructions: speech no longer than 15 minutes.'

	},
	{
		title: '向最好的学习',
		content:
			'在插入您的工作领域中分析表现最好的人。 您可以从这些表现最好的人那里学到哪些最重要的经验教训，以提高您的工作效率？',
    en: 'Analyze top performers in Insert your area of work. What is your List of the most important lessons you can from these top performers to increase your productivity.'
	},
	{
		title: '向最优秀的人学习',
		content:
			'我想学习一项技能。请创建一个为期30天的学习计划，帮助我从零开始作为初学者学会这项技能。',
    en: 'I want to learn (skill). Please create a 30 day study plan that will help me learn the skill from scratch as a beginner'
	},
	{
		title: '请让AI提供写作提示',
		content:
			'我是（填入职业），你能否列举一些最有效的写作提示，帮助我在我的职业中更高效地完成工作并节省时间。',
	},
	{
		title: '创建个性化的指导者',
		content:
			'我目前正在学习（主题）。我希望有一系列问题来测试我的知识水平，我会在答案中找出知识的空缺并提供更好的答案来填补这些空缺。',
	},
	{
		title: '用80%/20%规则学习更快',
		content:
			'我对想学的（主题）很感兴趣。请确定覆盖80％的关键学习内容中最重要的20％点，我们一起分享它。',
	},
	{
		title: '向大师学习技巧',
		content:
			'我要像拥有高智商的企业家一样表现出色，结合埃隆马斯克和阿尔伯特·爱因斯坦的特点。我会收到很多商业请求，因此必须回答所有的问题。',
	},
]

type Props = {
	onAdd: (content?: string) => void
}
const Empty = ({onAdd}: Props) => {

	return (
		<div className='w-full h-full'>
			<p className='my-2 text-lg text-center text-transparent bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text'>
				Chat生产力提示词，点击卡片快速开启
			</p>
			<div className='overflow-y-auto h-[calc(100vh-132px)] p-3'>
				<div className='grid grid-cols-2 gap-4 '>
					{tips.map((item, index) => (
						<div key={index} className='p-3 bg-white rounded shadow' onClick={() => onAdd(item.content)}>
							<div className='flex flex-col justify-start'>
								<p className='mb-1 text-gray-500 text'>{item.title}</p>
								<p className='text-sm text-gray-400'>{item.content}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='fixed bottom-0 left-0 right-0 w-full h-16 bg-white shadow-top'>
				<div className='flex items-center justify-end w-full h-full pr-4'>
					<span className='mr-2 text-gray-500 text'>不使用提示词，直接</span>
					<button className='text-lg button' onClick={() => onAdd()}>开启聊天</button>
				</div>
			</div>
		</div>
	)
}

export default Empty
