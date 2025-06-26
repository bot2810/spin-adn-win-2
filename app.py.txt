from flask import Flask, render_template, request, redirect, session
from datetime import datetime
import json, os
from spin_logic import get_spin_result
from telegram_api import send_reward_to_user, notify_admin

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Change this to a strong secret in production

DATABASE_FILE = "database.json"

def load_db():
    with open(DATABASE_FILE, "r") as f:
        return json.load(f)

def save_db(data):
    with open(DATABASE_FILE, "w") as f:
        json.dump(data, f, indent=2)

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        telegram_id = request.form.get("telegram_id")
        db = load_db()
        if telegram_id not in db["users"]:
            db["users"][telegram_id] = {
                "total_spins_today": 0,
                "total_earned_today": 0.0,
                "last_spin_date": ""
            }
            save_db(db)
        session["telegram_id"] = telegram_id
        return redirect("/spin")
    return render_template("login.html")

@app.route("/spin")
def spin_page():
    if "telegram_id" not in session:
        return redirect("/")
    return render_template("spin.html")

@app.route("/spin-result", methods=["POST"])
def spin_result():
    telegram_id = session.get("telegram_id")
    db = load_db()
    user = db["users"][telegram_id]
    today = datetime.now().strftime("%Y-%m-%d")

    if user["last_spin_date"] != today:
        user["total_spins_today"] = 0
        user["total_earned_today"] = 0.0
        user["last_spin_date"] = today

    if user["total_spins_today"] >= 15:
        return {"status": "limit_reached", "message": "🎯 Daily 15 spin limit reached."}

    prize, visual = get_spin_result(user["total_spins_today"], user["total_earned_today"])
    user["total_spins_today"] += 1
    user["total_earned_today"] += prize
    save_db(db)

    # Telegram bot update
    send_reward_to_user(telegram_id, prize)
    notify_admin(telegram_id, prize)

    return {"status": "ok", "visual": visual}

@app.route("/rules")
def rules():
    return render_template("rules.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
@app.route("/admin")
def admin_panel():
    key = request.args.get("key")
    if key != "yourpass":
        return "Unauthorized"
    db = load_db()
    return render_template("admin.html", users=db["users"])
