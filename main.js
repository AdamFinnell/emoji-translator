const input = document.querySelector('#translator-input');
const results = document.querySelector('#results');
const radioButtons = document.querySelectorAll('.translation-section');
const submitButton = document.querySelector("#submit-button");

function addGlitchEffect() {
    results.classList.add('glitch');
    setTimeout(() => results.classList.remove('glitch'), 500);
}

function handleSubmit() {
    const inputText = input.value.trim();
    const selectedMode = document.querySelector('input[name="translation-section"]:checked').value;

    if (!inputText) {
        results.textContent = 'ERROR: Input required';
        results.style.color = 'var(--neon-pink)';
        addGlitchEffect();
        return;
    }

    results.innerHTML = '<span class="loading">Processing...</span>';
    results.style.color = 'var(--neon-cyan)';

    setTimeout(() => {
        let result;

        switch (selectedMode) {
            case 'encode':
                result = encode(inputText);
                break;
            case 'translate':
                result = translate(inputText);
                break;
            case 'madlib':
                result = madlib(inputText);
                break;
            case 'search':
                let found = search(inputText);
                result = found.length
                    ? found.map(e => `${e.symbol} (${e.name})`).join(' ')
                    : 'No matching emojis found.';
                break;
            case 'random':
                const modes = ['encode', 'translate', 'madlib', 'search'];
                const randomMode = modes[Math.floor(Math.random() * modes.length)];

                switch (randomMode) {
                    case 'encode':
                        result = encode(inputText);
                        break;
                    case 'translate':
                        result = translate(inputText);
                        break;
                    case 'madlib':
                        result = madlib(inputText);
                        break;
                    case 'search':
                        let foundRandom = search(inputText);
                        result = foundRandom.length
                            ? foundRandom.map(e => `${e.symbol} (${e.name})`).join(' ')
                            : 'No matching emojis found.';
                        break;
                }

                result = `🎲 [${randomMode.toUpperCase()}] ${result}`;
                break;

            default:
                result = 'Unknown mode';
        }

        results.textContent = result;
        results.style.color = 'var(--text-primary)';
        addGlitchEffect();
    }, 800);
}

input.addEventListener('input', () => {
    handleSubmit();
});

submitButton.addEventListener('click', handleSubmit);

input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });



radioButtons.forEach(radio => {
    const section = radio.closest('.radio-button-section');

    radio.addEventListener('change', function () {
        document.querySelectorAll('.radio-button-section').forEach(s => {
            s.classList.remove('active');
        });

        if (this.checked) {
            section.classList.add('active');
        }
    });
});

document.querySelector('#encode').closest('.radio-button-section').classList.add('active');

const placeholder = "Enter your text or emojis here...";
let i = 0;

function typePlaceholder() {
    if (i < placeholder.length) {
        input.placeholder = placeholder.slice(0, i + 1);
        i++;
        setTimeout(typePlaceholder, 100);
    }
}

setTimeout(() => {
    input.placeholder = "";
    i = 0;
    typePlaceholder();
}, 1000);

document.querySelector('#help-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    const helpList = document.querySelector('#help-text');

    helpList.classList.toggle('hidden');
});