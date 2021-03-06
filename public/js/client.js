const personalFormHandler = async (event) => {
    console.log("here");
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value.trim();

    if (firstName) {
        console.log("firstName", firstName)

        const response = await fetch('/api/personalize', {
            method: 'POST',
            body: JSON.stringify({ firstName }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            return true;
        }

    }

    alert('Please Try Again!');

};

const themeChangeHandler = (event) => {

    const newColor = event.target.getAttribute("data-color");

    fetch('/api/themeupdate/' + newColor, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
        //may not be a response / could write in header / could write cookie in client JS
        location.reload();
    });

}

// Check that form exists before selecting
if (document.querySelector('.personal-form')) {
    var personalForm = document.querySelector('.personal-form');
    personalForm.addEventListener('submit', personalFormHandler);
}

// Check if themes are on page before selecting
if (document.querySelector('.themeChange')) {

    //We need to have an event listener on each. In query we could use $this
    const colors = document.querySelectorAll(".themeChange")
    for (const color of colors) {
        color.addEventListener('click', function (event) {
            themeChangeHandler(event)
        })
    }
}

