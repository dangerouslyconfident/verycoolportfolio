document.addEventListener('DOMContentLoaded', () => {

    const bootTextElement = document.getElementById('boot-text');
    const mainContent = document.getElementById('main-content');
    const bootScreen = document.getElementById('boot-screen');
    const startup = document.querySelector('.crtStartup');
    // const startup = crtstartup[0];

    const lines = [
        'AK-OS v1.0 BIOS booting...',
        'CPU: AAKASH-8086 @ 4.77THz',
        'Memory check: 690TB RAM... OK',
        'Initializing video adapter... OK',
        'Searching for boot drive... Found.',
        'Loading kernel...',
        "Loading... aakash.exe...",
        'Executing... aakash.exe',
        ''
    ];
    startup.volume = 1.0;
    let lineIndex = 0;
    let charIndex = 0;

    // Add the blinking cursor at the start
    bootTextElement.classList.add('cursor');

    function type() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            if (charIndex < currentLine.length) {
                // Type the next character
                bootTextElement.textContent += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(type, 10); // Adjust typing speed here (milliseconds)
                // startup.volume = 1.0;
                // startup.currentTime = 0; // Rewind to the start
                startup.play();
            } else {
                bootTextElement.textContent += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(type, 100);
                // startup.volume = 1.0;
                // startup.currentTime = 0; // Rewind to the start
                // startup.play();
            }
        } else {
            // Animation is finished
            bootTextElement.classList.remove('cursor');
            setTimeout(hideBootScreen, 1000); 
        }
    }

    function hideBootScreen() {
        bootScreen.classList.add('hidden');
        setTimeout(() => {
            mainContent.style.display = 'grid'; // Or 'grid', 'flex', etc. depending on your layout
        }, 1000); // This time must match the CSS transition duration
    }


    type();
});