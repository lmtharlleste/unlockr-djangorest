import time
import pyotp
import qrcode


key = "jesuscristoemeurei"

totp = pyotp.TOTP(key)

uri = pyotp.totp.TOTP(key).provisioning_uri(name="8a8768as7d68768as7d6a8s7d6", issuer_name="Unlockr")
qrcode.make(uri).save("unlocker_app.png")


while True:
    print(totp.verify(input("Enter code: ")))



