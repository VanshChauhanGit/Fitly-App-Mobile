import * as Linking from "expo-linking";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

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

export const signInWithGoogle = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true,
    });

    console.log("Redirect URI:", redirectUri);

    const authUrl = `https://cloud.appwrite.io/v1/account/sessions/oauth2/google?project=${
      config.projectId
    }&redirect=${encodeURIComponent(redirectUri)}`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    if (result.type === "success") {
      // 🎯 Directly get current session (if created)
      const user = await account.get();
      return {
        success: true,
        user,
      };
    }

    return {
      success: false,
      message:
        result.type === "cancel"
          ? "Login cancelled"
          : "Login failed or redirected improperly",
    };
  } catch (error) {
    console.error("[Auth Error]", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    console.log(session);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
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
