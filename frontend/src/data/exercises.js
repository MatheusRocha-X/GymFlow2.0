// Banco de dados completo de exercícios
const rawExercises = [
  {
    "id": 1,
    "name": "Extensão de Quadril no Cabo (Coice)",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Donkey-Kickback.gif"
  },
  {
    "id": 2,
    "name": "Remada Alta Unilateral com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/One-Arm-Dumbbell-Upright-Row.gif"
  },
  {
    "id": 3,
    "name": "Desenvolvimento Militar Unilateral com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-One-Arm-Military-Press.gif"
  },
  {
    "id": 4,
    "name": "Puxada Unilateral no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Cable-One-Arm-Pulldown.gif"
  },
  {
    "id": 5,
    "name": "Rosca Martelo Sentado",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif"
  },
  {
    "id": 6,
    "name": "Elevação Posterior de Ombro com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Barbell-Rear-Delt-Raise.gif"
  },
  {
    "id": 7,
    "name": "Flexão de Pescoço Sentado com Arnês no Cabo",
    "category": "Outros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Seated-Neck-Flexion-with-head-harness.gif"
  },
  {
    "id": 8,
    "name": "Limpador de Para-brisa com Halter (no chão)",
    "category": "Abdômen",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Dumbbell-Floor-Wipers.gif"
  },
  {
    "id": 9,
    "name": "Meio Arnold Press",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Half-Arnold-Press.gif"
  },
  {
    "id": 10,
    "name": "Crossover Baixo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Low-Cable-Crossover.gif"
  },
  {
    "id": 11,
    "name": "Abdução de Quadril na Máquina",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Lever-Side-Hip-Abduction.gif"
  },
  {
    "id": 12,
    "name": "Elevação Frontal com Halter Sentado",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/seated-dumbbell-front-raise.gif"
  },
  {
    "id": 13,
    "name": "Extensão de Pescoço Sentado com Arnês no Cabo",
    "category": "Outros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Seated-Neck-Extension-with-head-harness.gif"
  },
  {
    "id": 14,
    "name": "Supino com Halter Pegada Fechada",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Close-Grip-Dumbbell-Press.gif"
  },
  {
    "id": 15,
    "name": "Tríceps Pulley Pegada Inversa",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Reverse-Grip-Pushdown.gif"
  },
  {
    "id": 16,
    "name": "Extensão Lombar com Peso",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Weighted-Back-Extension.gif"
  },
  {
    "id": 17,
    "name": "Lateral Deitado Posterior de Ombro com Halter Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Side-Lying-Rear-Delt-Dumbbell-Raise.gif"
  },
  {
    "id": 18,
    "name": "Push Supino 1",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/push-press-1.gif"
  },
  {
    "id": 19,
    "name": "Rosca Martelo Unilateral no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2025/07/cable-single-arm-hammer-curl.gif"
  },
  {
    "id": 20,
    "name": "Elevação Lateral no Cabo (Bilateral)",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Two-Arm-Cable-Lateral-Raise.gif"
  },
  {
    "id": 21,
    "name": "Inversa Pegada Ez Bar Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Reverse-Grip-EZ-Bar-Curl.gif"
  },
  {
    "id": 22,
    "name": "Remada Sentada na Máquina",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Row-Machine.gif"
  },
  {
    "id": 23,
    "name": "Lateral Bend no Cabo",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Side-Bend.gif"
  },
  {
    "id": 24,
    "name": "Lever de Pescoço Extensão Plate Loaded",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lever-Neck-Extension-plate-loaded.gif"
  },
  {
    "id": 25,
    "name": "Abdominal Crunch em Pé no Cabo",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Standing-Cable-Crunch.gif"
  },
  {
    "id": 26,
    "name": "Pegada Fechada com Halter Push Up",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/08/Close-grip-Dumbbell-Push-Up.gif"
  },
  {
    "id": 27,
    "name": "Straight Leg Levantamento Terra com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Straight-Leg-Deadlift.gif"
  },
  {
    "id": 28,
    "name": "Unilateral no Cabo Bicep Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/One-Arm-Cable-Bicep-Curl.gif"
  },
  {
    "id": 29,
    "name": "Pull Through com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Dumbbell-Pull-Through.gif"
  },
  {
    "id": 30,
    "name": "High Unilateral no Cabo Bicep Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/High-Cable-Single-Arm-Bicep-Curl.gif"
  },
  {
    "id": 31,
    "name": "Donkey Kick On Leg Extensão Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Donkey-Kick-on-Leg-Extension-Machine.gif"
  },
  {
    "id": 32,
    "name": "em Pé Military Desenvolvimento com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/07/Barbell-Standing-Military-Press.gif"
  },
  {
    "id": 33,
    "name": "Unilateral no Cabo Overhead Triceps Extensão",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Cable-One-Arm-Overhead-Triceps-Extension.gif"
  },
  {
    "id": 34,
    "name": "Hip Adduction Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/HIP-ADDUCTION-MACHINE.gif"
  },
  {
    "id": 35,
    "name": "Lever Kneeling Leg Rosca",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Kneeling-Leg-Curl-.gif"
  },
  {
    "id": 36,
    "name": "Lateral Bend com Barra",
    "category": "Abdômen",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Side-Bend.gif"
  },
  {
    "id": 37,
    "name": "Glute Bridge On Bench",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Glute-Bridge-on-Bench.gif"
  },
  {
    "id": 38,
    "name": "Vibrate Plate em Pé",
    "category": "Cardio",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Vibrate-Plate-Standing.gif"
  },
  {
    "id": 39,
    "name": "Two Rosca On Inclinado Bench no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Two-Arm-Curl-on-Incline-Bench.gif"
  },
  {
    "id": 40,
    "name": "Inversa Pegada 30 Degrees Inclinado Bench Supino com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Dumbbell-Reverse-Grip-30-Degrees-Incline-Bench-Press.gif"
  },
  {
    "id": 41,
    "name": "Goblet Agachamento com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/kettlebell-goblet-squat.gif"
  },
  {
    "id": 42,
    "name": "Overhead Shrug",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/overhead-shrug.gif"
  },
  {
    "id": 43,
    "name": "em Pé Single Leg Rosca Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Standing-Single-Leg-Curl-Machine.gif"
  },
  {
    "id": 44,
    "name": "Inversa Pegada Ez Bar Biceps Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Reverse-Grip-EZ-bar-Biceps-Curl.gif"
  },
  {
    "id": 45,
    "name": "Deep Push Up com Kettlebell",
    "category": "Peito",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Kettlebell-Deep-Push-Up.gif"
  },
  {
    "id": 46,
    "name": "Drag Rosca com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Barbell-Drag-Curl.gif"
  },
  {
    "id": 47,
    "name": "Pegada Fechada Chin Up",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Close-Grip-Chin-Up.gif"
  },
  {
    "id": 48,
    "name": "Bulgarian Split Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Barbell-Bulgarian-Split-Squat.gif"
  },
  {
    "id": 49,
    "name": "Crossover Triceps Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Crossover-Triceps-Extension.gif"
  },
  {
    "id": 50,
    "name": "Two com Halter Preacher Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Two-dumbbell-preacher-curl.gif"
  },
  {
    "id": 51,
    "name": "em Pé Alternating com Halter Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Alternating-Dumbbell-Shoulder-Press.gif"
  },
  {
    "id": 52,
    "name": "Inversa Pegada com Halter Bench Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Reverse-Grip-Dumbbell-Bench-Press.gif"
  },
  {
    "id": 53,
    "name": "Deitado Pegada Fechada Triceps Extensão com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Lying-Close-grip-Triceps-Extension.gif"
  },
  {
    "id": 54,
    "name": "Pegada Fechada Z Bar Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Close-Grip-Z-Bar-Curl.gif"
  },
  {
    "id": 55,
    "name": "em Pé com Barra Pegada Fechada Military Desenvolvimento",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Standing-Barbell-Close-Grip-Military-Press.gif"
  },
  {
    "id": 56,
    "name": "Weighted Sentado Calf Elevação",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Weighted-Seated-Calf-Raise.gif"
  },
  {
    "id": 57,
    "name": "Glute Bridge com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/12/Barbell-Glute-Bridge.gif"
  },
  {
    "id": 58,
    "name": "Alternate Preacher Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Dumbbell-Alternate-Preacher-Curl.gif"
  },
  {
    "id": 59,
    "name": "Romanian Levantamento Terra com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif"
  },
  {
    "id": 60,
    "name": "Unilateral Pronated com Halter Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/One-Arm-Pronated-Dumbbell-Triceps-Extension-.gif"
  },
  {
    "id": 61,
    "name": "Bent Over com Halter Remada",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Dumbbell-Row.gif"
  },
  {
    "id": 62,
    "name": "Plate Loaded Sentado Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Plate-Loaded-Seated-Row.gif"
  },
  {
    "id": 63,
    "name": "Pullover com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Pullover.gif"
  },
  {
    "id": 64,
    "name": "Sentado com Halter Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Dumbbell-Triceps-Extension.gif"
  },
  {
    "id": 65,
    "name": "Band Deitado Hip External Rotation",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Band-Lying-Hip-External-Rotation.gif"
  },
  {
    "id": 66,
    "name": "Glute Bridge com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Dumbbell-Glute-Bridge.gif"
  },
  {
    "id": 67,
    "name": "Lever Horizontal Leg Press",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-Horizontal-Leg-Press.gif"
  },
  {
    "id": 68,
    "name": "Alternating Deitado com Halter Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Alternating-Lying-Dumbbell-Triceps-Extension.gif"
  },
  {
    "id": 69,
    "name": "Hang Clean com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Barbell-Hang-Clean.gif"
  },
  {
    "id": 70,
    "name": "Rope Straight Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Straight-Arm-Pulldown.gif"
  },
  {
    "id": 71,
    "name": "Bench Frontal Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Barbell-Bench-Front-Squat.gif"
  },
  {
    "id": 72,
    "name": "Unilateral com Barra Remada",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/One-Arm-Barbell-Row-.gif"
  },
  {
    "id": 73,
    "name": "Dumbell Pistol Agachamento",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbell-Pistol-Squat.gif"
  },
  {
    "id": 74,
    "name": "Heel Elevated Goblet Agachamento",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2025/07/Heel-Elevated-Goblet-Squat.gif"
  },
  {
    "id": 75,
    "name": "Pegada Fechada no Cabo Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/close-grip-cable-row.gif"
  },
  {
    "id": 76,
    "name": "Ski Ergometer",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Ski-Ergometer.gif"
  },
  {
    "id": 77,
    "name": "Lever Chest Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Chest-Press.gif"
  },
  {
    "id": 78,
    "name": "V Bar Pulley",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/V-bar-Pushdown.gif"
  },
  {
    "id": 79,
    "name": "Windmill com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Windmill.gif"
  },
  {
    "id": 80,
    "name": "Twisting Hyperextension",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Twisting-Hyperextension.gif"
  },
  {
    "id": 81,
    "name": "Lever Tricep Extensão",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Tricep-Extension.gif"
  },
  {
    "id": 82,
    "name": "Smith Machine Avanço",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Smith-Machine-Lunge.gif"
  },
  {
    "id": 83,
    "name": "Smith Machine Hex Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Smith-Machine-Hex-Press.gif"
  },
  {
    "id": 84,
    "name": "Good Morning com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/10/Dumbbell-Good-Morning.gif"
  },
  {
    "id": 85,
    "name": "Weight Plate Frontal Elevação 1",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Weight-Plate-Front-Raise-1.gif"
  },
  {
    "id": 86,
    "name": "Shotgun Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/shotgun-row.gif"
  },
  {
    "id": 87,
    "name": "Unilateral no Cabo Crossover",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Single-Arm-Cable-Crossover.gif"
  },
  {
    "id": 88,
    "name": "Declinado com Halter Crucifixo",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Decline-Dumbbell-Fly.gif"
  },
  {
    "id": 89,
    "name": "Unilateral Landmine Remada",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/One-Arm-Landmine-Row.gif"
  },
  {
    "id": 90,
    "name": "Skull Crusher com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Skull-Crusher.gif"
  },
  {
    "id": 91,
    "name": "Declinado Pegada Fechada Bench To Skull Crusher",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Decline-Close-Grip-Bench-To-Skull-Crusher.gif"
  },
  {
    "id": 92,
    "name": "Inversa Wrist Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Wrist-Curl.gif"
  },
  {
    "id": 93,
    "name": "Muscle Snatch com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Muscle-Snatch.gif"
  },
  {
    "id": 94,
    "name": "Unilateral Twisting Sentado no Cabo Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Single-Arm-Twisting-Seated-Cable-Row.gif"
  },
  {
    "id": 95,
    "name": "Inclinado Pegada Fechada Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Incline-Close-Grip-Bench-Press.gif"
  },
  {
    "id": 96,
    "name": "Bent Pullover com Barra",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Barbell-Bent-Arm-Pullover.gif"
  },
  {
    "id": 97,
    "name": "Deitado no Cabo Crucifixo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lying-Cable-Fly.gif"
  },
  {
    "id": 98,
    "name": "Inversa Pegada com Barra Remada",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Reverse-Grip-Barbell-Row.gif"
  },
  {
    "id": 99,
    "name": "Push Supino com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/10/Dumbbell-Push-Press.gif"
  },
  {
    "id": 100,
    "name": "em Pé com Halter Overhead Supino",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"
  },
  {
    "id": 101,
    "name": "Lever Pullover Plate Loaded",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lever-Pullover-plate-loaded.gif"
  },
  {
    "id": 102,
    "name": "Bent Over Twist",
    "category": "Abdômen",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Bent-Over-Twist.gif"
  },
  {
    "id": 103,
    "name": "Upright Remada no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Upright-Row.gif"
  },
  {
    "id": 104,
    "name": "Puxada Bicep Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Pulldown-Bicep-Curl.gif"
  },
  {
    "id": 105,
    "name": "The Box Jump",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2015/07/The-Box-Jump.gif"
  },
  {
    "id": 106,
    "name": "Kneeling High Pulley Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kneeling-High-Pulley-Row.gif"
  },
  {
    "id": 107,
    "name": "Sentado Inclinado com Halter Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Incline-Dumbbell-Curl.gif"
  },
  {
    "id": 108,
    "name": "Triceps Extensão com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif"
  },
  {
    "id": 109,
    "name": "Calf Elevação com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Calf-Raise.gif"
  },
  {
    "id": 110,
    "name": "Pullover On Stability Ball com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Dumbbell-Pullover-On-Stability-Ball.gif"
  },
  {
    "id": 111,
    "name": "Sentado Pegada Fechada Concentration Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-close-grip-concentration-curl.gif"
  },
  {
    "id": 112,
    "name": "Smith Machine Good Morning",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Good-Morning.gif"
  },
  {
    "id": 113,
    "name": "Inclinado Leg Hip Elevação",
    "category": "Abdômen",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Incline-Leg-Hip-Raise.gif"
  },
  {
    "id": 114,
    "name": "Lateral Step Up com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Lateral-Step-Up.gif"
  },
  {
    "id": 115,
    "name": "Rosca On Blaster com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Dumbbell-Curl-On-Arm-Blaster.gif"
  },
  {
    "id": 116,
    "name": "Sumo Levantamento Terra com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Barbell-Sumo-Deadlift.gif"
  },
  {
    "id": 117,
    "name": "Stationary Bike Run",
    "category": "Cardio",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Stationary-Bike-Run.gif"
  },
  {
    "id": 118,
    "name": "Band Pull Apart",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Band-pull-apart.gif"
  },
  {
    "id": 119,
    "name": "Clean And Supino com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Barbell-Clean-and-Press-.gif"
  },
  {
    "id": 120,
    "name": "Lever Shrug",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shrug.gif"
  },
  {
    "id": 121,
    "name": "Deitado High Bench com Barra Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Lying-High-Bench-Barbell-Curl.gif"
  },
  {
    "id": 122,
    "name": "Deitado Weighted de Pescoço Extensão",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lying-Weighted-Neck-Extension.gif"
  },
  {
    "id": 123,
    "name": "Lateral Plank Oblique Abdominal",
    "category": "Abdômen",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/Side-Plank-Oblique-Crunch.gif"
  },
  {
    "id": 124,
    "name": "Scaption com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Scaption.gif"
  },
  {
    "id": 125,
    "name": "Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
  },
  {
    "id": 126,
    "name": "Unilateral Deitado Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/One-Arm-Lying-Triceps-Extension.gif"
  },
  {
    "id": 127,
    "name": "Rosca On Blaster com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Barbell-Curl-On-Arm-Blaster.gif"
  },
  {
    "id": 128,
    "name": "Shrug com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shrug.gif"
  },
  {
    "id": 129,
    "name": "Straight Puxada no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Straight-Arm-Pulldown.gif"
  },
  {
    "id": 130,
    "name": "Frontal Agachamento com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Kettlebell-front-squat.gif"
  },
  {
    "id": 131,
    "name": "Asisted Triceps Dips",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/Asisted-Triceps-Dips.gif"
  },
  {
    "id": 132,
    "name": "Sentado Calf Elevação com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Seated-Calf-Raise.gif"
  },
  {
    "id": 133,
    "name": "Belt Agachamento",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/01/belt-squat.gif"
  },
  {
    "id": 134,
    "name": "Wide Pegada Inversa Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Wide-Grip-Reverse-Bench-Press.gif"
  },
  {
    "id": 135,
    "name": "Internal Shoulder Rotation no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Internal-Shoulder-Rotation.gif"
  },
  {
    "id": 136,
    "name": "Alternate com Halter Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Alternate-Dumbbell-Lateral-Raise.gif"
  },
  {
    "id": 137,
    "name": "Inclinado com Barra Remada",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Barbell-Row.gif"
  },
  {
    "id": 138,
    "name": "Sled Hack Agachamento",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif"
  },
  {
    "id": 139,
    "name": "45 Degree Inclinado Remada",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/45-Degree-Incline-Row.gif"
  },
  {
    "id": 140,
    "name": "Bent Over com Barra Inversa Elevação",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Bent-Over-Barbell-Reverse-Raise.gif"
  },
  {
    "id": 141,
    "name": "Deitado Unilateral Posterior Lateral Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Lying-One-Arm-Rear-Lateral-Raise.gif"
  },
  {
    "id": 142,
    "name": "Lever Single Leg Rosca",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Single-Leg-Curl.gif"
  },
  {
    "id": 143,
    "name": "Deitado no Cabo Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/lying-cable-curl.gif"
  },
  {
    "id": 144,
    "name": "Scott Martelo Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Dumbbell-Scott-Hammer-Curl.gif"
  },
  {
    "id": 145,
    "name": "Levantamento Terra com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif"
  },
  {
    "id": 146,
    "name": "Smith Machine Bench Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Bench-Press.gif"
  },
  {
    "id": 147,
    "name": "Sumo Agachamento com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/dumbbell-sumo-squat.gif"
  },
  {
    "id": 148,
    "name": "Deitado Back Of The de Cabeça Tricep Extensão com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Lying-Back-of-the-Head-Tricep-Extension.gif"
  },
  {
    "id": 149,
    "name": "Zercher Levantamento Terra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/zercher-deadlift.gif"
  },
  {
    "id": 150,
    "name": "Shoulder Desenvolvimento no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Shoulder-Press.gif"
  },
  {
    "id": 151,
    "name": "Half Kneeling Unilateral com Kettlebell Supino",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Half-Kneeling-One-Arm-Kettlebell-Press.gif"
  },
  {
    "id": 152,
    "name": "Pegada Fechada com Barra Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/close-grip-barbell-curl.gif"
  },
  {
    "id": 153,
    "name": "Half Kneeling Pallof Supino no Cabo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Half-Kneeling-Pallof-Press.gif"
  },
  {
    "id": 154,
    "name": "Hack Agachamento Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Hack-Squat-Calf-Raise.gif"
  },
  {
    "id": 155,
    "name": "Unilateral com Kettlebell Snatch Exercise",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/03/One-Arm-Kettlebell-Snatch-exercise.gif"
  },
  {
    "id": 156,
    "name": "em Pé Palms In Supino com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Standing-Palms-In-Press.gif"
  },
  {
    "id": 157,
    "name": "Sissy Agachamento",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/sissy-squat.gif"
  },
  {
    "id": 158,
    "name": "Turkish Get Up Agachamento Style",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Turkish-Get-Up-Squat-style.gif"
  },
  {
    "id": 159,
    "name": "Overhead Agachamento",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/overhead-squat.gif"
  },
  {
    "id": 160,
    "name": "Double no Cabo Frontal Elevação",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Double-Cable-Front-Raise.gif"
  },
  {
    "id": 161,
    "name": "Inversa Rosca com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Reverse-Curl.gif"
  },
  {
    "id": 162,
    "name": "Lever Sentado Twist",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Lever-Seated-Twist.gif"
  },
  {
    "id": 163,
    "name": "Lever Sentado Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif"
  },
  {
    "id": 164,
    "name": "Bulgarian Split Agachamento com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Dumbbell-Bulgarian-Split-Squat.gif"
  },
  {
    "id": 165,
    "name": "Declinado com Halter Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Decline-Dumbbell-Triceps-Extension.gif"
  },
  {
    "id": 166,
    "name": "Bench Glute Flutter Kicks",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/12/Bench-Glute-Flutter-Kicks.gif"
  },
  {
    "id": 167,
    "name": "Pulley",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"
  },
  {
    "id": 168,
    "name": "Agachamento no Cabo",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Squat.gif"
  },
  {
    "id": 169,
    "name": "Deitado Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lying-Shoulder-Press.gif"
  },
  {
    "id": 170,
    "name": "Frontal Elevação no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Front-Raise.gif"
  },
  {
    "id": 171,
    "name": "External Shoulder Rotation no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-External-Shoulder-Rotation.gif"
  },
  {
    "id": 172,
    "name": "Swings com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Swings.gif"
  },
  {
    "id": 173,
    "name": "Overhead no Cabo Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/overhead-cable-curl.gif"
  },
  {
    "id": 174,
    "name": "Declinado com Halter Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif"
  },
  {
    "id": 175,
    "name": "Inclinado Biceps Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Cable-Incline-Biceps-Curl.gif"
  },
  {
    "id": 176,
    "name": "Behind The Back com Barra Wrist Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Behind-The-Back-Barbell-Wrist-Curl.gif"
  },
  {
    "id": 177,
    "name": "Sentado Bench Leg Pull In",
    "category": "Abdômen",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Bench-Leg-Pull-in.gif"
  },
  {
    "id": 178,
    "name": "Inversa Crucifixo com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Fly.gif"
  },
  {
    "id": 179,
    "name": "Finger Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbbell-Finger-Curl.gif"
  },
  {
    "id": 180,
    "name": "Sentado no Cabo Chest Supino",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Seated-Cable-Chest-Press.gif"
  },
  {
    "id": 181,
    "name": "Smith Machine Shrug",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/smith-machine-shrug.gif"
  },
  {
    "id": 182,
    "name": "Posterior de Ombro Remada com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Dumbbell-Rear-Delt-Row.gif"
  },
  {
    "id": 183,
    "name": "Alternate com Halter Bench Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Alternate-Dumbbell-Bench-Press.gif"
  },
  {
    "id": 184,
    "name": "Bent Over Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Lateral-Raise.gif"
  },
  {
    "id": 185,
    "name": "Upright Remada com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Upright-Row.gif"
  },
  {
    "id": 186,
    "name": "Step Up Opposite Elbow To Knee Twist",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Step-Up-Opposite-Elbow-to-Knee-Twist.gif"
  },
  {
    "id": 187,
    "name": "Pegada Fechada Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Close-Grip-Lat-Pulldown.gif"
  },
  {
    "id": 188,
    "name": "Nordic Hamstring Rosca",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Nordic-Hamstring-Curl.gif"
  },
  {
    "id": 189,
    "name": "Y Elevação no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/cable-y-raise.gif"
  },
  {
    "id": 190,
    "name": "Half Kneeling Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Half-Kneeling-Lat-Pulldown.gif"
  },
  {
    "id": 191,
    "name": "Step Up com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Barbell-Step-Up.gif"
  },
  {
    "id": 192,
    "name": "Shoulder Desenvolvimento com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif"
  },
  {
    "id": 193,
    "name": "Avanço com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Barbell-Lunge.gif"
  },
  {
    "id": 194,
    "name": "Pegada Fechada Inclinado com Halter Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Close-grip-Incline-Dumbbell-Press.gif"
  },
  {
    "id": 195,
    "name": "Double no Cabo Neutral Pegada Lat Puxada On Floor",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Double-Cable-Neutral-Grip-Lat-Pulldown-On-Floor.gif"
  },
  {
    "id": 196,
    "name": "Bench Dips",
    "category": "Braços",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif"
  },
  {
    "id": 197,
    "name": "Curtsey Avanço com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Barbell-Curtsey-Lunge.gif"
  },
  {
    "id": 198,
    "name": "Hip Extensão On Bench",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Hip-Extension-On-Bench.gif"
  },
  {
    "id": 199,
    "name": "Inversa Pegada Pull Up",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Reverse-grip-Pull-up.gif"
  },
  {
    "id": 200,
    "name": "Landmine Floor Chest Crucifixo",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Landmine-Floor-Chest-Fly.gif"
  },
  {
    "id": 201,
    "name": "Kneeling Unilateral High Pulley Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kneeling-Single-Arm-High-Pulley-Row.gif"
  },
  {
    "id": 202,
    "name": "Lever em Pé Hip Extensão",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/Lever-Standing-Hip-Extension.gif"
  },
  {
    "id": 203,
    "name": "Martelo Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Press.gif"
  },
  {
    "id": 204,
    "name": "Hip Abduction no Cabo",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Hip-Abduction.gif"
  },
  {
    "id": 205,
    "name": "Landmine Avanço",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Landmine-Lunge.gif"
  },
  {
    "id": 206,
    "name": "Rope Overhead Triceps Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif"
  },
  {
    "id": 207,
    "name": "Levantamento Terra com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/kettlebell-deadlift.gif"
  },
  {
    "id": 208,
    "name": "Unilateral Inversa Push Down",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/One-Arm-Reverse-Push-Down.gif"
  },
  {
    "id": 209,
    "name": "Lever Crossovers",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Crossovers.gif"
  },
  {
    "id": 210,
    "name": "Concentration Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Concentration-Curl.gif"
  },
  {
    "id": 211,
    "name": "Puxada Aberta no Pulley",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"
  },
  {
    "id": 212,
    "name": "Behind The Back com Barra Shrug Inversa com Barra Shrug",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/03/Behind-The-Back-Barbell-Shrug-Reverse-Barbell-Shrug.gif"
  },
  {
    "id": 213,
    "name": "Inclinado Inversa Pegada com Halter Remada",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Reverse-Grip-Dumbbell-Row.gif"
  },
  {
    "id": 214,
    "name": "Kneeling no Cabo Abdominal",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Kneeling-Cable-Crunch.gif"
  },
  {
    "id": 215,
    "name": "Triceps Extensão Machine",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Triceps-Extension-Machine.gif"
  },
  {
    "id": 216,
    "name": "Inclinado T Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Incline-T-Raise.gif"
  },
  {
    "id": 217,
    "name": "Twisting em Pé High Remada no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Twisting-Standing-high-Row.gif"
  },
  {
    "id": 218,
    "name": "Assisted Chest Dip",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Assisted-Chest-Dip.gif"
  },
  {
    "id": 219,
    "name": "Martelo Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif"
  },
  {
    "id": 220,
    "name": "Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif"
  },
  {
    "id": 221,
    "name": "Inclinado com Halter Y Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Incline-Dumbbell-Y-Raise.gif"
  },
  {
    "id": 222,
    "name": "Lever T Bar Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-T-bar-Row.gif"
  },
  {
    "id": 223,
    "name": "Sentado Abdominal Machine",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Seated-Crunch-Machine.gif"
  },
  {
    "id": 224,
    "name": "Chest Supported com Halter Frontal Raises",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Chest-Supported-Dumbbell-Front-Raises.gif"
  },
  {
    "id": 225,
    "name": "Lever Lateral Elevação",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Lateral-Raise.gif"
  },
  {
    "id": 226,
    "name": "Scot Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/dumbbell-scot-curl.gif"
  },
  {
    "id": 227,
    "name": "Lever Inversa Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Reverse-Shoulder-Press.gif"
  },
  {
    "id": 228,
    "name": "Unilateral com Halter Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-One-Arm-Shoulder-Press.gif"
  },
  {
    "id": 229,
    "name": "Two com Halter Frontal Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Two-Arm-Dumbbell-Front-Raise.gif"
  },
  {
    "id": 230,
    "name": "Sentado Behind The de Pescoço Supino",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Seated-Behind-the-Neck-Press.gif"
  },
  {
    "id": 231,
    "name": "Snatch com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Snatch.gif"
  },
  {
    "id": 232,
    "name": "Weighted Pull Up",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Weighted-Pull-up.gif"
  },
  {
    "id": 233,
    "name": "Bicep Rosca Machine",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Bicep-Curl-Machine.gif"
  },
  {
    "id": 234,
    "name": "em Pé com Barra Calf Elevação",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Standing-Barbell-Calf-Raise.gif"
  },
  {
    "id": 235,
    "name": "Sentado Ez Bar Overhead Triceps Extensão",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-EZ-Bar-Overhead-Triceps-Extension.gif"
  },
  {
    "id": 236,
    "name": "Deitado Chest Supino Machine",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lying-Chest-Press-Machine.gif"
  },
  {
    "id": 237,
    "name": "Inclinado com Halter Lateral Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Dumbbell-Side-Lateral-Raise.gif"
  },
  {
    "id": 238,
    "name": "Wide Pegada Alternate com Barra Bent Over Remada Plus",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/02/Wide-Grip-Alternate-Barbell-Bent-Over-Row-Plus.gif"
  },
  {
    "id": 239,
    "name": "Unilateral com Halter Inversa Pegada Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Dumbbell-One-Arm-Reverse-Grip-Press.gif"
  },
  {
    "id": 240,
    "name": "Clean And Jerk com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Kettlebell-Clean-and-Jerk.gif"
  },
  {
    "id": 241,
    "name": "Assisted Pull Up",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Assisted-Pull-up.gif"
  },
  {
    "id": 242,
    "name": "Inversa Pegada Fechada Bench Supino com Barra",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Reverse-Close-grip-Bench-Press.gif"
  },
  {
    "id": 243,
    "name": "Inclinado Dumbbel Martelo Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Dumbbel-Hammer-Press.gif"
  },
  {
    "id": 244,
    "name": "Frontal Elevação com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Front-Raise.gif"
  },
  {
    "id": 245,
    "name": "Deitado Triceps Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Lying-Triceps-Extension.gif"
  },
  {
    "id": 246,
    "name": "Agachamento On The Abductor Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Squat-on-The-Abductor-Machine.gif"
  },
  {
    "id": 247,
    "name": "Crossover Lat Puxada no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Cable-Crossover-Lat-Pulldown.gif"
  },
  {
    "id": 248,
    "name": "Devil Supino com Halter",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Dumbbell-Devil-Press.gif"
  },
  {
    "id": 249,
    "name": "Inclinado com Halter Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
  },
  {
    "id": 250,
    "name": "Declinado Sit Up",
    "category": "Abdômen",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Decline-Sit-up.gif"
  },
  {
    "id": 251,
    "name": "Unilateral com Halter Snatch",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/One-Arm-Dumbbell-Snatch.gif"
  },
  {
    "id": 252,
    "name": "Unilateral com Kettlebell Swing",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/One-Arm-Kettlebell-Swing.gif"
  },
  {
    "id": 253,
    "name": "Smith Machine Behind de Pescoço Supino",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Behind-Neck-Press.gif"
  },
  {
    "id": 254,
    "name": "Lever Lateral Hip Adduction",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Lever-Side-Hip-Adduction.gif"
  },
  {
    "id": 255,
    "name": "Tate Supino com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Dumbbell-Tate-Press.gif"
  },
  {
    "id": 256,
    "name": "Figure 8 com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Kettlebell-Figure-8.gif"
  },
  {
    "id": 257,
    "name": "Lever em Pé Posterior Kick",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Standing-Rear-Kick.gif"
  },
  {
    "id": 258,
    "name": "Stiff Leg Levantamento Terra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Stiff-Leg-Deadlift.gif"
  },
  {
    "id": 259,
    "name": "Upward Crucifixo com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Dumbbell-Upward-Fly.gif"
  },
  {
    "id": 260,
    "name": "Band em Pé Chest Supino",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Band-Standing-Chest-Press.gif"
  },
  {
    "id": 261,
    "name": "Glute Bridge One Leg On Bench",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Glute-Bridge-One-Leg-on-Bench.gif"
  },
  {
    "id": 262,
    "name": "Declinado Bent Pullover com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Barbell-Decline-Bent-Arm-Pullover.gif"
  },
  {
    "id": 263,
    "name": "Leg Elevação Dragon Flag",
    "category": "Abdômen",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Leg-Raise-Dragon-Flag.gif"
  },
  {
    "id": 264,
    "name": "Bench Lateral Bend",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Bench-Side-Bend.gif"
  },
  {
    "id": 265,
    "name": "Power Clean com Halter",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Dumbbell-Power-Clean.gif"
  },
  {
    "id": 266,
    "name": "Bent Over Remada no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Bent-Over-Row.gif"
  },
  {
    "id": 267,
    "name": "Lever Unilateral Chest Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-One-Arm-Chest-Press.gif"
  },
  {
    "id": 268,
    "name": "Forward Leaning Avanço com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/dumbbell-forward-leaning-lunge.gif"
  },
  {
    "id": 269,
    "name": "90 Degree no Cabo External Rotation",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/90-Degree-Cable-External-Rotation-.gif"
  },
  {
    "id": 270,
    "name": "Declinado com Barra Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/03/Decline-Barbell-Bench-Press.gif"
  },
  {
    "id": 271,
    "name": "Bent Over com Halter Posterior de Ombro Elevação de Cabeça On Bench",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Dumbbell-Rear-Delt-Raise-With-Head-On-Bench.gif"
  },
  {
    "id": 272,
    "name": "Triceps Dips",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif"
  },
  {
    "id": 273,
    "name": "Jump Agachamento com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Dumbbell-Jump-Squat.gif"
  },
  {
    "id": 274,
    "name": "Lunges com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-lunges.gif"
  },
  {
    "id": 275,
    "name": "Lever Biceps Rosca",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Biceps-Curl.gif"
  },
  {
    "id": 276,
    "name": "Sentado no Cabo Pegada Fechada Chest Supino",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Seated-Cable-Close-Grip-Chest-Press.gif"
  },
  {
    "id": 277,
    "name": "Alternating com Halter Frontal Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Alternating-Dumbbell-Front-Raise.gif"
  },
  {
    "id": 278,
    "name": "Lever no Cabo Posterior Puxada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-Cable-Rear-Pulldown.gif"
  },
  {
    "id": 279,
    "name": "Lever Donkey Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Donkey-Calf-Raise.gif"
  },
  {
    "id": 280,
    "name": "Sentado Gittleson Shrug com Halter",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Dumbbell-Seated-Gittleson-Shrug.gif"
  },
  {
    "id": 281,
    "name": "Concentration Extensão On Knee no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Concentration-Extension-on-knee.gif"
  },
  {
    "id": 282,
    "name": "Unilateral Prone com Halter Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/One-Arm-Prone-Dumbbell-Curl.gif"
  },
  {
    "id": 283,
    "name": "Inclinado Frontal Elevação",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Incline-Front-Raise.gif"
  },
  {
    "id": 284,
    "name": "Waiter Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/waiter-curl.gif"
  },
  {
    "id": 285,
    "name": "Trap Bar Jump Agachamento",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/02/trap-bar-jump-squat.gif"
  },
  {
    "id": 286,
    "name": "Inclinado com Barra Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif"
  },
  {
    "id": 287,
    "name": "Smith Machine Declinado Bench Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Decline-Bench-Press.gif"
  },
  {
    "id": 288,
    "name": "Triceps Dips On Floor",
    "category": "Braços",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Triceps-Dips-on-Floor.gif"
  },
  {
    "id": 289,
    "name": "Declinado Chest Supino Machine",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Decline-Chest-Press-Machine.gif"
  },
  {
    "id": 290,
    "name": "Inclinado no Cabo Crucifixo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Cable-Fly.gif"
  },
  {
    "id": 291,
    "name": "Plate Loaded Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Plate-Loaded-Shoulder-Press.gif"
  },
  {
    "id": 292,
    "name": "Unilateral no Cabo Chest Supino",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/12/One-Arm-Cable-Chest-Press.gif"
  },
  {
    "id": 293,
    "name": "Kneeling Biceps Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Cable-Kneeling-Biceps-Curl.gif"
  },
  {
    "id": 294,
    "name": "Deadlifts com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif"
  },
  {
    "id": 295,
    "name": "Bent Over Remada com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif"
  },
  {
    "id": 296,
    "name": "Smith Machine Leg Press",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Smith-Machine-Leg-Press.gif"
  },
  {
    "id": 297,
    "name": "Unilateral Bent Over no Cabo Lateral Elevação",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/One-Arm-Bent-Over-Cable-Lateral-Raise.gif"
  },
  {
    "id": 298,
    "name": "Inversa Pegada Inclinado com Halter Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Reverse-Grip-Incline-Dumbbell-Press.gif"
  },
  {
    "id": 299,
    "name": "Lever Inclinado Martelo Chest Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Incline-Hammer-Chest-Press.gif"
  },
  {
    "id": 300,
    "name": "Split Snatch com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Split-Snatch.gif"
  },
  {
    "id": 301,
    "name": "Lever Deitado Abdominal",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Lying-Crunch.gif"
  },
  {
    "id": 302,
    "name": "Lateral Triceps Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Side-Triceps-Extension.gif"
  },
  {
    "id": 303,
    "name": "Banded com Kettlebell Goblet Agachamento",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Banded-Kettlebell-Goblet-Squat.gif"
  },
  {
    "id": 304,
    "name": "Hack Machine One Leg Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Hack-Machine-One-Leg-Calf-Raise.gif"
  },
  {
    "id": 305,
    "name": "Deitado Weighted de Pescoço Flexão",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lying-Weighted-Neck-Flexion.gif"
  },
  {
    "id": 306,
    "name": "10301301 Lever Pec Deck Fly_Chest_720",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/10301301-Lever-Pec-Deck-Fly_Chest_720.gif"
  },
  {
    "id": 307,
    "name": "Single Leg Levantamento Terra com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Kettlebell-Single-Leg-Deadlift.gif"
  },
  {
    "id": 308,
    "name": "Declinado Bench com Halter Avanço",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Decline-Bench-Dumbbell-Lunge.gif"
  },
  {
    "id": 309,
    "name": "Full Range Of Motion Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Full-Range-Of-Motion-Lat-Pulldown.gif"
  },
  {
    "id": 310,
    "name": "Split Jump com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Dumbbell-Split-Jump.gif"
  },
  {
    "id": 311,
    "name": "Pec Deck Crucifixo",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif"
  },
  {
    "id": 312,
    "name": "Floor Supino com Barra",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Barbell-Floor-Press.gif"
  },
  {
    "id": 313,
    "name": "Unilateral no Cabo Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/One-arm-Cable-Row.gif"
  },
  {
    "id": 314,
    "name": "Posterior de Ombro Crucifixo no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/cable-rear-delt-fly.gif"
  },
  {
    "id": 315,
    "name": "Smith Machine Hip Thrust",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Smith-Machine-Hip-Thrust.gif"
  },
  {
    "id": 316,
    "name": "Unilateral com Halter Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Dumbbell-Single-Arm-Lateral-Raise.gif"
  },
  {
    "id": 317,
    "name": "Leaning Unilateral com Halter Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Leaning-Single-Arm-Dumbbell-Lateral-Raise.gif"
  },
  {
    "id": 318,
    "name": "em Pé Twist Machine",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Standing-Twist-Machine.gif"
  },
  {
    "id": 319,
    "name": "Lever Inclinado Chest Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Incline-Chest-Press.gif"
  },
  {
    "id": 320,
    "name": "Smith Machine Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Smith-Machine-Shoulder-Press.gif"
  },
  {
    "id": 321,
    "name": "Declinado com Halter Leg Rosca",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Decline-Dumbbell-Leg-Curl.gif"
  },
  {
    "id": 322,
    "name": "Sentado Cross Twist no Cabo",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Cable-Seated-Cross-Arm-Twist.gif"
  },
  {
    "id": 323,
    "name": "Cross no Cabo Face Pull",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Cross-Cable-Face-Pull.gif"
  },
  {
    "id": 324,
    "name": "Rosca no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/cable-curl.gif"
  },
  {
    "id": 325,
    "name": "Lever Declinado Chest Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Lever-Decline-Chest-Press.gif"
  },
  {
    "id": 326,
    "name": "Preacher Martelo Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Dumbbell-Preacher-Hammer-Curl.gif"
  },
  {
    "id": 327,
    "name": "T Bar Rows",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/t-bar-rows.gif"
  },
  {
    "id": 328,
    "name": "Unilateral no Cabo High Pulley Overhead Tricep Extensão",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-One-Arm-High-Pulley-Overhead-Tricep-Extension.gif"
  },
  {
    "id": 329,
    "name": "Pin Agachamento",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/05/Pin-Squat.gif"
  },
  {
    "id": 330,
    "name": "Jefferson Rosca com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2025/08/Dumbbell-jefferson-curl.gif"
  },
  {
    "id": 331,
    "name": "T Bar Rows",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/t-bar-rows.gif"
  },
  {
    "id": 332,
    "name": "Crucifixo com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif"
  },
  {
    "id": 333,
    "name": "Cadeira Flexora",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif"
  },
  {
    "id": 334,
    "name": "Hip Abduction Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/HiP-ABDUCTION-MACHINE.gif"
  },
  {
    "id": 335,
    "name": "Lever Gripless Shrug",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Gripless-Shrug.gif"
  },
  {
    "id": 336,
    "name": "Lever Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif"
  },
  {
    "id": 337,
    "name": "Lateral Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif"
  },
  {
    "id": 338,
    "name": "Inversa Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Reverse-Lat-Pulldown.gif"
  },
  {
    "id": 339,
    "name": "Kickback com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif"
  },
  {
    "id": 340,
    "name": "High Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-High-Curl.gif"
  },
  {
    "id": 341,
    "name": "Bench Supported com Halter External Rotation",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Bench-Supported-Dumbbell-External-Rotation.gif"
  },
  {
    "id": 342,
    "name": "Sentado Alternate Frontal Raises com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Dumbbell-Seated-Alternate-Front-Raises.gif"
  },
  {
    "id": 343,
    "name": "Lateral Elevação Machine",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lateral-Raise-Machine.gif"
  },
  {
    "id": 344,
    "name": "Low no Cabo Tricep Kickback",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Low-Cable-Tricep-Kickback.gif"
  },
  {
    "id": 345,
    "name": "Unilateral Inversa Pegada no Cabo Bicep Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Single-Arm-Reverse-Grip-Cable-Bicep-Curl.gif"
  },
  {
    "id": 346,
    "name": "Push Up To Renegade Remada",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Push-Up-to-Renegade-Row.gif"
  },
  {
    "id": 347,
    "name": "Plate Push",
    "category": "Outros",
    "equipment": "Placa",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2025/07/plate-push.gif"
  },
  {
    "id": 348,
    "name": "Declinado Martelo Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Decline-hammer-press.gif"
  },
  {
    "id": 349,
    "name": "em Pé com Barra Concentration Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/10/Standing-Barbell-Concentration-Curl.gif"
  },
  {
    "id": 350,
    "name": "Single com Halter Pegada Fechada Supino",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Single-Dumbbell-Close-grip-Press.gif"
  },
  {
    "id": 351,
    "name": "Smith Machine Inclinado Bench Supino",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Incline-Bench-Press.gif"
  },
  {
    "id": 352,
    "name": "Lever em Pé Leg Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Standing-Leg-Raise.gif"
  },
  {
    "id": 353,
    "name": "Posterior Avanço com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Dumbbell-Rear-Lunge.gif"
  },
  {
    "id": 354,
    "name": "Sentado Twist On Floor no Cabo",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Cable-Seated-Twist-on-Floor.gif"
  },
  {
    "id": 355,
    "name": "Romanian Levantamento Terra com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Romanian-Deadlift.gif"
  },
  {
    "id": 356,
    "name": "Z Bar Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Curl.gif"
  },
  {
    "id": 357,
    "name": "Sentado com Halter Lateral Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Dumbbell-Lateral-Raise.gif"
  },
  {
    "id": 358,
    "name": "Z Bar Preacher Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Preacher-Curl.gif"
  },
  {
    "id": 359,
    "name": "Renegade Remada com Kettlebell",
    "category": "Peito",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Kettlebell-Renegade-Row.gif"
  },
  {
    "id": 360,
    "name": "Thruster",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/thruster.gif"
  },
  {
    "id": 361,
    "name": "Hip Thrust On The Leg Extensão Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Hip-Thrust-on-The-Leg-Extension-Machine.gif"
  },
  {
    "id": 362,
    "name": "Ez Bar Deitado Pegada Fechada Triceps Extensão Behind de Cabeça",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/EZ-Bar-Lying-Close-Grip-Triceps-Extension-Behind-Head.gif"
  },
  {
    "id": 363,
    "name": "Lever Levantamento Terra",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Lever-Deadlift.gif"
  },
  {
    "id": 364,
    "name": "Weighted Hanging Knee Raises",
    "category": "Abdômen",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/weighted-hanging-knee-raises.gif"
  },
  {
    "id": 365,
    "name": "Farmers Walk_Cardio",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Farmers-walk_Cardio.gif"
  },
  {
    "id": 366,
    "name": "Bent Over Remada com Kettlebell",
    "category": "Costas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Kettlebell-Bent-Over-Row.gif"
  },
  {
    "id": 367,
    "name": "W Supino com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-W-Press.gif"
  },
  {
    "id": 368,
    "name": "Hips Adduction no Cabo",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Hips-Adduction.gif"
  },
  {
    "id": 369,
    "name": "Seal Remada com Halter",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/Dumbbell-Seal-Row.gif"
  },
  {
    "id": 370,
    "name": "Lateral Bend com Halter",
    "category": "Abdômen",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Dumbbell-Side-Bend.gif"
  },
  {
    "id": 371,
    "name": "Bent Over Inversa no Cabo Crucifixo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/bent-over-reverse-cable-fly.gif"
  },
  {
    "id": 372,
    "name": "Unilateral Biceps Rosca 1",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/One-Arm-Biceps-Curl-1.gif"
  },
  {
    "id": 373,
    "name": "em Pé Smith Machine Shoulder Desenvolvimento",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Smith-Machine-Shoulder-Press.gif"
  },
  {
    "id": 374,
    "name": "Declinado Unilateral Martelo Supino com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Decline-One-Arm-Hammer-Press.gif"
  },
  {
    "id": 375,
    "name": "Glute Bridge Two Legs On Bench com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/03/Barbell-Glute-Bridge-Two-Legs-on-Bench.gif"
  },
  {
    "id": 376,
    "name": "Pendulum Agachamento",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Pendulum-Squat.gif"
  },
  {
    "id": 377,
    "name": "Lateral Deitado Posterior de Ombro Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Side-Lying-Rear-Delt-Raise.gif"
  },
  {
    "id": 378,
    "name": "em Pé no Cabo Twist",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/standing-cable-twist.gif"
  },
  {
    "id": 379,
    "name": "High Pulley Overhead Tricep Extensão",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/High-Pulley-Overhead-Tricep-Extension.gif"
  },
  {
    "id": 380,
    "name": "Ez com Barra Inclinado Triceps Extensão",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/EZ-Barbell-Incline-Triceps-Extension.gif"
  },
  {
    "id": 381,
    "name": "Pegada Fechada Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif"
  },
  {
    "id": 382,
    "name": "em Pé com Barra Rollout",
    "category": "Abdômen",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Standing-Barbell-Rollout.gif"
  },
  {
    "id": 383,
    "name": "Hand Gripper",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/01/Hand-Gripper.gif"
  },
  {
    "id": 384,
    "name": "Sentado Zottman Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/10/Seated-Zottman-Curl.gif"
  },
  {
    "id": 385,
    "name": "Preacher Curls no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/cable-preacher-curls.gif"
  },
  {
    "id": 386,
    "name": "Sentado Shoulder Internal Rotation no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Cable-Seated-Shoulder-Internal-Rotation.gif"
  },
  {
    "id": 387,
    "name": "Single com Halter Spider Martelo Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Single-Dumbbell-Spider-Hammer-Curl.gif"
  },
  {
    "id": 388,
    "name": "Blaster Martelo Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Arm-Blaster-Hammer-Curl.gif"
  },
  {
    "id": 389,
    "name": "Hip Extensão no Cabo",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Hip-Extension.gif"
  },
  {
    "id": 390,
    "name": "Arnold Press com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Arnold-Press.gif"
  },
  {
    "id": 391,
    "name": "Pistol Squats com Kettlebell",
    "category": "Pernas",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Pistol-Squats.gif"
  },
  {
    "id": 392,
    "name": "Renegade Remada 1 com Halter",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/01/dumbbell-renegade-row-1.gif"
  },
  {
    "id": 393,
    "name": "Rope Pulley",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Pushdown.gif"
  },
  {
    "id": 394,
    "name": "Windmill com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Dumbbell-Windmill.gif"
  },
  {
    "id": 395,
    "name": "Declinado Shrug com Halter",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Decline-Shrug.gif"
  },
  {
    "id": 396,
    "name": "Wide Pegada com Barra Bench Supino",
    "category": "Peito",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/07/Wide-Grip-Barbell-Bench-Press.gif"
  },
  {
    "id": 397,
    "name": "Sentado Leg Rosca",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif"
  },
  {
    "id": 398,
    "name": "Sentado Pullover no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Cable-Seated-Pullover.gif"
  },
  {
    "id": 399,
    "name": "Chest Supino On The Floor com Kettlebell",
    "category": "Peito",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Kettlebell-Chest-Press-on-the-Floor.gif"
  },
  {
    "id": 400,
    "name": "Face Pull",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif"
  },
  {
    "id": 401,
    "name": "Unilateral no Cabo Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Cable-One-Arm-Lat-Pulldown.gif"
  },
  {
    "id": 402,
    "name": "Jump Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/01/Barbell-Jump-Squat.gif"
  },
  {
    "id": 403,
    "name": "Avanço com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif"
  },
  {
    "id": 404,
    "name": "Chest Supino Machine",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Press-Machine.gif"
  },
  {
    "id": 405,
    "name": "Deitado External Shoulder Rotation com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Lying-External-Shoulder-Rotation.gif"
  },
  {
    "id": 406,
    "name": "Bench Agachamento com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/dumbbell-bench-squat.gif"
  },
  {
    "id": 407,
    "name": "Inversa Hyperextension Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Reverse-Hyperextension-Machine.gif"
  },
  {
    "id": 408,
    "name": "Leg Press Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif"
  },
  {
    "id": 409,
    "name": "Unilateral no Cabo Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/One-Arm-Cable-Curl.gif"
  },
  {
    "id": 410,
    "name": "Triceps Dip Machine",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Triceps-Dip-Machine.gif"
  },
  {
    "id": 411,
    "name": "Shrug no Cabo",
    "category": "Outros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Shrug.gif"
  },
  {
    "id": 412,
    "name": "Two no Cabo Frontal Elevação",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Two-Arm-Cable-Front-Raise.gif"
  },
  {
    "id": 413,
    "name": "Single Calf Elevação On Leg Press Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Single-Calf-Raise-on-Leg-Press-Machine.gif"
  },
  {
    "id": 414,
    "name": "V Up com Halter",
    "category": "Abdômen",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Dumbbell-V-up.gif"
  },
  {
    "id": 415,
    "name": "Deitado no Cabo Inversa Crucifixo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lying-Cable-Reverse-Fly.gif"
  },
  {
    "id": 416,
    "name": "Burpees com Halter",
    "category": "Cardio",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Burpees.gif"
  },
  {
    "id": 417,
    "name": "Shoulder 90 Degrees Internal Rotation no Cabo",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Cable-Shoulder-90-degrees-Internal-Rotation.gif"
  },
  {
    "id": 418,
    "name": "Leaning no Cabo Lateral Elevação",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Leaning-Cable-Lateral-Raise.gif"
  },
  {
    "id": 419,
    "name": "Inclinado no Cabo Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Incline-Cable-Row.gif"
  },
  {
    "id": 420,
    "name": "Hack Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hack-Squat.gif"
  },
  {
    "id": 421,
    "name": "Sentado Biceps Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/seated-biceps-curl.gif"
  },
  {
    "id": 422,
    "name": "Unilateral Declinado no Cabo Crucifixo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/One-Arm-Decline-Cable-Fly.gif"
  },
  {
    "id": 423,
    "name": "Bent Laterl Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Bent-Arm-Laterl-Raise.gif"
  },
  {
    "id": 424,
    "name": "Scott Supino",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/scott-press.gif"
  },
  {
    "id": 425,
    "name": "Tricep Kickback no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Tricep-Kickback.gif"
  },
  {
    "id": 426,
    "name": "Bent Over Inversa Remada com Halter",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Dumbbell-Bent-Over-Reverse-Row.gif"
  },
  {
    "id": 427,
    "name": "Half Kneeling no Cabo External Rotation",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Half-Kneeling-Cable-External-Rotation.gif"
  },
  {
    "id": 428,
    "name": "Leg Press",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif"
  },
  {
    "id": 429,
    "name": "Single Leg Levantamento Terra com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbbell-Single-Leg-Deadlift.gif"
  },
  {
    "id": 430,
    "name": "Sentado Calf Press On Leg Press Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Seated-Calf-Press-on-Leg-Press-Machine.gif"
  },
  {
    "id": 431,
    "name": "Unilateral com Kettlebell Chest Supino On The Bench",
    "category": "Peito",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/One-Arm-Kettlebell-Chest-Press-on-the-Bench.gif"
  },
  {
    "id": 432,
    "name": "Arnold Press",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif"
  },
  {
    "id": 433,
    "name": "Weighted Round",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/weighted-round-arm.gif"
  },
  {
    "id": 434,
    "name": "Iron Cross com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Dumbbell-Iron-Cross.gif"
  },
  {
    "id": 435,
    "name": "Cadeira Extensora",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
  },
  {
    "id": 436,
    "name": "em Pé no Cabo High To Low Twist",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Cable-High-To-Low-Twist.gif"
  },
  {
    "id": 437,
    "name": "Dumbell Inversa Avanço",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbell-reverse-lunge.gif"
  },
  {
    "id": 438,
    "name": "Thruster com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Kettlebell-Thruster.gif"
  },
  {
    "id": 439,
    "name": "Ez Bar Bent Pullover",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/EZ-Bar-Bent-Arm-Pullover.gif"
  },
  {
    "id": 440,
    "name": "Inclinado Triceps Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Incline-Triceps-Extension.gif"
  },
  {
    "id": 441,
    "name": "Declinado no Cabo Crucifixo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Decline-Cable-Fly.gif"
  },
  {
    "id": 442,
    "name": "Sentado Twist com Barra",
    "category": "Abdômen",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Seated-Twist.gif"
  },
  {
    "id": 443,
    "name": "em Pé com Barra Triceps Extensão",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Barbell-Triceps-Extension.gif"
  },
  {
    "id": 444,
    "name": "Hang Clean com Kettlebell",
    "category": "Outros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Kettlebell-Hang-Clean.gif"
  },
  {
    "id": 445,
    "name": "Prone Inclinado Biceps Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Prone-Incline-Biceps-Curl.gif"
  },
  {
    "id": 446,
    "name": "Inclinado com Halter Crucifixo",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-dumbbell-Fly.gif"
  },
  {
    "id": 447,
    "name": "Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Raise.gif"
  },
  {
    "id": 448,
    "name": "Jefferson Agachamento",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/jefferson-squat.gif"
  },
  {
    "id": 449,
    "name": "Assault Airbike",
    "category": "Cardio",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Assault-AirBike.gif"
  },
  {
    "id": 450,
    "name": "Glute Kickback Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Glute-Kickback-Machine.gif"
  },
  {
    "id": 451,
    "name": "em Pé no Cabo Low To High Twist",
    "category": "Abdômen",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Standing-Cable-low-to-high-Twist.gif"
  },
  {
    "id": 452,
    "name": "Deitado Posterior Lateral Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/03/Dumbbell-Lying-Rear-Lateral-Raise.gif"
  },
  {
    "id": 453,
    "name": "Rack Pull com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/08/barbell-rack-pull.gif"
  },
  {
    "id": 454,
    "name": "Lateral Step Up",
    "category": "Pernas",
    "equipment": "Banco",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Lateral-Step-up.gif"
  },
  {
    "id": 455,
    "name": "Unilateral Arnold Press",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Single-Arm-Arnold-Press.gif"
  },
  {
    "id": 456,
    "name": "Landmine Agachamento",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Landmine-Squat.gif"
  },
  {
    "id": 457,
    "name": "Cuban External Rotation com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Cuban-External-Rotation.gif"
  },
  {
    "id": 458,
    "name": "Rosca Concentrada",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif"
  },
  {
    "id": 459,
    "name": "Upright Remada com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Upright-Row.gif"
  },
  {
    "id": 460,
    "name": "Zottman Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/zottman-curl.gif"
  },
  {
    "id": 461,
    "name": "Sentado Unilateral com Halter Triceps Extensão",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-One-Arm-Dumbbell-Triceps-Extension.gif"
  },
  {
    "id": 462,
    "name": "Uprightrow com Barra",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/barbell-uprightrow.gif"
  },
  {
    "id": 463,
    "name": "Inclinado Two Extensão com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Incline-Two-Arm-Extension.gif"
  },
  {
    "id": 464,
    "name": "Kneeling no Cabo Extensão",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kneeling-Cable-Extension.gif"
  },
  {
    "id": 465,
    "name": "Step Up Single Leg Balance Bicep Rosca",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Step-Up-Single-Leg-Balance-with-Bicep-Curl.gif"
  },
  {
    "id": 466,
    "name": "Sentado Bent Over Posterior de Ombro Remada com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Seated-Bent-Over-Rear-Delt-Row.gif"
  },
  {
    "id": 467,
    "name": "Single Leg Levantamento Terra com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Barbell-Single-Leg-Deadlift.gif"
  },
  {
    "id": 468,
    "name": "Lever Shoulder Desenvolvimento Martelo Pegada",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Lever-Shoulder-Press-Hammer-Grip.gif"
  },
  {
    "id": 469,
    "name": "Triceps Extensão com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Triceps-Extension.gif"
  },
  {
    "id": 470,
    "name": "Unilateral Triceps Pulley",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/One-arm-triceps-pushdown.gif"
  },
  {
    "id": 471,
    "name": "Ab Coaster Machine",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Ab-Coaster-Machine.gif"
  },
  {
    "id": 472,
    "name": "Unilateral no Cabo Wrist Rosca On Floor",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-One-Arm-Wrist-Curl-On-Floor.gif"
  },
  {
    "id": 473,
    "name": "Zercher Carry",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/01/zercher-carry.gif"
  },
  {
    "id": 474,
    "name": "Sentado Ab Abdominal Machine",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Seated-Ab-Crunch-Machine.gif"
  },
  {
    "id": 475,
    "name": "Sentado no Cabo Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif"
  },
  {
    "id": 476,
    "name": "Straight Pullover Knees At 90 Degrees com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/11/Dumbbell-Straight-Arm-Pullover-knees-at-90-degrees.gif"
  },
  {
    "id": 477,
    "name": "Supino com Halter",
    "category": "Peito",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
  },
  {
    "id": 478,
    "name": "Good Morning com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Good-Morning.gif"
  },
  {
    "id": 479,
    "name": "Lateral Elevação com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Kettlebell-Lateral-Raise.gif"
  },
  {
    "id": 480,
    "name": "Inversa Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/dumbbell-reverse-curl.gif"
  },
  {
    "id": 481,
    "name": "Lever High Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Lever-High-Row.gif"
  },
  {
    "id": 482,
    "name": "Inversa Pegada Machine Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Reverse-Grip-Machine-Row.gif"
  },
  {
    "id": 483,
    "name": "Sumo Levantamento Terra com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-sumo-deadlift.gif"
  },
  {
    "id": 484,
    "name": "Single Leg com Halter Lateral Bridge",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2026/01/Single-Leg-Dumbbell-Side-Bridge.gif"
  },
  {
    "id": 485,
    "name": "Sentado no Cabo Rope Remada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Cable-Rope-Row.gif"
  },
  {
    "id": 486,
    "name": "Ez Bar Underhand Supino",
    "category": "Ombros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/EZ-Bar-Underhand-Press.gif"
  },
  {
    "id": 487,
    "name": "V Bar Lat Puxada",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/V-bar-Lat-Pulldown.gif"
  },
  {
    "id": 488,
    "name": "Sumo Plie com Halter Agachamento",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/01/Sumo-Plie-Dumbbell-Squat.gif"
  },
  {
    "id": 489,
    "name": "Chest Dips",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Chest-Dips.gif"
  },
  {
    "id": 490,
    "name": "Sumo Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-sumo-squat.gif"
  },
  {
    "id": 491,
    "name": "Kneeling no Cabo Triceps Extensão",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Kneeling-Cable-Triceps-Extension.gif"
  },
  {
    "id": 492,
    "name": "Lateral Unilateral Inversa Pulley",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Side-One-Arm-Reverse-Pushdown.gif"
  },
  {
    "id": 493,
    "name": "Wrist Rosca com Barra",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/barbell-Wrist-Curl.gif"
  },
  {
    "id": 494,
    "name": "Single Leg Press",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Single-Leg-Press.gif"
  },
  {
    "id": 495,
    "name": "Posterior Drive no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Cable-Rear-Drive.gif"
  },
  {
    "id": 496,
    "name": "Deitado Extensão Pullover",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lying-Extension-Pullover.gif"
  },
  {
    "id": 497,
    "name": "Lateral To Frontal Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Dumbbell-Lateral-to-Front-Raise.gif"
  },
  {
    "id": 498,
    "name": "Sentado Posterior Lateral com Halter Elevação",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Rear-Lateral-Dumbbell-Raise.gif"
  },
  {
    "id": 499,
    "name": "Sentado Frontal And Back Tate Supino com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Dumbbell-Seated-Front-and-Back-Tate-Press.gif"
  },
  {
    "id": 500,
    "name": "Lever de Pescoço Right Lateral Flexão Plate Loaded",
    "category": "Outros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lever-Neck-Right-Side-Flexion-plate-loaded.gif"
  },
  {
    "id": 501,
    "name": "Dumbeel Step Up",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/12/Dumbeel-Step-Up.gif"
  },
  {
    "id": 502,
    "name": "Pin Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Barbell-Pin-Squat.gif"
  },
  {
    "id": 503,
    "name": "Posterior de Ombro Machine Flys",
    "category": "Ombros",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Machine-Flys.gif"
  },
  {
    "id": 504,
    "name": "Posterior Puxada no Cabo",
    "category": "Costas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Cable-Rear-Pulldown.gif"
  },
  {
    "id": 505,
    "name": "Agachamento com Halter",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif"
  },
  {
    "id": 506,
    "name": "Wide Pegada com Barra Bent Over Remada Plus",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/02/Wide-Grip-Barbell-Bent-Over-Row-Plus.gif"
  },
  {
    "id": 507,
    "name": "Z Supino com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/12/Dumbbell-Z-Press.gif"
  },
  {
    "id": 508,
    "name": "Recumbent Exercise Bike",
    "category": "Cardio",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Recumbent-Exercise-Bike.gif"
  },
  {
    "id": 509,
    "name": "Inclinado Shrug com Halter",
    "category": "Outros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Incline-Shrug.gif"
  },
  {
    "id": 510,
    "name": "Lever Preacher Rosca",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Preacher-Curl.gif"
  },
  {
    "id": 511,
    "name": "Unilateral Biceps Rosca",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/05/One-Arm-Biceps-Curl.gif"
  },
  {
    "id": 512,
    "name": "Landmine Levantamento Terra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/10/Landmine-Deadlift.gif"
  },
  {
    "id": 513,
    "name": "Deitado Triceps Extensions no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Lying-Triceps-Extensions.gif"
  },
  {
    "id": 514,
    "name": "Pull Through no Cabo",
    "category": "Pernas",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Cable-Pull-Through.gif"
  },
  {
    "id": 515,
    "name": "Bent Over Triceps Kickback",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Triceps-Kickback.gif"
  },
  {
    "id": 516,
    "name": "Hands Bike",
    "category": "Cardio",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Hands-Bike.gif"
  },
  {
    "id": 517,
    "name": "Full Abdominal Machine",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Full-Crunch-Machine.gif"
  },
  {
    "id": 518,
    "name": "Single Leg Extensão",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Single-Leg-Extension.gif"
  },
  {
    "id": 519,
    "name": "Ab Roller Abdominal",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/12/Ab-Roller-Crunch.gif"
  },
  {
    "id": 520,
    "name": "Inversa Wrist Rosca Over A Bench com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Barbell-Reverse-Wrist-Curl-Over-a-Bench.gif"
  },
  {
    "id": 521,
    "name": "Unilateral no Cabo Lateral Elevação",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/07/one-arm-Cable-Lateral-Raise.gif"
  },
  {
    "id": 522,
    "name": "Sentado com Halter Alternating Rosca",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/06/Seated-dumbbell-alternating-curl.gif"
  },
  {
    "id": 523,
    "name": "Cuban Supino com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/dumbbell-cuban-press-.gif"
  },
  {
    "id": 524,
    "name": "Frontal Puxada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Front-Pulldown.gif"
  },
  {
    "id": 525,
    "name": "Deitado com Halter Leg Rosca",
    "category": "Pernas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Lying-Dumbbell-Leg-Curl.gif"
  },
  {
    "id": 526,
    "name": "Lever Overhand Triceps Dip",
    "category": "Braços",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Overhand-Triceps-Dip.gif"
  },
  {
    "id": 527,
    "name": "Rope Bicep Curls",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/rope-bicep-curls.gif"
  },
  {
    "id": 528,
    "name": "Upper Chest Crossovers no Cabo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/10/Cable-Upper-Chest-Crossovers.gif"
  },
  {
    "id": 529,
    "name": "Sentado com Barra Finger Rosca",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2025/07/seated-barbell-finger-curl.gif"
  },
  {
    "id": 530,
    "name": "Inversa Pegada Skullcrusher 1 com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Reverse-Grip-Skullcrusher-1.gif"
  },
  {
    "id": 531,
    "name": "Rosca com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif"
  },
  {
    "id": 532,
    "name": "Power Clean",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Power-Clean-.gif"
  },
  {
    "id": 533,
    "name": "Finger Rosca com Barra",
    "category": "Braços",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/09/Barbell-Finger-Curl.gif"
  },
  {
    "id": 534,
    "name": "Frontal Elevação com Halter",
    "category": "Ombros",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif"
  },
  {
    "id": 535,
    "name": "Rope Deitado On Floor Tricep Extensão no Cabo",
    "category": "Braços",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Cable-Rope-Lying-on-Floor-Tricep-Extension.gif"
  },
  {
    "id": 536,
    "name": "Half Kneeling High no Cabo Remada Rope",
    "category": "Ombros",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Half-Kneeling-High-Cable-Row-Rope.gif"
  },
  {
    "id": 537,
    "name": "Split Agachamento com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/04/Barbell-Split-Squat.gif"
  },
  {
    "id": 538,
    "name": "Lever Inversa T Bar Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-Reverse-T-Bar-Row.gif"
  },
  {
    "id": 539,
    "name": "Single Leg Hip Thrust com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Single-Leg-Hip-Thrust.gif"
  },
  {
    "id": 540,
    "name": "Inclinado com Halter Martelo Remada",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Incline-Dumbbell-Hammer-Row.gif"
  },
  {
    "id": 541,
    "name": "Clean And Supino com Kettlebell",
    "category": "Ombros",
    "equipment": "Kettlebell",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Kettlebell-Clean-and-Press.gif"
  },
  {
    "id": 542,
    "name": "Lateral Avanço com Barra",
    "category": "Pernas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Barbell-Lateral-Lunge.gif"
  },
  {
    "id": 543,
    "name": "Donkey Kick On Smith Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Donkey-Kick-on-Smith-Machine.gif"
  },
  {
    "id": 544,
    "name": "High no Cabo Crossover",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/High-Cable-Crossover.gif"
  },
  {
    "id": 545,
    "name": "Lever Assisted Leg Press",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Lever-Assisted-Leg-Press.gif"
  },
  {
    "id": 546,
    "name": "Power Snatch com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Power-Snatch.gif"
  },
  {
    "id": 547,
    "name": "Heaving Snatch Balance com Barra",
    "category": "Outros",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Barbell-Heaving-Snatch-Balance.gif"
  },
  {
    "id": 548,
    "name": "Crossover no Cabo",
    "category": "Peito",
    "equipment": "Cabo",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif"
  },
  {
    "id": 549,
    "name": "Inner Chest Supino Machine",
    "category": "Peito",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Inner-Chest-Press-Machine.gif"
  },
  {
    "id": 550,
    "name": "Preacher Rosca com Halter",
    "category": "Braços",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Preacher-Curl.gif"
  },
  {
    "id": 551,
    "name": "Captains Chair Leg Elevação",
    "category": "Abdômen",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/05/Captains-Chair-Leg-Raise.gif"
  },
  {
    "id": 552,
    "name": "Hip Thrust Machine",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Hip-Thrust-Machine.gif"
  },
  {
    "id": 553,
    "name": "Pendlay Remada com Barra",
    "category": "Costas",
    "equipment": "Barra",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2022/07/Barbell-Pendlay-Row.gif"
  },
  {
    "id": 554,
    "name": "Smith Machine Bent Over Remada",
    "category": "Costas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Smith-Machine-Bent-Over-Row.gif"
  },
  {
    "id": 555,
    "name": "Remada com Halter",
    "category": "Costas",
    "equipment": "Halteres",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif"
  },
  {
    "id": 556,
    "name": "Bench Supino Machine em Pé Calf Elevação",
    "category": "Pernas",
    "equipment": "Máquina",
    "gifUrl": "https://fitnessprogramer.com/wp-content/uploads/2021/09/Bench-Press-Machine-Standing-Calf-Raise.gif"
  }
];



const normalizeText = (value) => {
  if (!value) return '';
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const TITLE_CASE_EXCEPTIONS = new Set(['de', 'da', 'do', 'das', 'dos', 'no', 'na', 'nos', 'nas', 'com', 'sem', 'e']);

const toTitleCase = (value) => {
  return String(value)
    .split(' ')
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && TITLE_CASE_EXCEPTIONS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
};

const NAME_REPLACEMENTS = [
  [/\bBench Press\b/gi, 'Supino'],
  [/\bChest Press\b/gi, 'Supino'],
  [/\bShoulder Press\b/gi, 'Desenvolvimento de Ombro'],
  [/\bMilitary Press\b/gi, 'Desenvolvimento Militar'],
  [/\bOverhead Press\b/gi, 'Desenvolvimento Acima da Cabeça'],
  [/\bPush Press\b/gi, 'Push Press'],
  [/\bLeg Press\b/gi, 'Leg Press'],
  [/\bHip Thrust\b/gi, 'Hip Thrust'],
  [/\bDumbbell\b/gi, 'Halter'],
  [/\bBarbell\b/gi, 'Barra'],
  [/\bKettlebell\b/gi, 'Kettlebell'],
  [/\bCable\b/gi, 'Cabo'],
  [/\bMachine\b/gi, 'Máquina'],
  [/\bBench\b/gi, 'Banco'],
  [/\bChest\b/gi, 'Peito'],
  [/\bShoulder\b/gi, 'Ombro'],
  [/\bRow(s)?\b/gi, 'Remada'],
  [/\bPulldown\b/gi, 'Puxada'],
  [/\bPull\b/gi, 'Puxada'],
  [/\bCurl\b/gi, 'Rosca'],
  [/\bFly\b/gi, 'Crucifixo'],
  [/\bRaise\b/gi, 'Elevação'],
  [/\bLunge\b/gi, 'Avanço'],
  [/\bSquat(s)?\b/gi, 'Agachamento'],
  [/\bDeadlift\b/gi, 'Levantamento Terra'],
  [/\bBridge\b/gi, 'Ponte'],
  [/\bKickback\b/gi, 'Coice'],
  [/\bHamstring\b/gi, 'Posterior de Coxa'],
  [/\bQuad(s)?\b/gi, 'Quadríceps'],
  [/\bCalf\b/gi, 'Panturrilha'],
  [/\bTricep(s)?\b/gi, 'Tríceps'],
  [/\bBicep(s)?\b/gi, 'Bíceps'],
  [/\bForearm\b/gi, 'Antebraço'],
  [/\bIncline\b/gi, 'Inclinado'],
  [/\bDecline\b/gi, 'Declinado'],
  [/\bSeated\b/gi, 'Sentado'],
  [/\bStanding\b/gi, 'Em Pé'],
  [/\bSingle(\s|-)?Arm\b/gi, 'Unilateral'],
  [/\bOne(\s|-)?Arm\b/gi, 'Unilateral'],
  [/\bTwo(\s|-)?Arm\b/gi, 'Bilateral'],
  [/\bUpper\b/gi, 'Superior'],
  [/\bLower\b/gi, 'Inferior']
];

const fixBrokenEncoding = (value) => {
  return String(value)
    .replace(/Bra\?os/gi, 'Braços')
    .replace(/Tr\?ceps/gi, 'Tríceps')
    .replace(/B\?ceps/gi, 'Bíceps')
    .replace(/Antebra\?o/gi, 'Antebraço')
    .replace(/Quadr\?ceps/gi, 'Quadríceps')
    .replace(/Gl\?teos/gi, 'Glúteos')
    .replace(/Obl\?quos/gi, 'Oblíquos')
    .replace(/Abd\?men/gi, 'Abdômen')
    .replace(/Peito M\?dio/gi, 'Peito Médio')
    .replace(/Pernas\?/gi, 'Pernas')
    .replace(/Peito\?/gi, 'Peito');
};

const prettifyExerciseName = (name) => {
  let value = String(name || '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  NAME_REPLACEMENTS.forEach(([regex, replacement]) => {
    value = value.replace(regex, replacement);
  });

  value = value
    .replace(/\bOn The\b/gi, '')
    .replace(/\bOn\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return fixBrokenEncoding(toTitleCase(value));
};

const inferPrimaryCategory = (rawCategory = '') => {
  const c = normalizeText(rawCategory);
  if (c.includes('peit') || c.includes('chest')) return 'Peito';
  if (c.includes('cost') || c.includes('back')) return 'Costas';
  if (c.includes('ombr') || c.includes('shoulder')) return 'Ombros';
  if (c.includes('bra') || c.includes('tricep') || c.includes('bicep') || c.includes('arm')) return 'Braços';
  if (c.includes('pern') || c.includes('leg') || c.includes('quad') || c.includes('glute')) return 'Pernas';
  if (c.includes('abd') || c.includes('core')) return 'Abdômen';
  if (c.includes('card')) return 'Cardio';
  return 'Outros';
};

const inferSubCategory = (name, primaryCategory) => {
  const n = normalizeText(name);
  const p = normalizeText(primaryCategory);

  if (p === 'bracos') {
    if (
      n.includes('tricep') ||
      n.includes('triceps') ||
      n.includes('extensao') ||
      n.includes('pushdown') ||
      n.includes('pulley') ||
      n.includes('dip') ||
      n.includes('kickback') ||
      n.includes('overhead') ||
      n.includes('testa') ||
      n.includes('skull')
    ) {
      return 'Tríceps';
    }
    if (
      n.includes('bicep') ||
      n.includes('biceps') ||
      n.includes('rosca') ||
      n.includes('curl') ||
      n.includes('martelo') ||
      n.includes('preacher') ||
      n.includes('concentration') ||
      n.includes('spider')
    ) {
      return 'Bíceps';
    }
    if (
      n.includes('antebraco') ||
      n.includes('forearm') ||
      n.includes('wrist') ||
      n.includes('grip') ||
      n.includes('punho')
    ) {
      return 'Antebraço';
    }
    return 'Braços (Geral)';
  }

  if (p === 'peito') {
    if (n.includes('inclinado') || n.includes('superior') || n.includes('upper')) return 'Peito Superior';
    if (n.includes('declinado') || n.includes('inferior') || n.includes('lower')) return 'Peito Inferior';
    return 'Peito Médio';
  }

  if (p === 'pernas') {
    if (n.includes('quadricep') || n.includes('agachamento') || n.includes('leg press') || n.includes('extensao')) return 'Quadríceps';
    if (n.includes('posterior') || n.includes('hamstring') || n.includes('leg curl') || n.includes('romanian') || n.includes('deadlift')) return 'Posterior de Coxa';
    if (n.includes('panturrilha') || n.includes('calf')) return 'Panturrilha';
    if (n.includes('glute') || n.includes('gluteo') || n.includes('hip thrust') || n.includes('ponte') || n.includes('coice')) return 'Glúteos';
    if (n.includes('adutor') || n.includes('abductor') || n.includes('adduction') || n.includes('abduction')) return 'Adutores/Abdutores';
    return 'Pernas (Geral)';
  }

  if (p === 'ombros') {
    if (n.includes('posterior') || n.includes('rear')) return 'Ombro Posterior';
    if (n.includes('lateral') || n.includes('side')) return 'Ombro Lateral';
    if (n.includes('frontal') || n.includes('front')) return 'Ombro Anterior';
    return 'Ombros (Geral)';
  }

  if (p === 'costas') {
    if (n.includes('remada') || n.includes('row')) return 'Costas (Remada)';
    if (n.includes('puxada') || n.includes('pulldown') || n.includes('pull')) return 'Costas (Puxada)';
    if (n.includes('lombar') || n.includes('deadlift') || n.includes('levantamento')) return 'Lombar';
    return 'Costas (Geral)';
  }

  if (p === 'abdomen') {
    if (n.includes('obliquo') || n.includes('twist') || n.includes('side')) return 'Oblíquos';
    if (n.includes('lower') || n.includes('leg raise') || n.includes('hanging')) return 'Infra';
    if (n.includes('crunch')) return 'Reto Abdominal';
    return 'Core';
  }

  return primaryCategory;
};

export const exercisesDatabase = rawExercises.map((exercise) => {
  const displayName = prettifyExerciseName(exercise.name);
  const primaryCategory = fixBrokenEncoding(inferPrimaryCategory(exercise.category));
  const subCategory = fixBrokenEncoding(inferSubCategory(displayName, primaryCategory));

  return {
    ...exercise,
    name: displayName,
    originalName: exercise.name,
    primaryCategory,
    category: subCategory
  };
});

const CATEGORY_ORDER = [
  'Peito Superior',
  'Peito Médio',
  'Peito Inferior',
  'Costas (Puxada)',
  'Costas (Remada)',
  'Costas (Geral)',
  'Lombar',
  'Ombro Anterior',
  'Ombro Lateral',
  'Ombro Posterior',
  'Ombros (Geral)',
  'Bíceps',
  'Tríceps',
  'Antebraço',
  'Braços (Geral)',
  'Quadríceps',
  'Posterior de Coxa',
  'Glúteos',
  'Panturrilha',
  'Adutores/Abdutores',
  'Pernas (Geral)',
  'Reto Abdominal',
  'Infra',
  'Oblíquos',
  'Core',
  'Cardio',
  'Outros'
];

const sortByOrder = (values) => {
  return values.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
};

// Categorias disponíveis
export const categories = sortByOrder(Array.from(new Set(exercisesDatabase.map((exercise) => exercise.category)))).map(fixBrokenEncoding);
export const primaryCategories = ['Peito', 'Costas', 'Ombros', 'Braços', 'Pernas', 'Abdômen', 'Cardio', 'Outros'].map(fixBrokenEncoding);

// Tipos de equipamento
export const equipments = [
  "Banco",
  "Barra",
  "Cabo",
  "Halteres",
  "Kettlebell",
  "Máquina",
  "Placa"
];
