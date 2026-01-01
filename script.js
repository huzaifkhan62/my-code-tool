// 1. Tab Switching Logic (Tabs badalne ke liye)
function openTab(tabName) {
    // Sabhi tab-content se 'active' class hatao
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) {
        content.classList.remove("active");
    }

    // Sabhi buttons se 'active' class hatao
    const buttons = document.getElementsByClassName("tab-btn");
    for (let btn of buttons) {
        btn.classList.remove("active");
    }

    // Sirf chune hue tab ko dikhao
    document.getElementById(tabName).classList.add("active");
    
    // Click kiye gaye button ko highlight karo
    event.currentTarget.classList.add("active");
}

// 2. Code Running Logic (Preview dikhane ke liye)
function runCode() {
    const html = document.getElementById("html-code").value;
    const css = document.getElementById("css-code").value;
    const js = document.getElementById("js-code").value;
    const output = document.getElementById("output");

    const fullCode = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>
                    try {
                        ${js}
                    } catch (err) {
                        console.error(err);
                    }
                <\/script>
            </body>
        </html>
    `;
    output.srcdoc = fullCode;

    // Local Storage mein save karna taaki refresh pe data na jaye
    localStorage.setItem('h', html);
    localStorage.setItem('c', css);
    localStorage.setItem('j', js);
}

// 3. Download/Copy Logic (Code save karne ke liye)
function downloadProject() {
    const html = document.getElementById("html-code").value;
    const css = document.getElementById("css-code").value;
    const js = document.getElementById("js-code").value;

    const finalCode = `<html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;

    // Clipboard mein copy karne ki koshish
    navigator.clipboard.writeText(finalCode).then(() => {
        alert("Mubarak ho! Aapka poora project Copy ho gaya hai. Ab aap ise kahi bhi (Notes ya WhatsApp) Paste karke save kar sakte hain.");
    }).catch(err => {
        // Agar automatically copy na ho to ye dikhayega
        alert("Copy nahi ho paya, par aapka code ye raha:\n\n" + finalCode);
    });
}

// 4. Jab app pehli baar khule (Auto-load)
window.onload = () => {
    document.getElementById("html-code").value = localStorage.getItem('h') || "<h1>Hello!</h1>";
    document.getElementById("css-code").value = localStorage.getItem('c') || "h1 { color: blue; }";
    document.getElementById("js-code").value = localStorage.getItem('j') || "// coding start karo";
    runCode();
};
