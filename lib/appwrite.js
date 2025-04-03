import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.fitly.app",
  projectId: "67ee30120016a587c501",
  databaseId: "67eeb14100033322b7dd",
  userCollectionId: "67eeb15f000fc0cba320",
  storageId: "67eeb191003469976651",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    if (!email || !password || !username) {
      return { success: false, message: "Please fill all fields!" };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email address!" };
    }

    // Check if user already exists with email
    const existingUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("email", email)]
    );

    if (existingUser.documents.length > 0) {
      return {
        success: false,
        message: "User already exists with this email!",
      };
    }

    // Check if username already exists
    const existingUsername = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("username", username)]
    );

    if (existingUsername.documents.length > 0) {
      return { success: false, message: "Username is already taken!" };
    }

    // Create a new account in Appwrite
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      return { success: false, message: "Failed to create account!" };
    }

    // Generate an avatar
    const avatarUrl = avatars.getInitials(username);

    // Save user details in the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    // Sign in the user after account creation
    const signInResponse = await SignIn(email, password);

    if (!signInResponse.success) {
      return {
        success: false,
        message:
          "Account created, but failed to log in. Try logging in manually.",
      };
    }

    return {
      success: true,
      message: "User created and logged in successfully!",
      user: newUser,
    };
  } catch (error) {
    let message = "An error occurred";

    if (error.message.includes("Invalid `password` param")) {
      message = "Password must be at least 8 characters long!";
    } else if (error.message.includes("Invalid email")) {
      message = "Invalid email address!";
    } else if (error.message.includes("already exists")) {
      message = "User already exists!";
    }

    return { success: false, message };
  }
};

export const SignIn = async (email, password) => {
  if (!email || !password) {
    return { success: false, message: "Please fill all fields!" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email address!" };
  }

  try {
    const session = await account.createEmailPasswordSession(email, password);

    // Fetch current user to ensure session is active
    const currentUser = await account.get();

    return { success: true, session, user: currentUser };
  } catch (error) {
    let message = "An error occurred";

    if (error.message.includes("Invalid credentials")) {
      message = "Incorrect email or password!";
    } else if (error.message.includes("Invalid `password` param")) {
      message = "Password must be at least 8 characters long!";
    }

    return { success: false, message };
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
