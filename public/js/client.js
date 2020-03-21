console.log("Client side javascript is working");

const form = document.querySelector("#search-form");

form.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(e);

    const input = e.target.elements.search.value;
    // console.log(input);

    fetch("http://localhost:5000/covid?search=" + encodeURIComponent(input))
        .then(response => {
            response.json().then(res => {
                console.log(res);
                // do something with res data in object
                const bg1 = document.querySelector(".main__default--bg1");
                bg1.style.backgroundImage = `url(${res.image1})`;

                const bg2 = document.querySelector(".footer--bg2");
                bg2.style.backgroundImage = `url(${res.image2})`;

                const title = document.querySelector(".result__title");
                if (res.place) {
                    title.textContent = res.place;
                } else {
                    title.textContent = "Latest Updates";
                }
            });
        })
        .catch(error => {
            console.log("No address provided!");
        });
})

const panicForm = document.querySelector("#panic-form");

panicForm.addEventListener("submit", e => {
    e.preventDefault();

    const box = document.querySelector("#result");

    const cough = e.target.elements.cough.checked;
    const fever = e.target.elements.fever.checked;
    const tired = e.target.elements.tired.checked;
    const breathe = e.target.elements.breathe.checked;
    const days = e.target.elements.since.value;

    if (days <= 4) {
        if (cough || fever) {
            box.textContent =
                "These are very mild symptomps which may even be just cold or normal Flu. So have patience and faith, there's nothing to worry about.";
        } else if (tired) {
            box.textContent =
                "It's been hell of a pandemic, maybe you just need to rest a little bit more. We're here for you ❤";
        } else if (breathe) {
            box.textContent =
                "This is a very rare symptom and its just been a while. Stay calm for a few days and come back again. 😉";
        } else {
            box.textContent =
                "Sorry, we gave our best, but still its hard saying your situation. Prefer to contact our specialists below. 😕";
        }
    } else if (days ==4 && fever) {
        box.textContent =
            "You may not be properly taking rest and drink a lots of hot water Avoid cold items ";
    }
    else if (days ==4 && cough) {
        box.textContent =
            "You should be consulting a medication specialists or chest specialists to be safe enough";
    }

    else if (days ==4 && breathe) {
        box.textContent =
            "Please see to a chest specialists as breathe is not good";
    }

     else if (days ==4 && breathe && fever) {
        box.textContent =
            "These are very mild symptomps which may even be just cold or normal Flu. So have patience and faith, there's nothing to worry about.;
    }
     else if (days == 3 && breathe)
     {
     	box.textContent = "These are very mild symptomps which may even be just cold or normal Flu. So have patience and faith, there's nothing to worry about.";
     }

     else if (days == 5 && breathe && fever) 
       {
        box.textContent =
            "Its Better to Visit a Medical Practicioner";
       }

     else {
        box.textContent =
            "Um...somethings not right with us. Maybe you could give us call as soon as possible. 📞";
    }
});
