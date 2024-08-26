import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [showSmsInput, setShowSmsInput] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            handleSubmit();
          },
          "expired-callback": () => {},
        }
      );
    }
  }, []);

  const handlePhoneSignUp = async () => {
    const phoneNumber = formData.emailOrPhone;
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setShowSmsInput(true);
      setError("");
    } catch (error) {
      console.error("Error during phone sign-up:", error);
      setError("Failed to send SMS. Please try again.");

      // Reset reCAPTCHA
      if (window.recaptchaWidgetId) {
        window.recaptchaVerifier.reset(window.recaptchaWidgetId);
      } else {
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaVerifier.reset(widgetId);
        });
      }
    }
  };

  const validate = () => {
    if (!formData.username) {
      setError("Username is required");
      return false;
    }
    if (!formData.emailOrPhone) {
      setError("Email or phone number is required");
      return false;
    }

    if (
      formData.emailOrPhone.includes("@") &&
      !/\S+@\S+\.\S+/.test(formData.emailOrPhone)
    ) {
      setError("Email is invalid");
      return false;
    }
    if (
      !formData.emailOrPhone.includes("@") &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
        formData.emailOrPhone
      )
    ) {
      setError("Phone number is invalid");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const sendConfirmationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      setError("A confirmation email has been sent. Please check your inbox.");
    } catch (error) {
      setError("Failed to send confirmation email. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      let user;
      if (formData.emailOrPhone.includes("@")) {
        // Email sign-up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.emailOrPhone,
          formData.password
        );
        user = userCredential.user;
        await sendConfirmationEmail(user);

        // Wait for email verification
        const checkEmailVerification = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(checkEmailVerification);
            navigate("/home");
          }
        }, 5000); // Check every 5 seconds

        setError(
          "Please check your email and verify your account before proceeding."
        );
      } else {
        // Phone sign-up
        await handlePhoneSignUp();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSmsVerification = async (smsCode) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, smsCode);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // Store user data in Firestore after successful sign-up
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        phoneNumber: formData.emailOrPhone,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (error) {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-signBg bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2 "
            value={formData.password}
            onChange={handleChange}
          />
          <div id="recaptcha-container"></div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {showSmsInput && (
            <input
              type="text"
              name="verificationCode"
              placeholder="Enter verification code"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
              value={formData.verificationCode}
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
              onBlur={() => handleSmsVerification(formData.verificationCode)}
            />
          )}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/signIn")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
