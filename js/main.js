var loginContainer = document.querySelector('.loginContainer')
var signUpContainer = document.querySelector('.signUpContainer')
var signEmail = document.querySelector('#signEmail')
var signPassword = document.querySelector('#signPassword')
var signName = document.querySelector('#signName')
var signUpAnchor = document.querySelector('.signUpAnchor')
var signUpButton = document.querySelector('form .signUpButton')
var loginEmail = document.querySelector('#loginEmail')
var loginPassword = document.querySelector('#loginPassword')
var loginAnchor = document.querySelector('.loginAnchor')
var loginButton = document.querySelector('form .loginButton')
var incorrectLogin = document.querySelector('#incorrectLogin')
var incorrectSignUp = document.querySelector('#incorrectSignUp')
var loggedInSection = document.querySelector('.loggedInPage')
var loggedInPage = document.querySelector('.loggedInPage h1')
var navBar = document.querySelector('.navbar')
var logout = document.querySelector('nav .btn')
var accountsDB;


if (localStorage.getItem('accounts') != null) {
    accountsDB = JSON.parse(localStorage.getItem('accounts'))
}
else {
    accountsDB = []
}

function clearInput() {
    signName.value = null
    signEmail.value = null
    signPassword.value = null
    loginEmail.value = null
    loginPassword.value = null
    incorrectLogin.innerHTML = null
    incorrectSignUp.innerHTML = null
    if (signEmail.classList.contains('is-valid')) {
        signEmail.classList.remove('is-valid')
    }
    else if (signEmail.classList.contains('is-invalid')) {
        signEmail.classList.remove('is-invalid')
    }
    if (loginEmail.classList.contains('is-valid')) {
        loginEmail.classList.remove('is-valid')
    }
    else if (loginEmail.classList.contains('is-invalid')) {
        loginEmail.classList.remove('is-invalid')
    }
    if (loginEmail.nextElementSibling.classList.contains('d-block')) { loginEmail.nextElementSibling.classList.replace('d-block', 'd-none') }
    if (signEmail.nextElementSibling.classList.contains('d-block')) { signEmail.nextElementSibling.classList.replace('d-block', 'd-none') }
}

function displaySignUp() {
    signUpContainer.classList.replace('d-none', 'd-block')
    loginContainer.classList.replace('d-block', 'd-none')
    clearInput()
}

signUpAnchor.addEventListener('click', displaySignUp)

function displayLogin() {
    loginContainer.classList.replace('d-none', 'd-block')
    signUpContainer.classList.replace('d-block', 'd-none')
    clearInput()
}

loginAnchor.addEventListener('click', displayLogin)

function signUp() {
    if (signName.value != '' && signPassword.value != '' && validateEmail()) {
        for (i = 0; i < accountsDB.length; i++) {
            if (signEmail.value == accountsDB[i].signEmail) {

                incorrectSignUp.innerHTML = 'This email is already taken'
                return
            }
        }
        var newAccount = {
            signName: signName.value,
            signEmail: signEmail.value,
            signPassword: signPassword.value,
        }
        accountsDB.push(newAccount)
        localStorage.setItem('accounts', JSON.stringify(accountsDB))
        window.alert('Account created successfully')
        displayLogin()
        clearInput()

    }
    else if (validateEmail() == false) {

        incorrectSignUp.innerHTML = 'Please enter a valid email'

    }
    else {
        incorrectSignUp.innerHTML = 'Please enter all the fields'
    }

}

signUpButton.addEventListener('click', signUp)

signEmail.addEventListener('input', validateEmail)

function validateEmail() {
    var Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    if (Regex.test(signEmail.value)) {
        signEmail.classList.add('is-valid')
        signEmail.classList.remove('is-invalid')
        signEmail.nextElementSibling.classList.replace('d-block', 'd-none')
        return true
    }
    else {
        signEmail.classList.add('is-invalid')
        signEmail.classList.remove('is-valid')
        signEmail.nextElementSibling.classList.replace('d-none', 'd-block')
        return false
    }
}
function validateLoginEmail() {
    var Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    if (Regex.test(loginEmail.value)) {
        loginEmail.classList.add('is-valid')
        loginEmail.classList.remove('is-invalid')
        loginEmail.nextElementSibling.classList.replace('d-block', 'd-none')
        return true
    }
    else {
        loginEmail.classList.add('is-invalid')
        loginEmail.classList.remove('is-valid')
        loginEmail.nextElementSibling.classList.replace('d-none', 'd-block')
        return false
    }
}

loginEmail.addEventListener('input', validateLoginEmail)


function login() {
    if (loginEmail.value != '' && loginPassword.value != '' && validateLoginEmail()) {
        var accountExists = false
        for (i = 0; i < accountsDB.length; i++) {
            if (accountsDB[i].signEmail == loginEmail.value) {
                accountExists = true
                if (accountsDB[i].signPassword == loginPassword.value) {
                    loginPage(accountsDB[i].signName)
                    loginContainer.classList.replace('d-block', 'd-none')
                }
                else {
                    incorrectLogin.innerHTML = 'Your password is incorrect'
                    loginPassword.value = null
                }
            }
        }
        if (accountExists == false) {
            incorrectLogin.innerHTML = 'Account isn\'t registered'
        }
    }
    else if (validateLoginEmail() == false) {

        incorrectLogin.innerHTML = 'Please enter a valid email'
    }
    else {
        incorrectLogin.innerHTML = 'Please enter your password'
    }
}

function loginPage(name) {
    navBar.classList.replace('d-none', 'd-flex')
    loggedInSection.classList.replace('d-none', 'd-flex')
    loggedInPage.innerHTML = `Welcome ${name}`
}


loginButton.addEventListener('click', login)

logout.addEventListener('click', logoutFunction)

function logoutFunction() {
    navBar.classList.replace('d-flex', 'd-none')
    loggedInSection.classList.replace('d-block', 'd-none')
    displayLogin()
}