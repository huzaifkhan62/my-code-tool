function openTab(tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) { content.classList.remove("active"); }
    const buttons = document.getElementsByClassName("tab-btn");
    for (let btn of buttons) { btn.classList.remove("active"); }
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

function runCode() {
    const html = document.getElementById("html-code").value;
    const css = document.getElementById("css-code").value;
    const js = document.getElementById("js-code").value;
    const output = document.getElementById("output");
    const fullCode = `<html><head><style>${css}</style></head><body>${html}<script>try{${js}}catch(e){console.error(e)}<\/script></body></html>`;
    output.srcdoc = fullCode;
    localStorage.setItem('h', html);
    localStorage.setItem('c', css);
    localStorage.setItem('j', js);
}

// YAHI HAI WO NAYA DOWNLOAD CODE
function downloadProject() {
    const html = document.getElementById("html-code").value;
    const css = document.getElementById("css-code").value;
    const js = document.getElementById("js-code").value;

    const finalFileContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Exported App</title><style>${css}</style></head><body>${html}<script>try{${js}}catch(err){alert("Error: "+err.message)}<\/script></body></html>`;

    const blob = new Blob([finalFileContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyCreatedApp.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

window.onload = () => {
    document.getElementById("html-code").value = localStorage.getItem('h') || "<h1>Hello!</h1>";
    document.getElementById("css-code").value = localStorage.getItem('c') || "h1 { color: blue; }";
    document.getElementById("js-code").value = localStorage.getItem('j') || "";
    runCode();
};
