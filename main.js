document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputText');
    const output = document.getElementById('output');
    const goButton = document.querySelector('.go-button');
    const magicParticles = document.querySelector('.magic-particles');
    const copyButton = document.getElementById('copyButton');
    const downloadButton = document.getElementById('downloadButton');
    const fontSelect = document.getElementById('fontSelect');

    input.addEventListener('input', () => {
        transformText();
    });

    goButton.addEventListener('click', () => {
        if (input.value) {
            transformText(true);
        }
    });

    goButton.addEventListener('mousedown', () => {
        goButton.style.transform = 'translateY(-50%) scale(1.1)';
    });

    goButton.addEventListener('mouseup', () => {
        goButton.style.transform = 'translateY(-50%) scale(1)';
    });

    goButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        goButton.style.transform = 'translateY(-50%) scale(1.1)';
    });

    goButton.addEventListener('touchend', () => {
        goButton.style.transform = 'translateY(-50%) scale(1)';
    });

    copyButton.addEventListener('click', copyText);
    downloadButton.addEventListener('click', downloadImage);
    fontSelect.addEventListener('change', () => transformText(true));

    function transformText(animate = false) {
        output.textContent = input.value;
        output.style.fontFamily = fontSelect.value;
        if (input.value) {
            output.classList.add('show');
            createMagicParticles();
            if (animate) {
                output.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    output.style.transform = 'scale(1)';
                }, 200);
            }
        } else {
            output.classList.remove('show');
            magicParticles.innerHTML = '';
        }
    }

    function createMagicParticles() {
        magicParticles.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDuration = `${Math.random() * 2 + 2}s`;
            particle.style.animationDelay = `${Math.random()}s`;
            magicParticles.appendChild(particle);
        }
    }

    function copyText() {
        const text = output.textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    }

    function downloadImage() {
        html2canvas(output).then(canvas => {
            const link = document.createElement('a');
            link.download = 'magical_text.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
});