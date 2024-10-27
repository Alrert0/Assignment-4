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
    price = reputation(price);

    price += castes(price);
    price += skill();

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

function reputation(price) {
    const reputations = [
        document.getElementById('gossip_parents'),
        document.getElementById('gossip_character'),
        document.getElementById('general_gossip')
    ];
    reputations.forEach(rep => {
        if (rep.checked) {
            const value = parseFloat(rep.value);
            price = value < 1 ? price * value : price + value;
        }
    });
    return price;
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
