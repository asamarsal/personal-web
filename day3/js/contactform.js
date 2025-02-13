function submitForm(event) {
    console.log("Form submitted!")
    event.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phonenumber = document.getElementById("phonenumber").value
    let subject = document.getElementById("subject").value
    let yourmessage = document.getElementById("yourmessage").value

    if(name == "") {
        alert("Name cannot be empty!")
        return
    } else if(email == "") {
        alert("Email cannot be empty!")
        return
    } else if(phonenumber == "") {
        alert("Phone number cannot be empty!")
        return
    } else if(subject == "") {
        alert("Subject  cannot be empty!")
        return
    } else if(yourmessage == "") {
        alert("Message cannot be empty!")
        return
    }

    let emailTujuan = 'asamarsal@gmail.com'

    let a = document.createElement('a')
    a.href = `mailto:${emailTujuan}?subject=${subject}&body=${`Halo, nama saya ${name}. SIlahkan hubungi saya di ${email}. Nomor telepon saya ${phonenumber}. Berikut yang ingin saya sampaikan : ${yourmessage}`}`

    a.click()

    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phonenumber").value = ""
    document.getElementById("subject").value = ""
    document.getElementById("yourmessage").value = ""
}