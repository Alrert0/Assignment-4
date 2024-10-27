document.getElementById('calculate').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('startingBid').value);
    const loveLetter = document.getElementById('loveLetter').value;

    if (!name || isNaN(price)) {
        alert("You left something behind, double-check it :)");
        return;
    }

    price = education(price);
    price = networth(price);
    price = age(price);
    price = reputationmult(price);

    price += castes(price);
    price += skill();
    price += reputationadd();

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

function age(price) {
    const ageRadios = document.getElementsByName('age');
    ageRadios.forEach(ageRadio => {
        if (ageRadio.checked) {
            price *= parseFloat(ageRadio.value);
        }
    });
    return price;
}

function reputationmult(price) {
    const reputations = [
        document.getElementById('gossip_parents'),
        document.getElementById('gossip_character')
    ];
    reputations.forEach(rep => {
        if (rep.checked) {
            price *= parseFloat(rep.value);
        }
    });
    return price;
}

function reputationadd() {
    const generalGossip = document.getElementById('general_gossip');
    return generalGossip.checked ? parseFloat(generalGossip.value) : 0;
}

function castes(price) {
    const caste = parseFloat(document.getElementById('caste').value);
    return caste || 0;
}

function skill() {
    const skills = [
        document.getElementById('music'),
        document.getElementById('cook'),
        document.getElementById('easygoing'),
        document.getElementById('sing')
    ];
    return skills.filter(skill => skill.checked).reduce((total, skill) => total + parseFloat(skill.value), 0);
}

function displayResult(person) {
    document.getElementById('result').innerHTML = `
        <p>Final Dowry Price for ${person.name}: $${person.finalPrice}</p>
        <p>Love Letter: ${person.loveLetter}</p>
    `;
}
