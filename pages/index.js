import { useState } from 'react';

import Head from '@/components/layout/CustomHead';
import MessageFilter from '@/components/message/search/messageFilter';
import MessageItem from '@/components/message/search/MessageItem';

export default function Home(props) {
	const [messages, setMessages] = useState(props.messages);

	function applyFilter(data) {
		setMessages(data);
	}

	return (
		<>
			<Head title="Message Manager" />
			<h1>Messages</h1>
			<h3>Records: {messages.length}</h3>
			<MessageFilter data={props.messages} onApplyFilter={applyFilter} />
			<MessageItem messages={messages} />
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetch('http://localhost:3000/message/list');
	const data = await response.json();

	return {
		props: {
			messages: data,
		},
	};
}
