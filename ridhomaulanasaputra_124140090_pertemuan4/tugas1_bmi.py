berat = float(input("Berat badan (kg): "))
tinggi = float(input("Tinggi badan (m): "))

if berat <= 0 or tinggi <= 0:
    print("Berat dan tinggi harus lebih besar dari nol.")
else:
    bmi = berat / (tinggi * tinggi)

    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif bmi < 25:
        kategori = "Berat badan normal"
    elif bmi < 30:
        kategori = "Berat badan berlebih"
    else:
        kategori = "Obesitas"

    print(f"BMI      : {bmi:.2f}")
    print(f"Kategori : {kategori}")