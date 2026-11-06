PI = 3.14159


def luas_persegi(sisi):
    """Terima panjang sisi dan kembalikan luas persegi."""
    return sisi ** 2


def keliling_persegi(sisi):
    """Terima panjang sisi dan kembalikan keliling persegi."""
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Terima panjang dan lebar, lalu kembalikan luas persegi panjang."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Terima panjang dan lebar, lalu kembalikan keliling persegi panjang."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Terima jari-jari dan kembalikan luas lingkaran."""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Terima jari-jari dan kembalikan keliling lingkaran."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Terima suhu dalam Celsius dan kembalikan suhu dalam Fahrenheit."""
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Terima suhu dalam Celsius dan kembalikan suhu dalam Kelvin."""
    return celsius + 273.15