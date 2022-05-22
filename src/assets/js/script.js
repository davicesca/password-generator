// Data
const characters = getAvailableCharacters(); // Array with all available characters
let animationFinished = true;

// HTML elements
const generatePasswordBtn = document.querySelector('#generate-btn'); // Generate password button
const passwordLbls = document.querySelectorAll('.random-password'); // Generated password containers 

// Event Listeners
generatePasswordBtn.addEventListener('click', generatePasswords);
passwordLbls.forEach(passwordLbl => passwordLbl.addEventListener('click', () => {
    passwordLbl.focus();
    passwordLbl.select();
    try {
        document.execCommand('copy');
    } catch {
        console.log('Error!');
    }
}));

// Functions
function generatePasswords(e) {
    e.preventDefault();
    if(!animationFinished) return;
    const passwordLength = parseInt(document.querySelector('#password-length').value);
    if(passwordLength < 1 || isNaN(passwordLength)) return;
    let passwords = [];
    for(let i = 0; i < 4; i++) {
        passwords.push(getRandomPassword(passwordLength));
    }
    renderPasswords(passwords);
}

function renderPasswords(passwords) {
    const passwordLblsArray = Array.from(passwordLbls);
    for(let i = 0; i < passwordLblsArray.length; i++) {
        passwordLblsArray[i].value = passwords[i];

        // Applying text transparency animation
        passwordLblsArray[i].classList.add('change-item');
        animationFinished = false;
        passwordLblsArray[i].addEventListener('animationend', function() {
            passwordLblsArray[i].classList.remove('change-item');
            animationFinished = true;    
        });
    }
}

function getRandomPassword(length) {
    let password = '';
    for(let i = 0; i < length; i++) {
        password += getRandomCharacter();
    }
    return password;
}

function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function getAvailableCharacters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890';
    const symbols = '~`! @#$%^&*()_-+={[}]|\:;"\'<,>.?/';

    const availableCharacters = alphabet + alphabet.toUpperCase() + numbers + symbols;
    return availableCharacters.split(''); // Transforming the availableCharacters string into an array.
}
