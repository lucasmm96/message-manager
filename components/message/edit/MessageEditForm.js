import { useState } from 'react';
import { useRouter } from 'next/router';

import MessageForm from '@/components/message/form/MessageForm';

function MessageEditForm(props) {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('');
	const [responseStatus, setResponseStatus] = useState('ERROR');
	const [responseData, setResponseData] = useState('');

	const [formData, setFormData] = useState({
		_id: { value: props.data._id, required: false, valid: true, onBlur: true },
		message: {
			value: props.data.message,
			required: true,
			valid: true,
			onBlur: true,
		},
		author: {
			value: props.data.author,
			required: true,
			valid: true,
			onBlur: true,
		},
		postedAt: {
			value: props.data.postedAt,
			required: false,
			valid: true,
			onBlur: false,
		},
		urlPost: {
			value: props.data.urlPost,
			required: false,
			valid: true,
			onBlur: false,
		},
		urlStory: {
			value: props.data.urlStory,
			required: false,
			valid: true,
			onBlur: false,
		},
	});

	function blurHandler(formData) {
		setFormData(formData);
	}

	function changeHandler(formData) {
		setFormData(formData);
	}

	async function submitHandler(data) {
		try {
			const response = await fetch(`${process.env.API_URL}/message/update`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			setResponseStatus('ERROR');
			setResponseData('Something went wrong.');

			if (response.ok) {
				setResponseData(responseJSON.message);
			}

			if (responseStatusCode === 200) {
				setResponseStatus('SUCESS');
			}

			if (responseStatusCode === 202 || responseStatusCode === 204) {
				setResponseStatus('WARNING');
			}

			if (responseStatusCode === 400) {
				setResponseStatus('ERROR');
			}
		} catch (error) {
			setResponseStatus('ERROR');
			setResponseData(`Something went wrong. Error: (${error}).`);
		}
		setModalType('RESULTS');
		setIsModalOpen(true);
	}

	function cancelHandler() {
		router.push('/');
	}

	function closeHandler() {
		setIsModalOpen(false);
	}

	function deleteHandlerConfirmation() {
		setModalType('CONFIRMATION');
		setIsModalOpen(true);
	}

	async function deleteHandler(data) {
		try {
			const response = await fetch(`${process.env.API_URL}/message/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			setResponseStatus('ERROR');
			setResponseData('Something went wrong.');

			if (response.ok) {
				setResponseData(responseJSON.message);
			}

			if (responseStatusCode === 200) {
				setResponseStatus('SUCESS');
			}

			if (responseStatusCode === 202 || responseStatusCode === 204) {
				setResponseStatus('WARNING');
			}

			if (responseStatusCode === 400) {
				setResponseStatus('ERROR');
			}
		} catch (error) {
			setResponseStatus('ERROR');
			setResponseData(`Something went wrong. Error: (${error}).`);
		}

		setModalType('RESULTS');
		setIsModalOpen(true);
	}

	return (
		<MessageForm
			data={formData}
			onBlurHandler={blurHandler}
			onChangeHandler={changeHandler}
			onSubmitHandler={submitHandler}
			onCancelHandler={cancelHandler}
			onDeleteHandlerConfirmation={deleteHandlerConfirmation}
			onDeleteHandler={deleteHandler}
			onCloseHandler={closeHandler}
			modalType={modalType}
			isModalOpen={isModalOpen}
			responseStatus={responseStatus}
			responseData={responseData}
		/>
	);
}

export default MessageEditForm;
