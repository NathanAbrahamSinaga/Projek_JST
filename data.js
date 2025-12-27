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

const mlpData = [
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

const cnnData = [
    {
        name: "Eksperimen 1",
        role: "Baseline CNN",
        features: "GTSRB Dataset (German Traffic Sign)",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.25),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 10`,
        guide: "<h4>Baseline Model</h4><p>Model standar sebagai acuan performa awal dengan 2 blok konvolusi.</p>"
    },
    {
        name: "Eksperimen 2",
        role: "Deeper CNN",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.3),
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
learning_rate = 0.0005
epochs = 15`,
        guide: "<h4>Penambahan Layer</h4><p>Menambah kedalaman layer konvolusi untuk menangkap fitur yang lebih kompleks.</p>"
    },
    {
        name: "Eksperimen 3",
        role: "High Dropout",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Dropout(0.3),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.3),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.6),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 15`,
        guide: "<h4>Regularisasi Agresif</h4><p>Menggunakan rate dropout yang tinggi untuk mencegah overfitting pada training data.</p>"
    },
    {
        name: "Eksperimen 4",
        role: "Batch Normalization",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    BatchNormalization(),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    BatchNormalization(),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 12`,
        guide: "<h4>Stabilitas Training</h4><p>Menambahkan Batch Normalization setelah layer konvolusi untuk mempercepat konvergensi.</p>"
    },
    {
        name: "Eksperimen 5",
        role: "Strided Conv",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), strides=(2, 2), activation='relu', input_shape=(64, 64, 3)),
    Conv2D(64, (3, 3), strides=(2, 2), activation='relu'),
    Conv2D(128, (3, 3), strides=(2, 2), activation='relu'),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 15`,
        guide: "<h4>Tanpa Pooling</h4><p>Mengganti MaxPooling dengan Strided Convolution untuk downsampling dimensi spasial.</p>"
    },
    {
        name: "Eksperimen 6",
        role: "Global Avg Pooling",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    GlobalAveragePooling2D(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 20`,
        guide: "<h4>Reduksi Parameter</h4><p>Menggunakan Global Average Pooling sebagai pengganti Flatten untuk mengurangi jumlah parameter total secara drastis.</p>"
    },
    {
        name: "Eksperimen 7",
        role: "Data Augmentation",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    horizontal_flip=False,
    fill_mode='nearest',
    validation_split=0.2
)
# Arsitektur sama dengan Baseline
optimizer = 'adam'
epochs = 25`,
        guide: "<h4>Variasi Data</h4><p>Fokus pada manipulasi input data (rotasi, zoom, shift) untuk generalisasi model yang lebih baik.</p>"
    },
    {
        name: "Eksperimen 8",
        role: "Small Kernels",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 15`,
        guide: "<h4>Detail Fitur</h4><p>Menggunakan stack kernel kecil (3x3) tanpa stride di awal untuk menangkap detail halus sebelum pooling.</p>"
    },
    {
        name: "Eksperimen 9",
        role: "Wide Network",
        features: "GTSRB Dataset",
        origin: "Image Data (64x64)",
        code: `model = Sequential([
    Conv2D(64, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(43, activation='softmax')
])
optimizer = 'adam'
epochs = 15`,
        guide: "<h4>Lebar Layer</h4><p>Meningkatkan jumlah filter (width) pada setiap layer konvolusi untuk kapasitas pembelajaran yang lebih besar.</p>"
    }
];