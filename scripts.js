import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, get, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
	apiKey: "AIzaSyCdQfrxQojddcJtMMkFGePzlbQjBlsL7AY",
	authDomain: "kapithan-ff7c3.firebaseapp.com",
	databaseURL: "https://kapithan-ff7c3-default-rtdb.firebaseio.com",
	projectId: "kapithan-ff7c3",
	storageBucket: "kapithan-ff7c3.appspot.com",
	messagingSenderId: "284888662929",
	appId: "1:284888662929:web:cf91f71343e058f0235030",
	measurementId: "G-11E0K8HGHH"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const db = getDatabase(app);

    const temperature = ref(db, 'temperature');
    const water_level = ref(db, 'water_level');

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
    	const data = snapshot.val();
    	console.log(data);
        const dataContainer = document.getElementById('water_level');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

const apiKey = '7ad415d46b41f486db6d278b774e0ec8';
const cityName = 'Delhi';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`) // Fetch data using city name and API key
.then(response => response.json())
.then(data => {
  const temperature = Math.round(data.main.temp); // Extract and round temperature
  document.getElementById('temperature').textContent = `${temperature} °C`; // Update HTML with temperature and degree symbol
})
.catch(error => console.error(error));
