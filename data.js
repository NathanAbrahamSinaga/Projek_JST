// File ini khusus menyimpan konfigurasi dan data anggota
const baseConfigs = [
    { layers: "[64]", lr: "0.01", epoch: 100, batch: 32 },
    { layers: "[128, 64]", lr: "0.005", epoch: 200, batch: 16 },
    { layers: "[64, 32]", lr: "0.001", epoch: 500, batch: 64 },
    { layers: "[32]", lr: "0.05", epoch: 150, batch: 32 },
    { layers: "[128, 64, 32]", lr: "0.001", epoch: 300, batch: 32 },
    { layers: "[64]", lr: "0.0005", epoch: 800, batch: 16 },
    { layers: "[64, 64]", lr: "0.01", epoch: 250, batch: 64 },
    { layers: "[32, 16]", lr: "0.001", epoch: 1000, batch: 128 },
    { layers: "[256, 128]", lr: "0.02", epoch: 150, batch: 32 },
    { layers: "[128, 64, 32, 16]", lr: "0.0001", epoch: 600, batch: 16 }
];

const generateExperiments = () => {
    const exps = [];
    baseConfigs.forEach((cfg, index) => {
        exps.push({
            id: index + 1,
            layers: cfg.layers,
            activ: "ReLU",
            lr: cfg.lr,
            epoch: cfg.epoch,
            batch: cfg.batch,
            seed: 42
        });
    });

    baseConfigs.forEach((cfg, index) => {
        exps.push({
            id: index + 11,
            layers: cfg.layers,
            activ: "Sigmoid",
            lr: cfg.lr,
            epoch: cfg.epoch,
            batch: cfg.batch,
            seed: 42
        });
    });

    return exps;
};

const teamData = [
    {
        name: "Anggota 1 (Raw)",
        role: "Role: Original Features",
        features: "Temp, Hum, Press, WindSpeed, WindDir, Precip, Cloud",
        origin: "Dataset Asli (7 Kolom)",
        guide: `
            <h4>Strategi:</h4>
            <p>Menggunakan fitur murni dari dataset tanpa melakukan feature engineering tambahan. Dilakukan 20 eksperimen (10 ReLU, 10 Sigmoid) dengan variasi Arsitektur, LR, dan Batch Size.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 2 (Thermal)",
        role: "Role: Comfort Engineering",
        features: "Temp, Humidity, ComfortIndex, TempHumidity",
        origin: "CI = T - 0.55(1 - H/100)(T - 14)",
        guide: `
            <h4>Strategi:</h4>
            <p>Fokus pada aspek termal. Menguji apakah fitur turunan suhu dan kelembaban lebih efektif daripada data mentah.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 3 (Wind)",
        role: "Role: Wind Engineering",
        features: "WindSpeed, WindDirection, WindPower",
        origin: "WindPower = WindSpeed²",
        guide: `
            <h4>Strategi:</h4>
            <p>Hipotesis bahwa kondisi cuaca sangat dipengaruhi oleh angin. Menggunakan fitur WindPower pada eksperimen variatif.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 4 (Pressure)",
        role: "Role: Physics Engineering",
        features: "AirPressure, Temperature, PressureTemp",
        origin: "PressureTemp = P / (T + 273.15)",
        guide: `
            <h4>Strategi:</h4>
            <p>Menggunakan hukum gas ideal. 20 Eksperimen (10 ReLU/10 Sigmoid) dijalankan untuk validasi fitur densitas udara.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 5 (Full)",
        role: "Role: All Features",
        features: "Raw + All Engineered (21 Fitur Total)",
        origin: "Gabungan Semua Kolom",
        guide: `
            <h4>Strategi:</h4>
            <p>Memasukkan semua 21 fitur. Eksperimen ini menguji kemampuan model menangani input dimensi tinggi.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 6 (Precip)",
        role: "Role: Rain/Snow Focus",
        features: "Precipitation, PrecipIntensity, CloudCover",
        origin: "PrecipIntensity = Precip * WindSpeed",
        guide: `
            <h4>Strategi:</h4>
            <p>Fokus mendeteksi hujan/salju. Eksperimen dilakukan untuk memaksimalkan deteksi cuaca basah menggunakan fitur intensitas presipitasi.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 7 (Minimal)",
        role: "Role: Feature Selection",
        features: "Temperature, Humidity, Precipitation",
        origin: "Top 3 Korelasi Tertinggi",
        guide: `
            <h4>Strategi:</h4>
            <p>Hanya menggunakan 3 fitur utama. Eksperimen ini bertujuan membuktikan efisiensi model minimalis.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 8 (Cat)",
        role: "Role: Categorical Focus",
        features: "WindDir (OneHot), CloudCover (OneHot)",
        origin: "pd.get_dummies()",
        guide: `
            <h4>Strategi:</h4>
            <p>Hanya menggunakan data kategorikal. Menguji kemampuan model belajar dari input biner/sparse saja.</p>
        `,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 9 (Hybrid)",
        role: "Role: Selected Hybrid",
        features: "Temp, WindPower, PressureTemp",
        origin: "Kombinasi Raw & Engineered Terpilih",
        guide: `
            <h4>Strategi:</h4>
            <p>Mengambil satu perwakilan terbaik dari setiap domain. 20 Eksperimen dilakukan untuk mencari stabilitas pada model hybrid.</p>
        `,
        experiments: generateExperiments()
    }
];