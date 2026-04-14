create database portal_beasiswa;

CREATE TABLE pengajuan (
    id INT NOT NULL AUTO_INCREMENT,
    nama VARCHAR(100) NULL,
    deskripsi TEXT NULL,
    universitas VARCHAR(100) NULL,
    prodi VARCHAR(100) NULL,
    semester INT NULL,
    ukt INT NULL,
    ipk DOUBLE(3,2) NULL,
    tipe_beasiswa ENUM('Prestasi', 'Reguler', 'Leadership') NULL,
    PRIMARY KEY (id)
);

CREATE TABLE register_user (
    id INT NOT NULL AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);