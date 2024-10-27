document.getElementById('calculate').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('startingBid').value);
    const loveLetter = document.getElementById('loveLetter').value;

    if (!name || isNaN(price)) {
        alert(" you left something behind, double-check it :) ");
        return;
    }

    price = education(price);
    price = networth(price);
    price = castes(price);
    price += skill();
    price = age(price);
    price = reputation(price);

    const person = {
        name,
        finalPrice: price.toFixed(2),
        loveLetter
    };

    displayResult(person);
});

function education(price) {
    const education = parseFloat(document.getElementById('education').value);
    return education ? price * education : price;
}

function networth(price) {
    const netWorth = parseFloat(document.getElementById('networth').value);
    return netWorth ? price * netWorth : price;
}

function castes(price) {
    const caste = parseFloat(document.getElementById('caste').value);
    return caste ? price + caste : price;
}

function skill() {
    const skills = [document.getElementById('music'), document.getElementById('cook'), document.getElementById('easygoing'), document.getElementById('sing')];
    return skills.filter(skill => skill.checked).reduce((total, skill) => total + parseFloat(skill.value), 0);
}

function age(price) {
    const ageRadios = document.getElementsByName('age');
    ageRadios.forEach(ageRadio => {
        if (ageRadio.checked) {
            price *= parseFloat(ageRadio.value);
        }
    });
    return price;
}

function reputation(price) {
    const reputations = [document.getElementById('gossip_parents'), document.getElementById('gossip_character'), document.getElementById('general_gossip')];
    for (let i = 0; i < reputations.length; i++) {
        if (reputations[i].checked) {
            const value = parseFloat(reputations[i].value);
            price = value < 0 ? price + value : price * value;
        }
    }
    return price;
}


function displayResult(person) {
    document.getElementById('result').innerHTML = `
        <p>Final Dowry Price for ${person.name}: $${person.finalPrice}</p>
        <p>Love Letter: ${person.loveLetter}</p>
    `;
}
