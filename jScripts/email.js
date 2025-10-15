let toastSuccess = document.getElementById('alert-box-1');
let toastError = document.getElementById('alert-box-2');


document.getElementById('emailForm').addEventListener('submit', function (e) {
    

    e.preventDefault();

    let formData = new FormData(this);

    console.log(Object.fromEntries(formData));

    fetch('php/send_email.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {


            if (data.success) {
                toastSuccess.classList.remove("alert-state");
                document.getElementById('send').disabled=true;
            } else {
                toastError.classList.remove("alert-state");
            }

        
            let email = document.getElementById('email-field');
            email.value = "";


            let message = document.getElementById('message-field');
            message.value = "";

            
        })
        .catch(error => {
            console.error('Fehler beim Senden der E-Mail:', error);
        });
});

// document.getElementById('close1').addEventListener('click', function (e) {

// console.log("click close");
// toastSuccess.classList.add("alert-state");

// });
