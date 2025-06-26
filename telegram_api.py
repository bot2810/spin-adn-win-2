import requests
from datetime import datetime

BOT_TOKEN = "YOUR_MAIN_BOT_TOKEN"
ADMIN_BOT_TOKEN = "YOUR_ADMIN_BOT_TOKEN"
ADMIN_ID = "YOUR_ADMIN_TELEGRAM_ID"

def send_reward_to_user(user_id, amount):
    msg = f"✅ You've received ₹{amount:.2f} in your account!"
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": user_id,
        "text": msg
    }
    requests.post(url, data=payload)

def notify_admin(user_id, amount):
    time_now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    msg = f"🎯 *Spin Notification*\n👤 User: `{user_id}`\n💰 Earned: ₹{amount:.2f}\n🕒 Time: {time_now}"
    url = f"https://api.telegram.org/bot{ADMIN_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": ADMIN_ID,
        "text": msg,
        "parse_mode": "Markdown"
    }
    requests.post(url, data=payload)
