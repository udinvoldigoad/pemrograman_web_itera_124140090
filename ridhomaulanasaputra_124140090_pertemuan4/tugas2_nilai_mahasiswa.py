def hitung_nilai_akhir(data):
    """Terima dictionary mahasiswa dan kembalikan nilai akhir berbobot."""
    return (
        0.30 * data["nilai_uts"]
        + 0.40 * data["nilai_uas"]
        + 0.30 * data["nilai_tugas"]
    )


def tentukan_grade(nilai):
    """Terima nilai akhir dan kembalikan grade A, B, C, D, atau E."""
    if nilai >= 80:
        return "A"
    if nilai >= 70:
        return "B"
    if nilai >= 60:
        return "C"
    if nilai >= 50:
        return "D"
    return "E"


mahasiswa = [
    {
        "nama": "Ridho", "nim": "124140090",
        "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88,
    },
    {
        "nama": "Syehab", "nim": "124140102",
        "nilai_uts": 72, "nilai_uas": 76, "nilai_tugas": 78,
    },
    {
        "nama": "Raihan", "nim": "124140108",
        "nilai_uts": 65, "nilai_uas": 63, "nilai_tugas": 70,
    },
    {
        "nama": "Pais", "nim": "124140144",
        "nilai_uts": 52, "nilai_uas": 54, "nilai_tugas": 55,
    },
    {
        "nama": "Arul", "nim": "124140096",
        "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 48,
    },
]

print(f"{'Nama':<16} {'NIM':<12} {'Nilai Akhir':>12} {'Grade':>5}")
print("-" * 48)

for data in mahasiswa:
    nilai = hitung_nilai_akhir(data)
    data["nilai_akhir"] = nilai
    data["grade"] = tentukan_grade(nilai)

    print(
        f"{data['nama']:<16} {data['nim']:<12} "
        f"{nilai:>12.2f} {data['grade']:>5}"
    )

tertinggi = max(mahasiswa, key=lambda data: data["nilai_akhir"])
terendah = min(mahasiswa, key=lambda data: data["nilai_akhir"])

print(f"\nTertinggi: {tertinggi['nama']} ({tertinggi['nim']}) "
      f"- {tertinggi['nilai_akhir']:.2f}, grade {tertinggi['grade']}")
print(f"Terendah : {terendah['nama']} ({terendah['nim']}) "
      f"- {terendah['nilai_akhir']:.2f}, grade {terendah['grade']}")