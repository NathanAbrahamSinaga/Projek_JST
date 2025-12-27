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
// GENERATOR KODE CNN (UPDATED 10 VARIASI)
// =========================================
const generateCNNCode = (baseType) => {
    const codes = [];
    const learningRates = [0.001, 0.0005, 0.0001, 0.01, 0.002];
    const dropouts = [0.2, 0.3, 0.4, 0.5, 0.25];
    
    for(let i=1; i<=10; i++) {
        const lr = learningRates[(i-1) % 5];
        const dr = dropouts[(i-1) % 5];
        const epoch = 10 + i;
        let arch = "";
        
        // Logika variasi arsitektur berdasarkan Role Anggota
        switch(baseType) {
            case 'basic':
                arch = `model = Sequential([
    Conv2D(${32*i}, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'deep':
                arch = `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(${64 + (i*16)}, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(${dr}),
    Flatten(),
    Dense(256, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'reg': // Regularization (Dropout/Batchnorm)
                arch = `model = Sequential([
    Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(64, 64, 3)),
    BatchNormalization(),
    MaxPooling2D((2, 2)),
    Dropout(${dr}),
    Flatten(),
    Dense(${64*i}, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'strided': // No Pooling
                arch = `model = Sequential([
    Conv2D(32, (3, 3), strides=(2, 2), activation='relu', input_shape=(64, 64, 3)),
    Conv2D(${32 + (i*8)}, (3, 3), strides=(2, 2), activation='relu'),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'gap': // Global Average Pooling
                arch = `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(${64 + (i*8)}, (3, 3), activation='relu'),
    GlobalAveragePooling2D(),
    Dense(${64 + i}, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'large_kernel':
                arch = `model = Sequential([
    Conv2D(32, (5, 5), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(${32*i}, (5, 5), activation='relu'),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'leaky': // Activation LeakyReLU
                arch = `model = Sequential([
    Conv2D(32, (3, 3), input_shape=(64, 64, 3)),
    LeakyReLU(alpha=0.1),
    MaxPooling2D((2, 2)),
    Conv2D(${32+i*4}, (3, 3)),
    LeakyReLU(alpha=0.1),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            case 'sgd': // Optimizer variation (handled in string below)
                arch = `model = Sequential([
    Conv2D(32, (3, 3), activation='tanh', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(${100+i*10}, activation='tanh'),
    Dense(43, activation='softmax')
])`;
                break;
             case 'hybrid': // Complex
                arch = `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.2),
    Conv2D(${64+i*8}, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(43, activation='softmax')
])`;
                break;
            default: // Wide
                 arch = `model = Sequential([
    Conv2D(${64+i*8}, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(43, activation='softmax')
])`;
        }

        let optimizerStr = `optimizer = tf.keras.optimizers.Adam(learning_rate=${lr})`;
        if (baseType === 'sgd') {
            optimizerStr = `optimizer = tf.keras.optimizers.SGD(learning_rate=${lr}, momentum=0.9)`;
        }

        codes.push({
            id: i,
            desc: `Variasi ${i}: LR=${lr}, Epoch=${epoch}, Dropout=${dr}`,
            code: `${arch}

${optimizerStr}
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
history = model.fit(train_gen, epochs=${epoch}, validation_data=val_gen)`
        });
    }
    return codes;
};

// =========================================
// DATA PROYEK MLP (9 ANGGOTA -> UPDATE JADI 10 BIAR KONSISTEN)
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
// DATA PROYEK CNN (10 ANGGOTA)
// =========================================
const cnnData = [
    {
        name: "Anggota 1 (Baseline)",
        role: "Role: Basic CNN",
        features: "GTSRB Dataset (64x64)",
        origin: "Image Data",
        experiments: generateCNNCode('basic'),
        guide: "<h4>Baseline Model</h4><p>Fokus pada arsitektur sederhana 2 blok konvolusi untuk benchmark awal.</p>"
    },
    {
        name: "Anggota 2 (Deeper)",
        role: "Role: Deep Network",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('deep'),
        guide: "<h4>Penambahan Layer</h4><p>Menambah kedalaman layer konvolusi untuk menangkap fitur yang lebih kompleks.</p>"
    },
    {
        name: "Anggota 3 (Regularized)",
        role: "Role: Dropout & BN",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('reg'),
        guide: "<h4>Regularisasi</h4><p>Menggunakan Dropout dan BatchNormalization agresif untuk mencegah overfitting.</p>"
    },
    {
        name: "Anggota 4 (Data Aug)",
        role: "Role: Augmentation Focus",
        features: "GTSRB Dataset + Augment",
        origin: "Rotation, Zoom, Shift",
        experiments: generateCNNCode('basic'), // Menggunakan arsitektur basic tapi guide menjelaskan augmentasi
        guide: "<h4>Variasi Data</h4><p>Menggunakan ImageDataGenerator dengan parameter augmentasi berbeda di setiap eksperimen.</p>"
    },
    {
        name: "Anggota 5 (Wide)",
        role: "Role: Wide Filters",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('wide'),
        guide: "<h4>Lebar Layer</h4><p>Meningkatkan jumlah filter (32 -> 64 -> 128) untuk kapasitas pembelajaran lebih besar.</p>"
    },
    {
        name: "Anggota 6 (Strided)",
        role: "Role: No Pooling",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('strided'),
        guide: "<h4>Strided Convolution</h4><p>Mengganti MaxPooling dengan Convolution yang memiliki stride > 1 untuk downsampling.</p>"
    },
    {
        name: "Anggota 7 (GAP)",
        role: "Role: Global Avg Pooling",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('gap'),
        guide: "<h4>Parameter Reduction</h4><p>Menggunakan Global Average Pooling menggantikan Flatten untuk mengurangi jumlah parameter Dense layer.</p>"
    },
    {
        name: "Anggota 8 (Kernel)",
        role: "Role: Large Kernel",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('large_kernel'),
        guide: "<h4>Kernel Size 5x5</h4><p>Menggunakan ukuran filter yang lebih besar (5x5) untuk menangkap area reseptif yang lebih luas.</p>"
    },
    {
        name: "Anggota 9 (Activ)",
        role: "Role: LeakyReLU/ELU",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('leaky'),
        guide: "<h4>Fungsi Aktivasi</h4><p>Mengganti ReLU standar dengan LeakyReLU untuk mengatasi masalah 'Dying ReLU'.</p>"
    },
    {
        name: "Anggota 10 (Optim)",
        role: "Role: SGD Optimizer",
        features: "GTSRB Dataset",
        origin: "Image Data",
        experiments: generateCNNCode('sgd'),
        guide: "<h4>Optimizer Tuning</h4><p>Fokus membandingkan performa menggunakan optimizer SGD dengan Momentum dibandingkan Adam.</p>"
    }
];