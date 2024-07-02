import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, get, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqFWPyZVYy1lCboqQcKj7LpyjyjOY9TAI",
    authDomain: "swis-4333b.firebaseapp.com",
    databaseURL: "https://swis-4333b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "swis-4333b",
    storageBucket: "swis-4333b.appspot.com",
    messagingSenderId: "749781434804",
    appId: "1:749781434804:web:0b620b13a077f8490032e1"
  };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const db = getDatabase(app);

    const temperature = ref(db, 'temperature');
    const water_level = ref(db, 'water_level');
    const vibration = ref(db, 'vibration');
    const gas_level = ref(db, 'gas_Detection');
    const probability = ref(db, 'probability');

    console.log(document);

    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
    	if (snap.val() === true) {
    		console.log("connected");
    	} else {
    		console.log("not connected");
    	}
    });
    
    onValue(temperature, (snapshot) => {
    	const data = snapshot.val();
    	console.log(data);
        const dataContainer = document.getElementById('temperature');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(water_level, (snapshot) => {
    	let data = snapshot.val();
        if (data == "1") {
            data = "Low"
        }
        else if (data == "2") {
            data = "Medium"
        }
        else if (data == "3") {
            data = "High"
        }
        else {
            data = "Very High"
        }
    	console.log(data);
        const dataContainer = document.getElementById('water_level');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(vibration, (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('vibration');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(gas_level, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('gas_level');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(probability, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const dataContainer = document.getElementById('probability');
        data == 1 ? dataContainer.innerHTML = "63%" : dataContainer.innerHTML = "2%";
        data == 1 ? document.querySelector(".ship").classList.add("anim2") : document.querySelector(".ship").classList.remove("anim2");
    });




