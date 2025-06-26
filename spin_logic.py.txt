import random

# Define visual-only prizes (will be shown randomly)
visual_prizes = [
    "🎁 ₹0.10 – 10 টাকা",
    "🎁 ₹0.50 – 20 টাকা",
    "🎁 ₹0.80 – 25 টাকা",
    "🎁 ₹1.00 – 30 টাকা",
    "🎁 ₹5.00 – 50 টাকা"
]

# Real prize per spin so that total = ₹2.50 over 15 spins
real_prize_distribution = [
    0.10, 0.10, 0.10, 0.10, 0.10,
    0.20, 0.20, 0.10, 0.10, 0.20,
    0.10, 0.20, 0.10, 0.10, 0.10
]

def get_spin_result(spin_number, earned_today):
    if spin_number < 15:
        real_prize = real_prize_distribution[spin_number]
    else:
        real_prize = 0.0

    visual_prize = random.choice(visual_prizes)
    return real_prize, visual_prize
