import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin



print("PERSEGI")
for sisi in (4, 7):
    luas = math_operations.luas_persegi(sisi)
    keliling = math_operations.keliling_persegi(sisi)
    print(f"Sisi {sisi} | Luas {luas:.2f} | Keliling {keliling:.2f}")

print("\nPERSEGI PANJANG")
for panjang, lebar in ((8, 3), (10, 5)):
    luas = math_operations.luas_persegi_panjang(panjang, lebar)
    keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
    print(f"{panjang} × {lebar} | Luas {luas:.2f} | Keliling {keliling:.2f}")

print("\nLINGKARAN")
for jari_jari in (3, 7):
    luas = math_operations.luas_lingkaran(jari_jari)
    keliling = math_operations.keliling_lingkaran(jari_jari)
    print(f"Radius {jari_jari} | Luas {luas:.2f} | Keliling {keliling:.2f}")

print("\nKONVERSI SUHU")
for celsius in (0, 25, 100):
    fahrenheit = celsius_ke_fahrenheit(celsius)
    kelvin = celsius_ke_kelvin(celsius)
    print(f"{celsius} °C = {fahrenheit:.2f} °F = {kelvin:.2f} K")