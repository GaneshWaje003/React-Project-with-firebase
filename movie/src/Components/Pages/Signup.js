import React from 'react';
import '../css/signup.css';
import userlogo from '../img/user_svg.svg';
import keylogo from '../img/key_svg.svg';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Signup() {
    const moviecollectionRef = collection(db, "users");

    const registerUser = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            await addDoc(moviecollectionRef, {
                email: "email@123",
                gender: "male",
                name: "namesdone",
                password: "password",
                username: "user123"
            });
            console.log("User registered successfully!");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

    return (
        <div className='register-main'>
            <div className="container-form">
                <form onSubmit={registerUser}>
                    <div className="register-input-container header-reg">
                        <h1>REGISTER</h1>
                    </div>
                    <div className="register-input-container reg-fullname">
                        <input type="text" placeholder='Enter Full Name ' />
                    </div>
                    <div className="register-input-container reg-birthday">
                        <label htmlFor="birthdate">BirthData</label>
                        <input id="birthdate" type="date" />
                    </div>
                    <div className="register-input-container reg-gender">
                        <p>Gender</p>
                        <div className="gender-container male">
                            <label htmlFor="male">Male</label>
                            <input id="male" type="radio" />
                        </div>
                        <div className="gender-container female">
                            <label htmlFor="female">Female</label>
                            <input id="female" type="radio" />
                        </div>
                    </div>
                    <div className="register-input-container reg-email">
                        <input type="email" placeholder='Enter Email' />
                        <div className="verify-email">
                            <button>Verify</button>
                            <input type="text" placeholder='Enter OTP' />
                        </div>
                    </div>
                    <div className="register-input-container reg-username">
                        <img src={userlogo} alt="" />
                        <input type="text" placeholder='Enter Username' />
                    </div>
                    <div className="register-input-container reg-password">
                        <img src={keylogo} alt="" />
                        <input type="text" placeholder='Enter Password' />
                    </div>
                    <div className="register-input-container reg-btn">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}
