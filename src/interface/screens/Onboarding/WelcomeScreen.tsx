import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageContentScreenTemplate from '../../templates/ImageContentScreenTemplate';
import { loginUser } from '../../../API/authServerAPICalls';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import { DynamicFormFactory, DFFInputField, DFFButtonField } from '../../factories/DynamicFormFacotry';

const WelcomeScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const { t } = useTranslation();

  const handleCreateAccount = async () => {
    try {
      navigation.navigate('CreateAccountEnterEmailPassword'); // Navigate to the CreateAccountEnterName screen
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser({ email: username, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const inputFields: DFFInputField[] = [
    {
      label: t('welcome.username'),
      placeholder: t('welcome.enterUsername'),
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      label: t('welcome.password'),
      placeholder: t('welcome.enterPassword'),
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: 'password',
    }
  ];

  const buttonFields: DFFButtonField[] = [
    {
      text: t('welcome.login'),
      onClick: handleLogin,
    },
    {
      text: t('welcome.createAccount'),
      onClick: handleCreateAccount,
    }
  ];

  return (
    <ImageContentScreenTemplate>
      <div style={{ width: '100%', maxWidth: '574px', margin: '0 auto', padding: '0 15px' }}>
        <h1 style={{ color: 'white', fontSize: '50px', textAlign: 'center', marginBottom: '30px' }}>
          {t('welcome.title')}
        </h1>
        <DynamicFormFactory inputFields={inputFields} buttonFields={buttonFields} />
      </div>
    </ImageContentScreenTemplate>
  );
};

export default WelcomeScreen;
