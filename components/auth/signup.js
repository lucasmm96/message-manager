import { useState } from 'react';
import { useRouter } from 'next/router';

import Form from '@/components/ui/Form';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import Modal from '../ui/Modal';

import post from '@/utils/httpRequests/post';

function Signup(props) {
  const router = useRouter();

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    header: '',
    body: '',
    footer: '',
  });

  const [signupData, setSignupData] = useState({
    username: { value: '', required: true, valid: false, onBlur: false },
    email: { value: '', required: true, valid: false, onBlur: false },
    password: { value: '', required: true, valid: false, onBlur: false },
    admin: { value: false },
  });

  function changeHandler(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setSignupData({
      ...signupData,
      [eventName]: {
        ...signupData[eventName],
        value: eventValue,
        valid: signupData[eventName].required
          ? eventValue !== ''
          : [eventName].valid,
      },
    });
  }

  function switcherHandler(event) {
    event.preventDefault();
    setSignupData({
      ...signupData,
      admin: {
        value: !signupData.admin.value,
      },
    });
  }

  function blurHandler(event) {
    const eventName = event.target.name;

    setSignupData({
      ...signupData,
      [eventName]: {
        ...signupData[eventName],
        onBlur: true,
      },
    });
  }

  function closeModalHandler() {
    setModalInfo({ ...modalInfo, isOpen: false });
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await post('/auth/signup', {
        username: signupData.username.value,
        email: signupData.email.value,
        password: signupData.password.value,
        admin: signupData.admin.value,
      });
      const responseJSON = await response.json();
      const responseStatusCode = response.status;

      if (responseStatusCode >= 400) {
        throw new Error(responseJSON.error);
      }

      auth.login(responseJSON.token);
      router.replace('/auth/login');
    } catch (error) {
      setModalInfo({
        isOpen: true,
        header: 'Error',
        body: error.message,
        footer: <Button label="OK" click={closeModalHandler} />,
      });
    }
  }

  function onSelectLoginHandler(event) {
    event.preventDefault();
    props.onSelectLoginHandler();
  }

  return (
    <>
      <Modal
        isOpen={modalInfo.isOpen}
        header={modalInfo.header}
        body={modalInfo.body}
        footer={modalInfo.footer}
      />
      <Form
        input={
          <>
            <FormInput
              name="username"
              label="Username"
              type="text"
              required={signupData.username.required}
              value={signupData.username.value}
              valid={signupData.username.valid}
              blur={signupData.username.onBlur}
              onChangeHandler={changeHandler}
              onBlurHandler={blurHandler}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              required={signupData.email.required}
              value={signupData.email.value}
              valid={signupData.email.valid}
              blur={signupData.email.onBlur}
              onChangeHandler={changeHandler}
              onBlurHandler={blurHandler}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              required={signupData.password.required}
              value={signupData.password.value}
              valid={signupData.password.valid}
              blur={signupData.password.onBlur}
              onChangeHandler={changeHandler}
              onBlurHandler={blurHandler}
            />
            <FormInput
              name="admin"
              label="Admin"
              type="switcher"
              onSwitcherHandler={switcherHandler}
            />
          </>
        }
        actions={
          <>
            <Button
              label="Signup"
              classes="containerItem"
              click={submitHandler}
              disabled={
                !signupData.username.valid ||
                !signupData.email.valid ||
                !signupData.password.valid
              }
            />
            <Button
              label="Switch to Login"
              classes="containerItem"
              click={onSelectLoginHandler}
            />
          </>
        }
      />
    </>
  );
}

export default Signup;
