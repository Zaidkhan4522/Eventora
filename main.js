import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";


// ================= FIREBASE CONFIG =================

const firebaseConfig = {

    apiKey: "AIzaSyC8Wp7S4fg5YURaNYAA2ngzUD11VCwTaGI",

    authDomain: "o-e-m-system.firebaseapp.com",

    databaseURL: "https://o-e-m-system-default-rtdb.firebaseio.com",

    projectId: "o-e-m-system",

    storageBucket: "o-e-m-system.firebasestorage.app",

    messagingSenderId: "298561567790",

    appId: "1:298561567790:web:8a3b3fc2c4fc9801e4f3bf",

    measurementId: "G-1XRNF3K3WH"

};


// ================= INITIALIZE FIREBASE =================

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// ================= HTML ELEMENTS =================

const loginBtn = document.getElementById("topLoginBtn");

const signupBtn = document.getElementById("googleSignup");

const profileContainer = document.getElementById("profileContainer");

const userPhoto = document.getElementById("userPhoto");

const logoutBtn = document.getElementById("logoutBtn");


// ================= GOOGLE LOGIN =================

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        signInWithPopup(auth, provider)

            .then((result) => {

                console.log("Login Success");

            })

            .catch((error) => {

                console.log(error.message);

            });

    });

}


// ================= GOOGLE SIGNUP =================

if (signupBtn) {

    signupBtn.addEventListener("click", () => {

        signInWithPopup(auth, provider)

            .then((result) => {

                console.log("Signup Success");

            })

            .catch((error) => {

                console.log(error.message);

            });

    });

}


// ================= AUTH STATE =================

onAuthStateChanged(auth, (user) => {

    // USER LOGGED IN
    if (user) {

        console.log("User Logged In");

        // HIDE LOGIN BUTTON
        if (loginBtn) {

            loginBtn.style.display = "none";

        }

        // HIDE SIGNUP BUTTON
        if (signupBtn) {

            signupBtn.style.display = "none";

        }

        // SHOW PROFILE SECTION
        if (profileContainer) {

            profileContainer.style.display = "flex";

        }

        // SET PROFILE IMAGE
        if (userPhoto) {

            userPhoto.src = user.photoURL;

        }

    }

    // USER LOGGED OUT
    else {

        console.log("User Logged Out");

        // SHOW LOGIN BUTTON
        if (loginBtn) {

            loginBtn.style.display = "block";

        }

        // SHOW SIGNUP BUTTON
        if (signupBtn) {

            signupBtn.style.display = "block";

        }

        // HIDE PROFILE
        if (profileContainer) {

            profileContainer.style.display = "none";

        }

    }

});


// ================= LOGOUT =================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);

            console.log("Logout Success");

        }

        catch (error) {

            console.log(error.message);

        }

    });

}


// ================= SCREEN TOGGLE =================

window.showSignup = function () {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("signupForm").style.display = "block";

}


window.showLogin = function () {

    document.getElementById("signupForm").style.display = "none";

    document.getElementById("loginForm").style.display = "block";

}