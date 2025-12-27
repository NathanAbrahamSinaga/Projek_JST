// Konfigurasi dasar untuk MLP (tetap dipertahankan)
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

// =========================================
// GENERATOR CONFIG CNN (FORMAT BARU)
// =========================================
const generateCNNConfig = (baseType) => {
    const codes = [];
    const learningRates = [0.001, 0.0005, 0.0001, 0.01, 0.002];
    const optimizers = ['adam', 'sgd', 'rmsprop', 'adam', 'sgd'];
    
    for(let i=1; i<=10; i++) {
        const lr = learningRates[(i-1) % 5];
        const opt = baseType === 'sgd' ? 'sgd' : optimizers[(i-1)%5];
        const epoch = 10 + i;
        const batch = 32 * (i % 2 === 0 ? 2 : 1);
        
        let archList = "";

        // Helper untuk membuat string arsitektur rapi
        const formatArch = (layers) => {
            return `[\n            ${layers.join(',\n            ')}\n        ]`;
        };
        
        // Logika variasi arsitektur berdasarkan Role Anggota
        switch(baseType) {
            case 'basic':
                archList = formatArch([
                    `('Conv2D', ${32*i}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'deep':
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${64 + (i*16)}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', 0.25)`,
                    `('Flatten',)`,
                    `('Dense', 256, 'relu')`,
                    `('Dropout', 0.5)`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'reg': // Regularization (Dropout)
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', 0.${i})`, // Variasi dropout
                    `('Conv2D', 64, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', 0.${i})`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'strided': // No Pooling
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('Conv2D', ${32 + (i*8)}, (3, 3), 'relu', 2)`, // Stride 2 manual logic handled in backend parsing
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'gap': // Global Average Pooling
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${64 + (i*8)}, (3, 3), 'relu')`,
                    `('GlobalAveragePooling2D',)`, 
                    `('Dense', ${64 + i}, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'large_kernel':
                archList = formatArch([
                    `('Conv2D', 32, (5, 5), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${32*i}, (5, 5), 'relu')`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'leaky': // Activation LeakyReLU (Custom string representation for parsing)
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'linear')`,
                    `('LeakyReLU', 0.1)`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'linear')`,
                    `('LeakyReLU', 0.1)`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'hybrid': // Complex
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', 0.2)`,
                    `('Conv2D', ${64+i*8}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 512, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            default: // Wide / SGD / Others
                archList = formatArch([
                    `('Conv2D', ${64+i*8}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${128+i*8}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 512, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
        }

        // Format Dictionary Entry Python
        const configString = `'experiment_${i}': {
        'name': 'Experiment ${i} (Var: LR=${lr}, B=${batch})',
        'learning_rate': ${lr},
        'epochs': ${epoch},
        'batch_size': ${batch},
        'optimizer': '${opt}',
        'architecture': ${archList}
    },`;

        codes.push({
            id: i,
            desc: `Config ${i}: LR=${lr}, Opt=${opt}, HiddenLayers=Variabel`,
            code: configString
        });
    }
    return codes;
};

// =========================================
// DATA PROYEK MLP (TETAP)
// =========================================
const mlpData = [
    {
        name: "Anggota 1 (Raw)",
        role: "Role: Original Features",
        features: "Temp, Hum, Press, WindSpeed, WindDir, Precip, Cloud",
        origin: "Dataset Asli (7 Kolom)",
        guide: `<h4>Strategi:</h4><p>Menggunakan fitur murni dari dataset tanpa melakukan feature engineering tambahan.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 2 (Thermal)",
        role: "Role: Comfort Engineering",
        features: "Temp, Humidity, ComfortIndex, TempHumidity",
        origin: "CI = T - 0.55(1 - H/100)(T - 14)",
        guide: `<h4>Strategi:</h4><p>Fokus pada aspek termal. Menguji apakah fitur turunan suhu dan kelembaban lebih efektif.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 3 (Wind)",
        role: "Role: Wind Engineering",
        features: "WindSpeed, WindDirection, WindPower",
        origin: "WindPower = WindSpeed²",
        guide: `<h4>Strategi:</h4><p>Hipotesis bahwa kondisi cuaca sangat dipengaruhi oleh angin.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 4 (Pressure)",
        role: "Role: Physics Engineering",
        features: "AirPressure, Temperature, PressureTemp",
        origin: "PressureTemp = P / (T + 273.15)",
        guide: `<h4>Strategi:</h4><p>Menggunakan hukum gas ideal untuk validasi fitur densitas udara.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 5 (Full)",
        role: "Role: All Features",
        features: "Raw + All Engineered (21 Fitur Total)",
        origin: "Gabungan Semua Kolom",
        guide: `<h4>Strategi:</h4><p>Memasukkan semua 21 fitur. Menguji kemampuan model menangani input dimensi tinggi.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 6 (Precip)",
        role: "Role: Rain/Snow Focus",
        features: "Precipitation, PrecipIntensity, CloudCover",
        origin: "PrecipIntensity = Precip * WindSpeed",
        guide: `<h4>Strategi:</h4><p>Fokus mendeteksi hujan/salju menggunakan fitur intensitas presipitasi.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 7 (Minimal)",
        role: "Role: Feature Selection",
        features: "Temperature, Humidity, Precipitation",
        origin: "Top 3 Korelasi Tertinggi",
        guide: `<h4>Strategi:</h4><p>Hanya menggunakan 3 fitur utama untuk membuktikan efisiensi model minimalis.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 8 (Cat)",
        role: "Role: Categorical Focus",
        features: "WindDir (OneHot), CloudCover (OneHot)",
        origin: "pd.get_dummies()",
        guide: `<h4>Strategi:</h4><p>Hanya menggunakan data kategorikal (input biner/sparse).</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 9 (Hybrid)",
        role: "Role: Selected Hybrid",
        features: "Temp, WindPower, PressureTemp",
        origin: "Kombinasi Raw & Engineered Terpilih",
        guide: `<h4>Strategi:</h4><p>Mengambil satu perwakilan terbaik dari setiap domain.</p>`,
        experiments: generateExperiments()
    },
    {
        name: "Anggota 10 (Norm)",
        role: "Role: Data Normalization",
        features: "All Features (MinMax Scaled)",
        origin: "MinMaxScaler(0, 1)",
        guide: `<h4>Strategi:</h4><p>Fokus pada preprocessing data menggunakan normalisasi ketat 0-1 untuk semua fitur.</p>`,
        experiments: generateExperiments()
    }
];

// =========================================
// DATA PROYEK CNN (10 ANGGOTA - CONFIG STYLE)
// =========================================
const cnnData = [
    {
        name: "Anggota 1 (Baseline)",
        role: "Role: Basic CNN",
        features: "GTSRB Dataset (64x64)",
        origin: "Image Data",
        experiments: generateCNNConfig('basic'),
        guide: "<h4>Baseline Model</h4><p>Fokus pada arsitektur sederhana 2 blok konvolusi untuk benchmark awal.</p>"
    },
    {
        name: "Anggota 2 (Deeper)",
        role: "Role: Deep Network",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('deep'),
        guide: "<h4>Penambahan Layer</h4><p>Menambah kedalaman layer konvolusi untuk menangkap fitur yang lebih kompleks.</p>"
    },
    {
        name: "Anggota 3 (Regularized)",
        role: "Role: Dropout Focus",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('reg'),
        guide: "<h4>Regularisasi</h4><p>Menggunakan variasi Dropout rate yang berbeda-beda.</p>"
    },
    {
        name: "Anggota 4 (Data Aug)",
        role: "Role: Augmentation Focus",
        features: "GTSRB Dataset + Augment",
        origin: "Rotation, Zoom, Shift",
        experiments: generateCNNConfig('basic'), // Basic arch, guide explains augmentation
        guide: "<h4>Variasi Data</h4><p>Arsitektur tetap Basic, namun parameter preprocessing data berubah (tidak terlihat di config model).</p>"
    },
    {
        name: "Anggota 5 (Wide)",
        role: "Role: Wide Filters",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('wide'),
        guide: "<h4>Lebar Layer</h4><p>Meningkatkan jumlah filter secara drastis untuk kapasitas pembelajaran lebih besar.</p>"
    },
    {
        name: "Anggota 6 (Strided)",
        role: "Role: No Pooling",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('strided'),
        guide: "<h4>Strided Convolution</h4><p>Mengganti MaxPooling dengan Convolution (stride>1) untuk downsampling.</p>"
    },
    {
        name: "Anggota 7 (GAP)",
        role: "Role: Global Avg Pooling",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('gap'),
        guide: "<h4>Parameter Reduction</h4><p>Menggunakan Global Average Pooling menggantikan Flatten.</p>"
    },
    {
        name: "Anggota 8 (Kernel)",
        role: "Role: Large Kernel",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('large_kernel'),
        guide: "<h4>Kernel Size 5x5</h4><p>Menggunakan ukuran filter yang lebih besar (5x5).</p>"
    },
    {
        name: "Anggota 9 (Activ)",
        role: "Role: LeakyReLU",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('leaky'),
        guide: "<h4>Fungsi Aktivasi</h4><p>Mengganti ReLU standar dengan LeakyReLU.</p>"
    },
    {
        name: "Anggota 10 (Optim)",
        role: "Role: SGD Optimizer",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('sgd'),
        guide: "<h4>Optimizer Tuning</h4><p>Fokus membandingkan performa menggunakan optimizer SGD.</p>"
    }
];