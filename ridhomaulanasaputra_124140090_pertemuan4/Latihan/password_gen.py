import random
import string


def buat_password_acak(panjang=8):
    """Terima panjang password dan kembalikan string acak sepanjang itu."""
    karakter = string.ascii_letters + string.digits
    return "".join(random.choice(karakter) for _ in range(panjang))