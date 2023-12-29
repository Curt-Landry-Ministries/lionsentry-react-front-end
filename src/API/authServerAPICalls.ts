import 'firebase/auth';
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:5002"; // Your Auth server URL


// export const fetchUserId = async (): Promise<string | null> => {
//   try {
//     const response = await fetch(`${BASE_URL}/get-id-token`);
//     const data = await response.json();
//     const idToken = data.idToken;
//     const decodedToken: any = jwtDecode(idToken);
//     const userID = decodedToken.user_id;
//     localStorage.setItem("userID", userID);
//     console.log("Assigned userID: ", userID);
//     return userID;
//   } catch (error) {
//     console.error("Error fetching user ID:", error);
//     return null;
//   }
// };

type CreateUserResponse = {
  message: string;
  uid: string;
} | {
  error: string;
};

export async function createAccount(username: string, password: string): Promise<void> {
  try {
    const response = await fetch('http://localhost:5002/create-user-manually', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password: password })
    });

    const data: CreateUserResponse = await response.json();

    if ('uid' in data) {
      console.log('Account created. UID:', data.uid);
    } else {
      console.error('Failed to create account:', data.error);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

/*
Normally, all logic related to signing users in would pass through the authentication server. However, due to how Firebase is set up, it makes sense to implement the login function directly in Firebase
*/

interface UserCredentials {
  email: string;
  password: string;
}

// Function to log in a user
export const loginUser = async (credentials: UserCredentials): Promise<void> => {
  try {
    const { email, password } = credentials;

    // Send login request to your auth server
    const response = await fetch(`${BASE_URL}/get-id-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();

    if (response.ok && data.idToken) {
      // Store token and user ID in local storage
      localStorage.setItem('authToken', data.idToken);
      localStorage.setItem('userEmail', email); 
      // save the user id to local storage using data.idToken
      const decodedToken: any = jwtDecode(data.idToken);
      const userID = decodedToken.user_id;
      localStorage.setItem('userID', userID);
      

      console.log("User logged in:", email);
    } else {
      console.error("Login failed:", data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

export async function deleteUserAccount(): Promise<void> {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      const userID = currentUser.uid;

      const response = await fetch(`${BASE_URL}/delete-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID, idToken: idToken })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User deleted successfully:', data.message);
        await logoutUser(); // Log out the user on the client side
      } else {
        console.error('Failed to delete user:', data.error);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};