const navContainer = document.getElementById('navContainer');
const contentDisplay = document.getElementById('contentDisplay');
const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');

let currentContext = 'mlp'; // 'mlp' or 'cnn'

const linkConfig = {
    mlp: {
        drive: "https://drive.google.com/drive/folders/1j-D29WQCyklz4rO97xnlBkLzua_yYsNr?usp=drive_link",
        sheet: "https://docs.google.com/spreadsheets/d/168b2HTbaESEmDoPbq3chFuffH62HEIM_ZI8S3iS0WDM/edit?usp=sharing",
        colab: "https://colab.research.google.com/drive/17iGqg880tG-09JtiUt8Dz03Pktj1dBUw?usp=drive_link",
        model: "https://colab.research.google.com/drive/1SuDJRL2hR3ti64F4GilhanFfEGZknuiX?usp=drive_link",
        canva: "https://www.canva.com/design/DAG7NDv7tXg/KPqwkEIvn16RJSef-XaOAw/edit?utm_content=DAG7NDv7tXg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
    },
    cnn: {
        drive: "https://drive.google.com/drive/folders/1tEBcQqzKwvyhC3v8dd9QuaoPjT1_hxQc?usp=drive_link",
        sheet: "https://docs.google.com/spreadsheets/d/1RGnyaLMXOrPhTUVHY1yWRj9SIOnHqvinldjD4sDvsu0/edit?usp=drive_link",
        colab: "javascript:void(0)", 
        model: "javascript:void(0)", 
        canva: "https://www.canva.com/design/DAG8Ge8mlLs/uSVIAp8Le8c1aGbSC39zzQ/edit?utm_content=DAG8Ge8mlLs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
    }
};

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function switchProject(type) {
    currentContext = type;
    
    document.getElementById('btn-mlp').classList.remove('active');
    document.getElementById('btn-cnn').classList.remove('active');
    document.getElementById(`btn-${type}`).classList.add('active');

    renderNav();
    renderHome();
}

function renderNav() {
    navContainer.innerHTML = '';
    const data = currentContext === 'mlp' ? mlpData : cnnData;

    data.forEach((member, index) => {
        const div = document.createElement('div');
        div.className = 'nav-item';
        div.innerHTML = `<span>${member.name}</span> <small style="opacity:0.7">${member.role.split(':')[1] || 'Anggota'}</small>`;
        div.onclick = () => loadMember(index);
        navContainer.appendChild(div);
    });
}

// Fungsi copy satu block
function copyCode(elementId) {
    const codeText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        alert("Kode berhasil disalin!");
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

// Fungsi BARU: Copy SEMUA eksperimen (1-10) sekaligus
function copyAllExperiments(memberIndex) {
    const data = cnnData[memberIndex];
    let fullCode = `# ==========================================\n`;
    fullCode += `# GABUNGAN 10 EKSPERIMEN - ${data.name.toUpperCase()}\n`;
    fullCode += `# ==========================================\n\n`;

    data.experiments.forEach(exp => {
        fullCode += `# ------------------------------------------\n`;
        fullCode += `# EKSPERIMEN ${exp.id}\n`;
        fullCode += `# Deskripsi: ${exp.desc}\n`;
        fullCode += `# ------------------------------------------\n`;
        fullCode += `${exp.code}\n\n`;
        fullCode += `print("Selesai Eksperimen ${exp.id}")\n`;
        fullCode += `# ==========================================\n\n`;
    });

    navigator.clipboard.writeText(fullCode).then(() => {
        alert(`Berhasil menyalin gabungan 10 Eksperimen untuk ${data.name}!`);
    }).catch(err => {
        console.error('Gagal menyalin all: ', err);
    });
}

function renderHome() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (window.innerWidth <= 850) toggleSidebar();

    const links = linkConfig[currentContext];
    const title = currentContext === 'mlp' ? 'Dashboard MLP' : 'Dashboard CNN';

    contentDisplay.innerHTML = `
        <div class="header-section" style="text-align:center; margin-top:20px;">
            <h1>${title}</h1>
        </div>

        <div class="card" style="max-width:800px; margin: 0 auto;">
            <h3 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:15px; color:var(--primary);">
                Link Penting (${currentContext.toUpperCase()})
            </h3>
            <div class="resource-grid">
                <a href="${links.drive}" target="_blank" class="resource-btn btn-drive">
                    Folder Drive
                </a>

                <a href="${links.sheet}" target="_blank" class="resource-btn btn-sheet">
                    Google Sheet
                </a>

                ${currentContext === 'mlp' ? `
                <a href="${links.colab}" target="_blank" class="resource-btn btn-colab">
                    Pre-processing Data
                </a>
                <a href="${links.model}" target="_blank" class="resource-btn btn-model">
                    Referensi Kode
                </a>
                ` : ''}
                
                <a href="${links.canva}" target="_blank" class="resource-btn btn-canva">
                    Presentasi Canva
                </a>
            </div>

            <div style="margin-top: 30px;">
                <a href="javascript:void(0)" onclick="renderLearning()" class="resource-btn btn-learn">
                    TOLONG BELAJAR
                </a>
            </div>
        </div>
    `;
}

function renderLearning() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (window.innerWidth <= 850 && sidebar.classList.contains('active')) {
        toggleSidebar();
    }

    contentDisplay.innerHTML = `
        <div class="header-section" style="text-align:center;">
            <h1>Panduan Belajar JST</h1>
            <p style="color: #64748b; margin-top: 10px;">Roadmap</p>
        </div>

        <div class="learning-layout">
            <div class="learning-section">
                <span class="section-label">Bahasa Indonesia</span>
                <h3>Tutorial Dasar JST</h3>
                
                <a href="https://drive.google.com/file/d/1EGJnQFNFaH4Bs9II3sM1RVhBIT3JWBsy/view?usp=drive_link" target="_blank" class="pdf-download" style="margin-bottom: 25px;">
                    Materi MLP dari dosen
                </a>
                
                <div class="roadmap-item">
                    <div>
                        <span class="roadmap-number">1</span>
                        <strong>Pengenalan Neural Network</strong>
                    </div>
                    <a href="https://youtu.be/x2D-glFuKEA?si=gXHIDDFRsfJkTM9z" target="_blank" class="roadmap-link">
                        Tonton Video Part 1
                    </a>
                </div>

                <div class="roadmap-item">
                    <div>
                        <span class="roadmap-number">2</span>
                        <strong>Training dan Backpropagation</strong>
                    </div>
                    <a href="https://youtu.be/qePUhs34qA8?si=ie7kl57JrEw74MOr" target="_blank" class="roadmap-link">
                        Tonton Video Part 2
                    </a>
                </div>
            </div>

            <div class="learning-section">
                <span class="section-label">English (Visual Terbaik)</span>
                <h3>3Blue1Brown Series</h3>
                
                <div class="roadmap-item">
                    <div>
                        <span class="roadmap-number">1</span>
                        <strong>What is a Neural Network?</strong>
                    </div>
                    <a href="https://youtu.be/aircAruvnKk?si=Bt4NukDi3kv5t928" target="_blank" class="roadmap-link">
                        Watch Chapter 1
                    </a>
                </div>

                <div class="roadmap-item">
                    <div>
                        <span class="roadmap-number">2</span>
                        <strong>Backpropagation</strong>
                    </div>
                    <a href="https://youtu.be/Ilg3gGewQ5U?si=GiHceikzuAS3Ft6H" target="_blank" class="roadmap-link">
                        Watch Chapter 3
                    </a>
                </div>
            </div>
        </div>
    `;
}

function loadMember(index) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item')[index].classList.add('active');

    if (window.innerWidth <= 850 && sidebar.classList.contains('active')) {
        toggleSidebar();
    }

    const data = currentContext === 'mlp' ? mlpData[index] : cnnData[index];

    let contentHTML = '';

    if (currentContext === 'mlp') {
        const experimentsHTML = data.experiments.length > 0 ? 
            data.experiments.map(exp => {
                const activClass = exp.activ === 'ReLU' ? 'badge-step' : 'badge-sig';
                return `
                    <tr>
                        <td><strong>${exp.id}</strong></td>
                        <td><code class="layer-badge">${exp.layers}</code></td>
                        <td><span class="badge ${activClass}">${exp.activ}</span></td>
                        <td>${exp.lr}</td>
                        <td>${exp.epoch}</td>
                        <td>${exp.batch}</td>
                        <td>${exp.seed}</td>
                    </tr>
                `
            }).join('') : 
            `<tr><td colspan="7" style="text-align:center; padding: 20px; color: #64748b;">Belum ada data eksperimen.</td></tr>`;

        contentHTML = `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="width:40px">No</th>
                            <th>Hidden Layers & Node</th>
                            <th>Fungsi Aktivasi</th>
                            <th>Learning Rate</th>
                            <th>Epoch</th>
                            <th>Batch Size</th>
                            <th>Seed</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${experimentsHTML}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        // Tombol COPY ALL
        contentHTML += `
            <button onclick="copyAllExperiments(${index})" class="btn-copy-all">
                COPY SEMUA 10 EKSPERIMEN (GABUNGAN)
            </button>
        `;

        // Render CNN blocks
        contentHTML += data.experiments.map(exp => `
            <div class="exp-block">
                <div class="exp-header">
                    <span>Eksperimen ${exp.id}</span>
                    <small style="color:#64748b; font-weight:normal;">${exp.desc}</small>
                </div>
                <div class="code-wrapper">
                    <button class="copy-btn" onclick="copyCode('code-${exp.id}')">Copy</button>
                    <pre class="code-block" id="code-${exp.id}">${exp.code}</pre>
                </div>
            </div>
        `).join('');
    }

    contentDisplay.innerHTML = `
        <div class="header-section">
            <h1>${data.name}</h1>
            <span class="role-badge">${data.role}</span>
        </div>

        <div class="card">
            <div class="tabs">
                <button class="tab-btn active" onclick="switchTab(event, 'tugas')">${currentContext === 'mlp' ? 'Tabel Eksperimen' : '10 Variasi Kodingan'}</button>
                <button class="tab-btn" onclick="switchTab(event, 'panduan')">Panduan</button>
            </div>

            <div id="tugas" class="tab-content active">
                <div style="padding: 15px; background: #f0f9ff; border-left: 4px solid var(--accent); border-radius: 4px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #0f172a; font-weight: 600;">
                        Fitur: <code style="background: white; padding: 2px 8px; border-radius: 3px; color: #d946ef;">${data.features}</code>
                    </p>
                </div>
                
                ${contentHTML}
            </div>

            <div id="panduan" class="tab-content">
                <div class="spec-grid" style="margin-top:0; margin-bottom:20px;">
                    <div class="spec-item">
                        <label>Dataset</label>
                        <div style="color: #0ea5e9;">${data.features}</div>
                    </div>
                    <div class="spec-item">
                        <label>Input</label>
                        <div class="formula-box">${data.origin}</div>
                    </div>
                </div>
                
                <div class="guide-text">${data.guide}</div>
            </div>
        </div>
    `;
}

function switchTab(evt, tabName) {
    const parent = evt.target.closest('.card');
    parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelector(`#${tabName}`).classList.add('active');
    evt.target.classList.add('active');
}

renderNav();
renderHome();