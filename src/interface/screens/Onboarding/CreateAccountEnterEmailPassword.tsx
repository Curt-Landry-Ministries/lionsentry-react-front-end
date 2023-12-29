import React, { useState } from 'react';
import ImageContentScreenTemplate from '../../templates/ImageContentScreenTemplate';
import { DynamicFormFactory, DFFInputField } from '../../factories/DynamicFormFacotry';
import { createAccount, loginUser } from '../../../API/authServerAPICalls';
import { useNavigation } from '@react-navigation/native';

const CreateAccountEnterEmailPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Check if passwords match
    if (password !== retypePassword) {
      alert('Passwords must match!');
      return; // Stop the function if the passwords don't match
    }
  
    // If passwords match, attempt to create an account and then log in
    try {
      await createAccount(email, password);
      try {
        await loginUser({ email, password });
        navigation.navigate("CreateAccountEnterName");
      } catch (loginError) {
        console.error("Login failed:", loginError);
        // You may want to handle login failure separately
      }
    } catch (creationError) {
      console.error("Account creation failed:", creationError);
      // You may want to show an error message to the user here
    }
  };
  

  const inputFields: DFFInputField[] = [
    {
      label: 'Email*',
      placeholder: 'Enter your email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: 'email', // Specify input type
    },
    {
      label: 'Password*',
      placeholder: 'Enter your password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: 'password', // Specify input type
    },
    {
      label: 'Retype Password*',
      placeholder: 'Retype your password',
      value: retypePassword,
      onChange: (e) => setRetypePassword(e.target.value),
      type: 'password', // Specify input type
    }
  ];

  return (
    <ImageContentScreenTemplate>
      <div style={{ width: '100%', maxWidth: '574px', margin: '0 auto', padding: '0 15px' }}>
        <h1 style={{ color: 'white', fontSize: '50px', textAlign: 'center', marginBottom: '30px' }}>
          Create Account
        </h1>
        <DynamicFormFactory 
          inputFields={inputFields} 
          buttonFields={[{ text: 'Submit', onClick: handleSubmit }]} 
        />
      </div>
    </ImageContentScreenTemplate>
  );
};

export default CreateAccountEnterEmailPassword;
