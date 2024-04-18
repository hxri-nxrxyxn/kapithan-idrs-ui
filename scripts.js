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
    const vibration = ref(db, 'vibration');
    const gas_level = ref(db, 'gas_Detection');

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
        var newTemp = data;
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
        data == "1" ? data = "0" : data = "1";
        console.log(data);
        const dataContainer = document.getElementById('vibration');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });

    onValue(gas_level, (snapshot) => {
        const data = snapshot.val();
        var newGas = data;
        console.log(newGas);
        console.log(data);
        const dataContainer = document.getElementById('gas_level');
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
    });


console.log("the temp is", newTemp)
console.log("the temp is", newTemp)
let prob =( 1 - ((Math.floor(newTemp) + (Math.floor(newGas) * 70)/100) * 100))
console.log("the probability is")
console.log(Math.floor(prob))