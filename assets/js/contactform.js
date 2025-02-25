async function submitForm(event) {
    console.log("Form submitted!")
    event.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phonenumber = document.getElementById("phonenumber").value
    let skills = document.getElementById("skills").value
    let message = document.getElementById("message").value

    if(name == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Name cannot be empty!'
        });
        return;
    } else if(email == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email cannot be empty!'
        });
        return;
    } else if(phonenumber == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Phone number cannot be empty!'
        });
        return;
    } else if(skills == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Skills cannot be empty!'
        });
        return;
    } else if(message == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Message cannot be empty!'
        });
        return;
    }

    const result = await Swal.fire({
        title: 'Are you sure',
        text: 'Is the data you entered correct?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    });

    if (result.isConfirmed) {
        let emailTujuan = 'asamarsal@gmail.com';
        let a = document.createElement('a');
        a.href = `mailto:${emailTujuan}?skills=${skills}&body=${`Halo, nama saya ${name}. Silahkan hubungi saya di ${email}. Nomor telepon saya ${phonenumber}. Berikut yang ingin saya sampaikan : ${message}`}`;
        a.click();

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phonenumber").value = "";
        document.getElementById("skills").value = "";
        document.getElementById("message").value = "";

        Swal.fire(
            'Success!',
            'Your message has been sent.',
            'success'
        );
    }

    // let emailTujuan = 'asamarsal@gmail.com'

    // let a = document.createElement('a')
    // a.href = `mailto:${emailTujuan}?skills=${skills}&body=${`Halo, nama saya ${name}. SIlahkan hubungi saya di ${email}. Nomor telepon saya ${phonenumber}. Berikut yang ingin saya sampaikan : ${message}`}`

    // a.click()

    // document.getElementById("name").value = ""
    // document.getElementById("email").value = ""
    // document.getElementById("phonenumber").value = ""
    // document.getElementById("skills").value = ""
    // document.getElementById("message").value = ""
}