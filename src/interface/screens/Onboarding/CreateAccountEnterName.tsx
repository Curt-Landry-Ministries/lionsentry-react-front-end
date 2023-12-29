import React, { useState } from 'react';
import ImageContentScreenTemplate from '../../templates/ImageContentScreenTemplate';
import { DynamicFormFactory, DFFInputField } from '../../factories/DynamicFormFacotry';
import { saveUserDataPoint } from '../../../API/appServerAPICalls';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const CreateAccountEnterName: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    const nameParts = name.trim().split(/\s+/);
    let firstName = '';
    let lastName = '';

    if (nameParts.length > 1) {
      lastName = nameParts.pop() || '';
      firstName = nameParts.join(' ');
    } else {
      firstName = name;
    }

    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        throw new Error('User ID not found in local storage');
      }
      console.log("userID", userID);
      await saveUserDataPoint("firstName", firstName, 'replace');

      if (lastName) {
        await saveUserDataPoint("lastName", firstName, 'replace');

      }

      console.log('Name saved successfully');

      // navigate to the whystatementquestions screen
      navigation.navigate('Onboarding');

    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  const inputFields: DFFInputField[] = [
    {
      label: 'What Is Your Name*',
      placeholder: 'Enter your name here',
      value: name,
      onChange: (e) => setName(e.target.value)
    }
  ];

  return (
    <ImageContentScreenTemplate>
      <div style={{ width: '100%', maxWidth: '574px', margin: '0 auto', padding: '0 15px' }}>
        <h1 style={{ color: 'white', fontSize: '50px', textAlign: 'center', marginBottom: '30px' }}>
          What Is Your Name
        </h1>
        <DynamicFormFactory 
          inputFields={inputFields} 
          buttonFields={[{ text: 'Submit', onClick: handleSubmit }]} 
        />
      </div>
    </ImageContentScreenTemplate>
  );
};

export default CreateAccountEnterName;
