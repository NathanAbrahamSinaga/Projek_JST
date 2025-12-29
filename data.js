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
    
    const variations = {
        basic: [
            { lr: 0.001, opt: 'adam', epoch: 15, batch: 32, filters: [32, 64], dense: 128, dropout: null },
            { lr: 0.0005, opt: 'adam', epoch: 20, batch: 64, filters: [64, 128], dense: 256, dropout: null },
            { lr: 0.01, opt: 'sgd', epoch: 12, batch: 32, filters: [32, 32], dense: 64, dropout: null },
            { lr: 0.002, opt: 'rmsprop', epoch: 18, batch: 16, filters: [48, 96], dense: 192, dropout: null },
            { lr: 0.0001, opt: 'adam', epoch: 25, batch: 128, filters: [16, 32], dense: 256, dropout: null },
            { lr: 0.005, opt: 'sgd', epoch: 10, batch: 64, filters: [64, 64], dense: 128, dropout: null },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, filters: [32, 128], dense: 512, dropout: null },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [40, 80], dense: 160, dropout: null },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [56, 112], dense: 224, dropout: null },
            { lr: 0.0002, opt: 'sgd', epoch: 30, batch: 64, filters: [24, 48], dense: 256, dropout: null }
        ],
        deep: [
            { lr: 0.001, opt: 'adam', epoch: 18, batch: 32, layers: [32, 64, 128], dense: 256, dropout: [0.25, 0.5] },
            { lr: 0.0005, opt: 'adam', epoch: 25, batch: 64, layers: [64, 128, 256], dense: 512, dropout: [0.3, 0.5] },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, layers: [32, 64, 64], dense: 128, dropout: [0.2, 0.4] },
            { lr: 0.002, opt: 'rmsprop', epoch: 20, batch: 16, layers: [48, 96, 192], dense: 384, dropout: [0.25, 0.5] },
            { lr: 0.0001, opt: 'adam', epoch: 35, batch: 128, layers: [16, 32, 64], dense: 256, dropout: [0.3, 0.6] },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, layers: [64, 128, 128], dense: 512, dropout: [0.2, 0.5] },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, layers: [40, 80, 160], dense: 320, dropout: [0.25, 0.5] },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, layers: [56, 112, 224], dense: 448, dropout: [0.3, 0.5] },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, layers: [32, 96, 128], dense: 256, dropout: [0.25, 0.4] },
            { lr: 0.0002, opt: 'sgd', epoch: 40, batch: 64, layers: [24, 48, 96], dense: 384, dropout: [0.3, 0.5] }
        ],
        reg: [
            { lr: 0.001, opt: 'adam', epoch: 20, batch: 32, filters: [32, 64], dropout: [0.1, 0.2] },
            { lr: 0.0005, opt: 'adam', epoch: 25, batch: 64, filters: [64, 128], dropout: [0.2, 0.3] },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, filters: [32, 64], dropout: [0.3, 0.4] },
            { lr: 0.002, opt: 'rmsprop', epoch: 18, batch: 16, filters: [48, 96], dropout: [0.15, 0.25] },
            { lr: 0.0001, opt: 'adam', epoch: 30, batch: 128, filters: [32, 64], dropout: [0.4, 0.5] },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, filters: [64, 128], dropout: [0.25, 0.35] },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, filters: [40, 80], dropout: [0.2, 0.3] },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [56, 112], dropout: [0.3, 0.4] },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [32, 96], dropout: [0.15, 0.3] },
            { lr: 0.0002, opt: 'sgd', epoch: 35, batch: 64, filters: [48, 96], dropout: [0.35, 0.45] }
        ],
        augmented: [
            { lr: 0.001, opt: 'adam', epoch: 25, batch: 32, filters: [32, 64], rotation: 15, zoom: 0.1, shift: 0.1 },
            { lr: 0.0005, opt: 'adam', epoch: 30, batch: 64, filters: [64, 128], rotation: 20, zoom: 0.15, shift: 0.15 },
            { lr: 0.01, opt: 'sgd', epoch: 20, batch: 32, filters: [32, 64], rotation: 10, zoom: 0.05, shift: 0.05 },
            { lr: 0.002, opt: 'rmsprop', epoch: 22, batch: 16, filters: [48, 96], rotation: 25, zoom: 0.2, shift: 0.1 },
            { lr: 0.0001, opt: 'adam', epoch: 40, batch: 128, filters: [32, 64], rotation: 30, zoom: 0.25, shift: 0.2 },
            { lr: 0.005, opt: 'sgd', epoch: 18, batch: 64, filters: [64, 128], rotation: 15, zoom: 0.1, shift: 0.15 },
            { lr: 0.001, opt: 'adam', epoch: 28, batch: 32, filters: [40, 80], rotation: 20, zoom: 0.15, shift: 0.1 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 24, batch: 48, filters: [56, 112], rotation: 18, zoom: 0.12, shift: 0.12 },
            { lr: 0.003, opt: 'adam', epoch: 16, batch: 32, filters: [32, 96], rotation: 12, zoom: 0.08, shift: 0.08 },
            { lr: 0.0002, opt: 'sgd', epoch: 45, batch: 64, filters: [48, 96], rotation: 25, zoom: 0.2, shift: 0.15 }
        ],
        wide: [
            { lr: 0.001, opt: 'adam', epoch: 15, batch: 32, filters: [128, 256], dense: 512 },
            { lr: 0.0005, opt: 'adam', epoch: 20, batch: 64, filters: [256, 512], dense: 1024 },
            { lr: 0.01, opt: 'sgd', epoch: 12, batch: 32, filters: [96, 192], dense: 384 },
            { lr: 0.002, opt: 'rmsprop', epoch: 18, batch: 16, filters: [160, 320], dense: 640 },
            { lr: 0.0001, opt: 'adam', epoch: 25, batch: 128, filters: [64, 128], dense: 512 },
            { lr: 0.005, opt: 'sgd', epoch: 10, batch: 64, filters: [192, 384], dense: 768 },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, filters: [144, 288], dense: 576 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [112, 224], dense: 448 },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [176, 352], dense: 704 },
            { lr: 0.0002, opt: 'sgd', epoch: 30, batch: 64, filters: [80, 160], dense: 320 }
        ],
        strided: [
            { lr: 0.001, opt: 'adam', epoch: 18, batch: 32, filters: [32, 64], stride1: 2, stride2: 2 },
            { lr: 0.0005, opt: 'adam', epoch: 22, batch: 64, filters: [64, 128], stride1: 2, stride2: 2 },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, filters: [32, 64], stride1: 1, stride2: 2 },
            { lr: 0.002, opt: 'rmsprop', epoch: 20, batch: 16, filters: [48, 96], stride1: 2, stride2: 2 },
            { lr: 0.0001, opt: 'adam', epoch: 28, batch: 128, filters: [32, 64], stride1: 2, stride2: 1 },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, filters: [64, 128], stride1: 2, stride2: 2 },
            { lr: 0.001, opt: 'adam', epoch: 24, batch: 32, filters: [40, 80], stride1: 2, stride2: 2 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [56, 112], stride1: 1, stride2: 2 },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [32, 96], stride1: 2, stride2: 1 },
            { lr: 0.0002, opt: 'sgd', epoch: 32, batch: 64, filters: [48, 96], stride1: 2, stride2: 2 }
        ],
        gap: [
            { lr: 0.001, opt: 'adam', epoch: 20, batch: 32, filters: [32, 64], dense: 128 },
            { lr: 0.0005, opt: 'adam', epoch: 25, batch: 64, filters: [64, 128], dense: 256 },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, filters: [32, 64], dense: 64 },
            { lr: 0.002, opt: 'rmsprop', epoch: 18, batch: 16, filters: [48, 96], dense: 192 },
            { lr: 0.0001, opt: 'adam', epoch: 30, batch: 128, filters: [32, 64], dense: 256 },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, filters: [64, 128], dense: 128 },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, filters: [40, 80], dense: 160 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [56, 112], dense: 224 },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [32, 96], dense: 128 },
            { lr: 0.0002, opt: 'sgd', epoch: 35, batch: 64, filters: [48, 96], dense: 192 }
        ],
        large_kernel: [
            { lr: 0.001, opt: 'adam', epoch: 18, batch: 32, filters: [32, 64], kernel1: 5, kernel2: 5 },
            { lr: 0.0005, opt: 'adam', epoch: 22, batch: 64, filters: [64, 128], kernel1: 7, kernel2: 5 },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, filters: [32, 64], kernel1: 5, kernel2: 3 },
            { lr: 0.002, opt: 'rmsprop', epoch: 20, batch: 16, filters: [48, 96], kernel1: 5, kernel2: 5 },
            { lr: 0.0001, opt: 'adam', epoch: 28, batch: 128, filters: [32, 64], kernel1: 7, kernel2: 7 },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, filters: [64, 128], kernel1: 5, kernel2: 5 },
            { lr: 0.001, opt: 'adam', epoch: 24, batch: 32, filters: [40, 80], kernel1: 5, kernel2: 3 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [56, 112], kernel1: 7, kernel2: 5 },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [32, 96], kernel1: 5, kernel2: 5 },
            { lr: 0.0002, opt: 'sgd', epoch: 32, batch: 64, filters: [48, 96], kernel1: 7, kernel2: 3 }
        ],
        leaky: [
            { lr: 0.001, opt: 'adam', epoch: 20, batch: 32, filters: [32, 64], alpha: 0.1 },
            { lr: 0.0005, opt: 'adam', epoch: 25, batch: 64, filters: [64, 128], alpha: 0.2 },
            { lr: 0.01, opt: 'sgd', epoch: 15, batch: 32, filters: [32, 64], alpha: 0.05 },
            { lr: 0.002, opt: 'rmsprop', epoch: 18, batch: 16, filters: [48, 96], alpha: 0.15 },
            { lr: 0.0001, opt: 'adam', epoch: 30, batch: 128, filters: [32, 64], alpha: 0.3 },
            { lr: 0.005, opt: 'sgd', epoch: 12, batch: 64, filters: [64, 128], alpha: 0.1 },
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, filters: [40, 80], alpha: 0.2 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 16, batch: 48, filters: [56, 112], alpha: 0.15 },
            { lr: 0.003, opt: 'adam', epoch: 14, batch: 32, filters: [32, 96], alpha: 0.1 },
            { lr: 0.0002, opt: 'sgd', epoch: 35, batch: 64, filters: [48, 96], alpha: 0.25 }
        ],
        hybrid: [
            { lr: 0.001, opt: 'adam', epoch: 22, batch: 32, layers: [32, 32, 64], dropout: 0.2, dense: 512 },
            { lr: 0.0005, opt: 'adam', epoch: 28, batch: 64, layers: [64, 64, 128], dropout: 0.3, dense: 1024 },
            { lr: 0.01, opt: 'sgd', epoch: 18, batch: 32, layers: [32, 32, 64], dropout: 0.15, dense: 256 },
            { lr: 0.002, opt: 'rmsprop', epoch: 24, batch: 16, layers: [48, 48, 96], dropout: 0.25, dense: 768 },
            { lr: 0.0001, opt: 'adam', epoch: 35, batch: 128, layers: [32, 32, 64], dropout: 0.35, dense: 512 },
            { lr: 0.005, opt: 'sgd', epoch: 15, batch: 64, layers: [64, 64, 128], dropout: 0.2, dense: 512 },
            { lr: 0.001, opt: 'adam', epoch: 26, batch: 32, layers: [40, 40, 80], dropout: 0.25, dense: 640 },
            { lr: 0.0008, opt: 'rmsprop', epoch: 20, batch: 48, layers: [56, 56, 112], dropout: 0.3, dense: 896 },
            { lr: 0.003, opt: 'adam', epoch: 16, batch: 32, layers: [32, 32, 96], dropout: 0.2, dense: 512 },
            { lr: 0.0002, opt: 'sgd', epoch: 40, batch: 64, layers: [48, 48, 96], dropout: 0.3, dense: 768 }
        ]
    };

    const formatArch = (layers) => {
        return `[\n            ${layers.join(',\n            ')}\n        ]`;
    };

    const config = variations[baseType] || variations.basic;
    
    for(let i = 0; i < 10; i++) {
        const v = config[i];
        let archList = "";
        
        switch(baseType) {
            case 'basic':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', ${v.dense}, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'deep':
                archList = formatArch([
                    `('Conv2D', ${v.layers[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout[0]})`,
                    `('Conv2D', ${v.layers[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout[0]})`,
                    `('Conv2D', ${v.layers[2]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', ${v.dense}, 'relu')`,
                    `('Dropout', ${v.dropout[1]})`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'reg':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout[0]})`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout[1]})`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'augmented':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'wide':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', ${v.dense}, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'strided':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu', ${v.stride1})`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu', ${v.stride2})`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'gap':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'relu')`,
                    `('GlobalAveragePooling2D',)`,
                    `('Dense', ${v.dense}, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'large_kernel':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (${v.kernel1}, ${v.kernel1}), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (${v.kernel2}, ${v.kernel2}), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'leaky':
                archList = formatArch([
                    `('Conv2D', ${v.filters[0]}, (3, 3), 'linear')`,
                    `('LeakyReLU', ${v.alpha})`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Conv2D', ${v.filters[1]}, (3, 3), 'linear')`,
                    `('LeakyReLU', ${v.alpha})`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'linear')`,
                    `('LeakyReLU', ${v.alpha})`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            case 'hybrid':
                archList = formatArch([
                    `('Conv2D', ${v.layers[0]}, (3, 3), 'relu')`,
                    `('Conv2D', ${v.layers[1]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout})`,
                    `('Conv2D', ${v.layers[2]}, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Dropout', ${v.dropout})`,
                    `('Flatten',)`,
                    `('Dense', ${v.dense}, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
                break;

            default:
                archList = formatArch([
                    `('Conv2D', 32, (3, 3), 'relu')`,
                    `('MaxPooling2D', (2, 2))`,
                    `('Flatten',)`,
                    `('Dense', 128, 'relu')`,
                    `('Dense', 43, 'softmax')`
                ]);
        }

        const configString = `'experiment_${i+1}': {
        'name': 'Experiment ${i+1} (Var: LR=${v.lr}, B=${v.batch})',
        'learning_rate': ${v.lr},
        'epochs': ${v.epoch},
        'batch_size': ${v.batch},
        'optimizer': '${v.opt}',
        'architecture': ${archList}
    },`;

        codes.push({
            id: i+1,
            desc: `Config ${i+1}: LR=${v.lr}, Opt=${v.opt}, Epoch=${v.epoch}, Batch=${v.batch}`,
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
        guide: `
            <h4>Strategi Eksperimen: Arsitektur CNN Dasar</h4>
            <p>Pendekatan ini menggunakan struktur Convolutional Neural Network (CNN) paling sederhana sebagai fondasi untuk memahami kemampuan dasar model dalam klasifikasi rambu lalu lintas. Tujuan utamanya adalah menciptakan baseline performance yang akan menjadi acuan perbandingan untuk eksperimen-eksperimen yang lebih kompleks.</p>
            
            <p><strong>Komponen Utama Arsitektur:</strong></p>
            <p>Model ini menggunakan dua blok konvolusi yang masing-masing terdiri dari layer Conv2D dan MaxPooling2D. Blok pertama menangkap fitur-fitur dasar seperti garis dan sudut, sementara blok kedua menangkap pola yang lebih kompleks seperti bentuk rambu. Setelah proses ekstraksi fitur, data diratakan (flatten) dan diproses melalui fully connected layer untuk klasifikasi akhir.</p>
            
            <p><strong>Variasi Parameter yang Diuji:</strong></p>
            <p>Sepuluh eksperimen berbeda dirancang dengan memvariasikan jumlah filter konvolusi (dari 16 hingga 256), learning rate (0.0001 sampai 0.01), optimizer (Adam, SGD, RMSprop), jumlah epoch (10-30), dan batch size (16-128). Variasi ini membantu menemukan kombinasi optimal untuk dataset rambu lalu lintas yang memiliki 43 kelas berbeda.</p>
            
            <p><strong>Ekspektasi Hasil:</strong></p>
            <p>Dengan arsitektur sederhana ini, kita mengharapkan akurasi validasi sekitar 85-92%. Hasil ini akan memberikan gambaran seberapa baik model dasar dapat belajar dari dataset tanpa teknik optimasi lanjutan. Eksperimen dengan filter lebih banyak dan learning rate yang tepat (sekitar 0.001) biasanya memberikan performa terbaik.</p>
            
            <p><strong>Analisis yang Perlu Dilakukan:</strong></p>
            <p>Perhatikan hubungan antara jumlah filter dengan akurasi - apakah lebih banyak filter selalu lebih baik? Bandingkan juga performa berbagai optimizer dan temukan sweet spot untuk learning rate. Catat juga training time untuk setiap konfigurasi agar bisa menimbang trade-off antara akurasi dan efisiensi komputasi.</p>
        `
    },
    {
        name: "Anggota 2 (Deeper)",
        role: "Role: Deep Network",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNConfig('deep'),
        guide: `
            <h4>Strategi Eksperimen: Jaringan CNN yang Lebih Dalam</h4>
            <p>Eksperimen ini mengeksplorasi konsep "deep learning" secara literal dengan menambah kedalaman arsitektur neural network. Hipotesisnya adalah bahwa layer yang lebih banyak memungkinkan model untuk belajar representasi fitur yang lebih hierarkis dan kompleks - dari fitur sederhana di layer awal hingga konsep abstrak di layer akhir.</p>
            
            <p><strong>Struktur Berlapis yang Diimplementasikan:</strong></p>
            <p>Berbeda dengan baseline yang hanya memiliki 2 blok konvolusi, model ini menggunakan 3 blok konvolusi dengan pola peningkatan filter secara bertahap (misalnya 32→64→128). Setiap blok diikuti dengan MaxPooling untuk downsampling dan dropout untuk mencContinue1:35 PMegah overfitting. Arsitektur ini mirip dengan VGG-style network yang telah terbukti efektif untuk image recognition.</p>
        <p><strong>Regularisasi dengan Dropout:</strong></p>
        <p>Karena model yang lebih dalam cenderung overfit, setiap eksperimen mengintegrasikan dropout layer dengan rate yang bervariasi (0.2-0.6). Dropout pada layer konvolusi membantu model tidak terlalu bergantung pada fitur-fitur spesifik, sementara dropout sebelum layer output memastikan model tidak menghafal training data.</p>
        
        <p><strong>Trade-off yang Harus Diperhatikan:</strong></p>
        <p>Model yang lebih dalam membutuhkan lebih banyak data dan waktu training. Oleh karena itu, eksperimen ini menggunakan epoch yang lebih banyak (15-40) dan learning rate yang lebih kecil (0.0001-0.01) untuk memberikan waktu cukup bagi model untuk konvergen. Batch size juga divariasikan untuk menemukan keseimbangan antara kecepatan training dan kestabilan gradient.</p>
        
        <p><strong>Metrik Evaluasi Kunci:</strong></p>
        <p>Selain akurasi, perhatikan gap antara training dan validation accuracy. Gap yang besar mengindikasikan overfitting meskipun dropout sudah digunakan. Monitor juga loss curve - apakah smooth atau berfluktuasi? Model yang baik seharusnya mencapai akurasi 93-96% dengan validation loss yang terus menurun hingga plateau.</p>
    `
},
{
    name: "Anggota 3 (Regularized)",
    role: "Role: Dropout Focus",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('reg'),
    guide: `
        <h4>Strategi Eksperimen: Fokus pada Regularisasi Dropout</h4>
        <p>Eksperimen ini secara khusus menginvestigasi peran dropout sebagai teknik regularisasi utama untuk mencegah overfitting pada CNN. Dropout bekerja dengan cara "mematikan" sejumlah neuron secara acak selama training, memaksa jaringan untuk tidak terlalu bergantung pada neuron atau fitur tertentu.</p>
        
        <p><strong>Variasi Dropout Rate yang Sistematis:</strong></p>
        <p>Sepuluh konfigurasi didesain dengan dropout rate yang berbeda-beda di setiap layer. Eksperimen dimulai dari dropout ringan (0.1-0.2) hingga agresif (0.4-0.5). Dropout ditempatkan strategis setelah MaxPooling layer untuk mengatur informasi yang mengalir ke layer berikutnya. Pendekatan ini membantu mengidentifikasi "sweet spot" dropout yang optimal.</p>
        
        <p><strong>Arsitektur yang Konsisten:</strong></p>
        <p>Untuk memastikan perbandingan yang fair, semua eksperimen menggunakan struktur dasar yang sama: dua blok konvolusi dengan MaxPooling. Yang berbeda hanyalah dropout rate di setiap posisi. Ini memungkinkan kita untuk mengisolasi efek dropout tanpa variabel pengganggu dari arsitektur yang berbeda.</p>
        
        <p><strong>Ekspektasi Perilaku Model:</strong></p>
        <p>Dropout yang terlalu rendah (< 0.1) kemungkinan tidak cukup untuk mencegah overfitting, terutama jika data training terbatas. Sebaliknya, dropout yang terlalu tinggi (> 0.5) dapat menyebabkan underfitting karena terlalu banyak informasi yang dibuang. Model dengan dropout optimal (sekitar 0.2-0.3) seharusnya menunjukkan validation accuracy yang stabil dan mendekati training accuracy.</p>
        
        <p><strong>Analisis Komparatif:</strong></p>
        <p>Bandingkan learning curve dari setiap eksperimen. Plot training vs validation accuracy untuk mengidentifikasi mana yang paling stabil. Hitung juga generalization gap (training acc - validation acc). Eksperimen dengan gap terkecil sambil mempertahankan akurasi tinggi menandakan dropout rate yang ideal untuk dataset ini.</p>
    `
},
{
    name: "Anggota 4 (Data Aug)",
    role: "Role: Augmentation Focus",
    features: "GTSRB Dataset + Augment",
    origin: "Rotation, Zoom, Shift",
    experiments: generateCNNConfig('augmented'),
    guide: `
        <h4>Strategi Eksperimen: Augmentasi Data untuk Robustness</h4>
        <p>Fokus eksperimen ini adalah meningkatkan kemampuan generalisasi model melalui data augmentation. Teknik ini mensimulasikan variasi real-world dengan memodifikasi gambar training secara artifisial - rotasi, zoom, dan shifting. Hasilnya, model belajar mengenali rambu dari berbagai sudut dan kondisi, bukan hanya posisi standar dalam dataset.</p>
        
        <p><strong>Teknik Augmentasi yang Diterapkan:</strong></p>
        <p>Setiap eksperimen menggunakan kombinasi transformasi berbeda: rotasi (10-30 derajat), zoom (0.05-0.25), dan horizontal/vertical shift (0.05-0.2). Rotasi membantu model mengenali rambu yang miring, zoom mensimulasikan variasi jarak kamera, dan shift mengajarkan model untuk tidak terlalu fokus pada posisi pusat gambar. Transformasi ini diaplikasikan secara random pada setiap epoch.</p>
        
        <p><strong>Arsitektur Model:</strong></p>
        <p>Meskipun fokus pada preprocessing, arsitektur tetap menggunakan struktur baseline yang proven. Ini penting karena tujuannya adalah mengukur dampak augmentasi, bukan membandingkan arsitektur. Namun, karena augmentasi efektif memperbanyak data, model perlu ditraining lebih lama (20-45 epoch) untuk sepenuhnya belajar dari variasi yang ada.</p>
        
        <p><strong>Parameter Augmentasi vs Performa:</strong></p>
        <p>Augmentasi yang terlalu ekstrem (rotasi 30°, zoom 0.25) dapat mendistorsi rambu hingga tidak recognizable, menurunkan performa. Sebaliknya, augmentasi minimal (rotasi 10°, zoom 0.05) mungkin tidak cukup untuk meningkatkan robustness. Eksperimen ini mencari parameter augmentasi yang optimal - cukup agresif untuk meningkatkan generalisasi tapi tidak sampai merusak informasi penting.</p>
        
        <p><strong>Indikator Keberhasilan:</strong></p>
        <p>Model dengan augmentasi yang baik akan menunjukkan training accuracy yang sedikit lebih rendah dari baseline (karena data lebih sulit), tapi validation accuracy yang lebih tinggi atau setidaknya sama. Yang lebih penting, model ini seharusnya lebih robust terhadap test data yang belum pernah dilihat. Perhatikan juga konsistensi akurasi across classes - augmentasi yang baik mengurangi bias terhadap orientasi tertentu.</p>
    `
},
{
    name: "Anggota 5 (Wide)",
    role: "Role: Wide Filters",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('wide'),
    guide: `
        <h4>Strategi Eksperimen: Arsitektur CNN dengan Filter Lebar</h4>
        <p>Pendekatan ini mengeksplorasi konsep "width over depth" - alih-alih menambah layer, model diperlebar dengan menambah jumlah filter di setiap convolutional layer. Setiap filter belajar mendeteksi fitur berbeda, jadi lebih banyak filter = lebih banyak fitur yang bisa ditangkap secara simultan. Ini mirip seperti memiliki banyak "mata" yang melihat gambar dari perspektif berbeda.</p>
        
        <p><strong>Konfigurasi Filter yang Ekstensif:</strong></p>
        <p>Eksperimen menggunakan jumlah filter yang sangat besar - mulai dari 64 hingga 512 filter per layer. Sebagai perbandingan, baseline hanya menggunakan 32-64 filter. Dengan 256 atau 512 filter, model memiliki representational capacity yang jauh lebih besar, memungkinkan pembelajaran fitur yang lebih nuanced dan detail.</p>
        
        <p><strong>Implikasi Komputasi:</strong></p>
        <p>Trade-off utama adalah computational cost. Model dengan 512 filter membutuhkan memori dan waktu training yang signifikan lebih besar. Oleh karena itu, beberapa eksperimen mengkombinasikan wide network dengan batch size yang lebih besar (64-128) untuk memanfaatkan GPU parallel processing. Learning rate juga disesuaikan - terlalu tinggi dapat menyebabkan unstable training pada model besar.</p>
        
        <p><strong>Dense Layer yang Proporsional:</strong></p>
        <p>Karena convolutional layer menghasilkan feature map yang besar, fully connected layer juga diperbesar (384-1024 neurons) untuk menampung informasi yang kaya. Namun, ini juga meningkatkan risiko overfitting, sehingga beberapa konfigurasi mungkin perlu menambahkan dropout atau regularisasi lain meskipun tidak menjadi fokus utama.</p>
        
        <p><strong>Evaluasi Performa:</strong></p>
        <p>Model wide seharusnya mencapai akurasi tertinggi (potensial 95-97%) karena kapasitas pembelajaran yang besar, tetapi perlu divalidasi apakah peningkatan ini worth the computational cost. Bandingkan accuracy gain per parameter - apakah model dengan 512 filter signifikan lebih baik dari 256 filter? Jika tidak, maka 256 filter lebih efisien. Perhatikan juga apakah model mulai overfit meskipun capacity-nya besar.</p>
    `
},
{
    name: "Anggota 6 (Strided)",
    role: "Role: No Pooling",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('strided'),
    guide: `
        <h4>Strategi Eksperimen: Strided Convolution Menggantikan Pooling</h4>
        <p>Eksperimen ini menantang konvensi arsitektur CNN dengan menghilangkan MaxPooling dan menggantinya dengan strided convolution. MaxPooling tradisional membuang informasi saat melakukan downsampling, sedangkan strided convolution mempelajari cara terbaik untuk mengurangi dimensi spatial melalui trainable parameters. Ini memberi model lebih banyak kontrol terhadap informasi apa yang dipertahankan.</p>
        
        <p><strong>Mekanisme Strided Convolution:</strong></p>
        <p>Alih-alih menggeser filter satu pixel per satu (stride=1), strided convolution menggunakan stride=2, yang berarti filter melompat dua pixel setiap kali. Ini menghasilkan output yang setengah ukuran input, sama seperti MaxPooling(2,2), tetapi prosesnya learnable. Model bisa belajar filter yang optimal untuk downsampling, tidak hanya mengambil max value seperti pooling.</p>
        
        <p><strong>Variasi Stride Pattern:</strong></p>
        <p>Sepuluh eksperimen menggunakan kombinasi stride yang berbeda. Beberapa menggunakan stride=2 di semua layer, yang lain mengkombinasikan stride=1 dan stride=2. Ada juga yang menempatkan strided convolution di awal (untuk quickly reduce dimensionality) atau di tengah (setelah fitur dasar terekstrak). Variasi ini membantu memahami di mana posisi optimal untuk downsampling yang learnable.</p>
        
        <p><strong>Kelebihan Teoritis:</strong></p>
        <p>Dengan tidak membuang informasi seperti MaxPooling, strided convolution berpotensi mempertahankan detail penting yang mungkin hilang di pooling. Ini sangat berguna untuk rambu-rambu dengan detail kecil yang krusial untuk klasifikasi. Model juga belajar invariance terhadap translation secara implisit melalui weight yang optimal, bukan hard-coded seperti pooling.</p>
        
        <p><strong>Evaluasi dan Perbandingan:</strong></p>
        <p>Bandingkan akurasi model strided dengan baseline yang menggunakan MaxPooling. Model strided mungkin memerlukan epoch lebih banyak untuk konvergen karena ada lebih banyak parameter yang harus dioptimasi. Perhatikan juga memory usage - strided convolution menggunakan lebih banyak memori karena semua weights trainable. Jika akurasi hanya meningkat sedikit dengan cost yang besar, maka MaxPooling mungkin lebih praktis. Namun, jika peningkatan signifikan (>2%), approach ini patut diadopsi.</p>
    `
},
{
    name: "Anggota 7 (GAP)",
    role: "Role: Global Avg Pooling",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('gap'),
    guide: `
        <h4>Strategi Eksperimen: Global Average Pooling untuk Reduksi Parameter</h4>
        <p>Eksperimen ini mengimplementasikan Global Average Pooling (GAP) sebagai pengganti Flatten + Dense layer yang besar. GAP bekerja dengan merata-ratakan seluruh feature map menjadi satu nilai per channel. Misalnya, jika ada 64 feature maps 8x8, GAP menghasilkan 64 nilai (rata-rata dari masing-masing map). Ini drastis mengurangi parameter dan risiko overfitting.</p>
        
        <p><strong>Keunggulan Global Average Pooling:</strong></p>
        <p>Dibanding Flatten yang menghasilkan ribuan parameter untuk Dense layer, GAP hanya menghasilkan jumlah nilai sebanyak jumlah filter terakhir. Ini membuat model jauh lebih ringan dan regularized secara natural. GAP juga memaksa convolutional layer untuk belajar features yang lebih meaningful karena output langsung di-average - tidak ada ruang untuk "menyembunyikan" informasi di spatial dimension.</p>
        
        <p><strong>Arsitektur Post-GAP:</strong></p>
        <p>Setelah GAP, biasanya hanya perlu satu Dense layer kecil sebelum output. Eksperimen ini memvariasikan ukuran Dense layer post-GAP (64-256 neurons) dan jumlah filter di layer konvolusi terakhir (32-128). Rasionya sederhana: lebih banyak filter = lebih banyak channels untuk di-average = representasi lebih kaya sebelum klasifikasi.</p>
        
        <p><strong>Trade-off Performa vs Simplicity:</strong></p>
        <p>GAP model biasanya sedikit kurang akurat (1-2%) dibanding model dengan Flatten + Dense besar, karena kehilangan informasi spatial. Namun, keuntungannya enormous: model jauh lebih kecil (bisa 10x lebih sedikit parameter), training lebih cepat, dan hampir tidak pernah overfit. Untuk deployment di device dengan resources terbatas, ini adalah pilihan excellent.</p>
        
        <p><strong>Analisis Hasil:</strong></p>
        <p>Fokus evaluasi pada parameter count vs accuracy. Hitung berapa parameter yang diselamatkan dengan GAP (bandingkan dengan baseline). Jika akurasi hanya turun 1-2% tapi parameter turun 80%, GAP adalah win. Perhatikan juga generalization - model GAP seringkali punya validation accuracy yang closer ke training accuracy karena less prone to overfitting. Monitor training speed juga, GAP model should train significantly faster.</p>
    `
},
{
    name: "Anggota 8 (Kernel)",
    role: "Role: Large Kernel",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('large_kernel'),
    guide: `
        <h4>Strategi Eksperimen: Eksplorasi Ukuran Kernel yang Lebih Besar</h4>
        <p>Eksperimen ini menyelidiki penggunaan kernel (filter) berukuran besar seperti 5x5 dan 7x7, berbeda dari standar 3x3. Kernel yang lebih besar memiliki receptive field lebih luas, artinya setiap neuron "melihat" area gambar yang lebih besar dalam satu operasi konvolusi. Ini berpotensi menangkap pola dan struktur yang lebih global tanpa perlu menumpuk banyak layer 3x3.</p>
        
        <p><strong>Receptive Field dan Context:</strong></p>
        <p>Kernel 3x3 hanya melihat 9 pixel sekaligus, sedangkan 5x5 melihat 25 pixel dan 7x7 melihat 49 pixel. Untuk rambu lalu lintas yang memiliki bentuk geometris besar (lingkaran, segitiga, segi enam), kernel besar bisa langsung mendeteksi shapes ini di early layers. Ini potensially lebih efisien daripada menunggu layer-layer dalam untuk membentuk representasi shapes tersebut.</p>
        
        <p><strong>Variasi Konfigurasi Kernel:</strong></p>
        <p>Eksperimen mencoba berbagai kombinasi: kernel 5x5 di semua layer, 7x7 di layer pertama followed by 5x5 atau 3x3, dan mix antara ukuran berbeda. Ide di balik variasi ini adalah layer awal mungkin benefit dari kernel besar (untuk capture global structure) sementara layer dalam bisa menggunakan kernel kecil (untuk detail refinement).</p>
        
        <p><strong>Cost vs Benefit Analysis:</strong></p>
        <p>Kernel besar datang dengan computational cost - kernel 5x5 memiliki hampir 3x parameter dibanding 3x3, dan 7x7 lebih dari 5x. Ini berarti training lebih lambat dan memory usage lebih tinggi. Trade-off ini harus dipertimbangkan: apakah accuracy gain justified? Untuk beberapa tasks seperti object detection, larger kernels terbukti beneficial. Untuk classification dengan gambar kecil (64x64), mungkin tidak perlu.</p>
        
        <p><strong>Metrik Evaluasi Spesifik:</strong></p>
        <p>Selain accuracy, perhatikan training time per epoch dan memory consumption. Bandingkan juga confusion matrix - apakah large kernels lebih baik mendeteksi specific classes yang memiliki large shapes? Check juga overfitting tendency - large kernels dengan banyak parameter lebih prone to overfit, jadi gap between train and validation accuracy adalah indikator penting. Model ideal: accuracy sebanding atau lebih baik dengan moderate increase in resource usage.</p>
    `
},
{
    name: "Anggota 9 (Activ)",
    role: "Role: LeakyReLU",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('leaky'),
    guide: `
        <h4>Strategi Eksperimen: Fungsi Aktivasi LeakyReLU sebagai Alternatif ReLU</h4>
        <p>Eksperimen ini mengganti fungsi aktivasi standar ReLU dengan LeakyReLU. Perbedaan fundamental adalah ReLU mengoutput 0 untuk semua nilai negatif (dying ReLU problem), sedangkan LeakyReLU mengalikan nilai negatif dengan small slope (alpha). Ini mempertahankan gradient flow bahkan untuk neurons dengan aktivasi negatif, potensially mengatasi masalah "dead neurons" yang common di deep networks.</p>
        
        <p><strong>Mekanisme LeakyReLU:</strong></p>
        <p>LeakyReLU defined sebagai f(x) = x jika x > 0, dan f(x) = alpha * x jika x ≤ 0. Parameter alpha (biasanya 0.01-0.3) menentukan seberapa "bocor" aktivasi untuk nilai negatif. Alpha yang lebih besar mempertahankan lebih banyak informasi dari negative activations, tapi terlalu besar bisa membuat model tidak nonlinear enough. Eksperimen ini memvariasikan alpha dari 0.05 hingga 0.3.</p>
        
        <p><strong>Implementasi di Seluruh Layer:</strong></p>
        <p>LeakyReLU diterapkan setelah setiap Conv2D dan Dense layer, menggantikan 'relu' activation. Karena keras tidak punya built-in 'leaky_relu' string activation, layer Conv2D diberi activation='linear' kemudian followed by explicit LeakyReLU layer. Ini memastikan kontrol penuh terhadap alpha parameter di setiap posisi dalam network.</p>
        
        <p><strong>Ekspektasi Performa:</strong></p>
        <p>Secara teoritis, LeakyReLU should menghasilkan training yang lebih stabil, especially di deep networks, karena gradients tidak ter-zero-kan completely. Ini bisa manifest sebagai faster convergence atau slightly higher final accuracy. Namun, untuk shallow networks atau dataset yang well-behaved, perbedaannya mungkin minimal. Yang penting adalah monitoring training dynamics - apakah loss turun lebih smooth? Apakah terjadi fewer sudden spikes?</p>
        
        <p><strong>Analisis Komparatif Detail:</strong></p>
        <p>Bandingkan learning curves dengan baseline ReLU - plot loss dan accuracy side by side. Hitung average gradient magnitude di setiap layer untuk verifikasi bahwa LeakyReLU memang maintain gradient flow better. Perhatikan juga final accuracy distribution across different alpha values: apakah ada sweet spot? Generally, alpha=0.1 atau 0.2 works well, but experimentation is key. If LeakyReLU gives 1-2% accuracy boost dengan training time sama, it's a worthy modification.</p>
    `
},
{
    name: "Anggota 10 (Hybrid)",
    role: "Role: Complex Hybrid",
    features: "GTSRB Dataset",
    origin: "Image Data",
    experiments: generateCNNConfig('hybrid'),
    guide: `
        <h4>Strategi Eksperimen: Arsitektur Hybrid dengan Multiple Techniques</h4>
        <p>Ini adalah eksperimen paling comprehensive yang mengkombinasikan multiple best practices dari eksperimen-eksperimen sebelumnya. Pendekatan hybrid mengintegrasikan: multiple consecutive Conv2D layers (before pooling), strategic dropout placement, large dense layers, dan architectural patterns dari research paper terkini. Tujuannya adalah mencapai state-of-the-art performance dengan menggabungkan teknik-teknik proven.</p>
        
        <p><strong>Consecutive Convolutions Pattern:</strong></p>
        <p>Alih-alih pattern Conv→Pool→Conv→Pool, hybrid model menggunakan Conv→Conv→Pool pattern. Dua convolution back-to-back (dengan activation di antara) memungkinkan extraction of more complex features sebelum downsampling. Ini inspired by VGGNet yang sukses menunjukkan bahwa stacking small kernels bisa sebanding atau lebih baik dari single large kernel, dengan fewer parameters.</p>
        
        <p><strong>Strategic Regularization:</strong></p>
        <p>Dropout ditempatkan strategically setelah pooling (untuk prevent feature co-adaptation) dan sebelum final classification layer (untuk prevent output overfitting). Rate dropout divariasikan per eksperimen (0.15-0.35) untuk find optimal balance. Terlalu sedikit dropout di model kompleks = overfit, terlalu banyak = underfit dan slow convergence.</p>
        
        <p><strong>Large Capacity Dense Layer:</strong></p>
        <p>Post-convolutional processing menggunakan dense layer yang sangat besar (512-1024 neurons) untuk fully leverage rich feature representations dari convolutional blocks. Ini memberi model enough capacity untuk learn complex decision boundaries antar 43 classes rambu yang bisa sangat similar. Large dense layer juga mem-buffer informasi sebelum final softmax classification.</p>
        
        <p><strong>Optimization Strategy:</strong></p>
        <p>Karena model complexity, training parameter requires careful tuning. Learning rate harus tidak terlalu besar (0.0001-0.003 range) untuk avoid overshooting optimal weights. Epoch count increased (15-40) untuk give model time untuk fully converge. Batch size juga varied untuk find sweet spot between training stability dan memory efficiency.</p>
        
        <p><strong>Expected Performance dan Evaluation:</strong></p>
        <p>Hybrid model should achieve highest accuracy among all experiments (target: 96-98%) karena combines strengths dari multiple approaches. Namun, pay attention ke overfitting indicators - gap between train dan validation accuracy. Ideal hybrid model: high accuracy on both with small gap (<3%). Also evaluate inference time dan model size - jika accuracy gain hanya 0.5% but model 3x larger, mungkin tidak worth untuk production deployment. Do cost-benefit analysis untuk determine best configuration untuk specific use case.</p>
    `
}
];
